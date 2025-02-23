import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUserStatus = () => {
    const { roomId, productId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const sessionId = localStorage.getItem("session_id");

    useEffect(() => {
        fetchData();
    }, [roomId, productId]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://split-bill.steamfest.live/v1/rooms/${roomId}/calculate`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "X-Ya-User-Ticket": sessionId,
                },
            });
            const responseData = await response.json();

            const product = responseData.data[0]?.products.find(p => p.id === parseInt(productId));
            const usersForProduct = responseData.data.filter(user =>
                user.products.some(p => p.id === parseInt(productId))
            ).map(user => ({
                id: user.id,
                full_name: user.full_name,
                photo_url: user.photo_url,
                amount: user.products.find(p => p.id === parseInt(productId)).price,
                status: user.products.find(p => p.id === parseInt(productId)).status
            }));

            setData({
                productName: product?.name || 'Product',
                totalAmount: product?.price || 0,
                users: usersForProduct
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const handleUserToggle = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleStatusUpdate = (newStatus) => {
        console.log('Updating status to', newStatus, 'for users:', selectedUsers);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-neutral-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(`/rooms/${roomId}`)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <div className="flex flex-col items-center">
                            <h3 className="text-3xl font-semibold text-gray-900">{data.productName}</h3>
                            <span className="text-xl text-gray-500 mt-1">Product Status</span>
                        </div>
                        <div className="w-10"></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
                {/* Stats Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Total Amount</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                ${(data.totalAmount / 100).toFixed(2)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-sm mb-1">Remaining to Pay</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                ${(data.totalAmount / 100).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Users List */}
                <div className="space-y-4">
                    {data.users.map((user) => (
                        <div key={user.id}
                             className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleUserToggle(user.id)}
                                    className="w-5 h-5 mr-4 rounded border-gray-300"
                                />
                                <div
                                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                    <img
                                        src={user.photo_url}
                                        alt={user.full_name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{user.full_name}</h3>
                                    <p className="text-gray-500 text-sm">
                                        Status: <span
                                        className={user.status === 'PAID' ? 'text-green-600' : 'text-red-600'}>
                                            {user.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    ${(user.amount / 100).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 py-4">
                <div className="flex gap-4 max-w-150 mx-auto">
                    <button
                        onClick={() => handleStatusUpdate('PAID')}
                        className="flex-1 bg-green-500 text-white py-4 rounded-xl font-medium hover:bg-green-600 transition-colors"
                        disabled={selectedUsers.length === 0}
                    >
                        Make Unpaid
                    </button>
                    <button
                        onClick={() => handleStatusUpdate('UNPAID')}
                        className="flex-1 bg-red-500 text-white py-4 rounded-xl font-medium hover:bg-red-600 transition-colors"
                        disabled={selectedUsers.length === 0}
                    >
                        Make Paid
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserStatus;