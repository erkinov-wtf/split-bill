import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import avatar from "../../assets/Avatar.png";

export default function CreateExpense() {
    const [expenseName, setExpenseName] = useState('');
    const [displayPrice, setDisplayPrice] = useState(''); // Price in regular currency format (e.g., 10.50)
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { roomId } = useParams();
    const navigate = useNavigate();
    const sessionId = localStorage.getItem("session_id");

    useEffect(() => {
        fetchRoomUsers();
    }, [roomId]);

    const fetchRoomUsers = async () => {
        try {
            const response = await fetch(`https://split-bill.steamfest.live/v1/rooms/${roomId}/users`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "X-Ya-User-Ticket": sessionId,
                },
            });
            const data = await response.json();
            setUsers(data.users);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching room users:', error);
            setIsLoading(false);
        }
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setDisplayPrice(value);
        }
    };

    const convertToCents = (displayPrice) => {
        return Math.round(parseFloat(displayPrice || '0') * 100);
    };

    const handleSubmit = async () => {
        if (!expenseName || !displayPrice || selectedUsers.length === 0) {
            alert('Please fill in all fields and select at least one user');
            return;
        }

        const priceInCents = convertToCents(displayPrice);

        const requestBody = {
            room: {
                name: null
            },
            product: {
                add: [
                    {
                        name: expenseName,
                        price: priceInCents,
                        add_users: selectedUsers
                    }
                ],
                edit: null,
                remove: null
            }
        };

        try {
            const response = await fetch(`https://split-bill.steamfest.live/v1/rooms/${roomId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Ya-User-Ticket": sessionId,
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                navigate(`/rooms/${roomId}`);
            } else {
                throw new Error('Failed to create expense');
            }
        } catch (error) {
            console.error('Error creating expense:', error);
            alert('Failed to create expense. Please try again.');
        }
    };

    const handleBack = () => {
        navigate(`/rooms/${roomId}`);
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <p>Loading...</p>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleBack}
                        className="rounded-full w-[30px] h-[30px] shadow-indigo-950 shadow-2xl items-center"
                    >
                        <ArrowLeft />
                    </button>
                    <h6 className="text-xl font-bold flex-grow text-center">Create New Expense</h6>
                </div>

                <div className="mt-6">
                    <label className="block text-gray-700 font-medium">Expense Name</label>
                    <input
                        type="text"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        placeholder="Qovun"
                        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 font-medium">Expense Price</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={displayPrice}
                            onChange={handlePriceChange}
                            placeholder="0.00"
                            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {displayPrice && `${convertToCents(displayPrice)} cents`}
                        </span>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Assign Friends</h2>
                    <div className="mt-3 space-y-3">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleUserSelect(user.id)}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <img
                                    src={user.photo_url || avatar}
                                    alt="photo url"
                                    className="w-12 h-12 rounded-full border"
                                />
                                <h2 className="text-md font-medium text-gray-800">
                                    {user.full_name}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold shadow-md"
                >
                    Create Expense
                </button>
            </div>
        </div>
    );
}