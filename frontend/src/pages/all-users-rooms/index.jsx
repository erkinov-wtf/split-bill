import { useState, useEffect } from "react";
import { Plus, User, DollarSign, Pin, Search, X } from "lucide-react";
import noRoom from "../../assets/img.png";
import { useNavigate } from "react-router-dom";

export default function UsersRoomPage() {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const sessionId = localStorage.getItem("session_id");

    // Fetch room details by ID
    const fetchRoomDetails = async (roomId) => {
        try {
            const response = await fetch(`https://split-bill.steamfest.live/v1/rooms/${roomId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "X-Ya-User-Ticket": sessionId,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch room ${roomId} details`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(`Error fetching room ${roomId} details:`, err);
            return null;
        }
    };

    const fetchRooms = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("https://split-bill.steamfest.live/v1/rooms", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "X-Ya-User-Ticket": sessionId,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }
            const data = await response.json();

            // First store basic room data
            const basicRooms = data.items.map(item => ({
                id: item.id,
                name: item.name || `Room ${item.id}`,
                owner_id: item.owner_id,
                status: "loading", // Temporary status while we fetch details
                friends: 0,
                expenses: 0,
                pinned: false,
                total_price: 0
            }));

            setRooms(basicRooms);

            // Then fetch details for each room
            const detailedRoomsPromises = basicRooms.map(async (room) => {
                const details = await fetchRoomDetails(room.id);
                if (details) {
                    return {
                        ...room,
                        status: details.room_status.toLowerCase(),
                        friends: details.total_members,
                        expenses: details.room_products.length,
                        total_price: details.total_price,
                    };
                }
                return room;
            });

            // Wait for all room details to be fetched
            const detailedRooms = await Promise.all(detailedRoomsPromises);
            setRooms(detailedRooms);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const addRoom = async () => {
        navigate("/create");
    };

    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">Loading rooms...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header - Sticky */}
            <div className="sticky top-0 z-10 bg-white">
                <div className="flex justify-between items-center p-4 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold">Rooms</h2>
                    <div className="flex gap-2">
                        {rooms.length >= 1 && (
                            <button
                                className="bg-yellow-400 p-2 rounded-full shadow-md hover:bg-yellow-500"
                                onClick={() => setShowSearch(!showSearch)}
                            >
                                {showSearch ? <X className="w-6 h-6 text-black" /> : <Search className="w-6 h-6 text-black" />}
                            </button>
                        )}
                        <button
                            className="bg-yellow-400 p-2 rounded-full shadow-md hover:bg-yellow-500"
                            onClick={addRoom}
                        >
                            <Plus className="w-6 h-6 text-black items-center" />
                        </button>
                    </div>
                </div>

                {/* Search Input - Sticky under header */}
                {showSearch && (
                    <div className="p-4 bg-white">
                        <input
                            type="text"
                            placeholder="Search rooms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border rounded-md shadow-sm"
                        />
                    </div>
                )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">Loading rooms...</div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : rooms.length !== 0 ? (
                    <div className="space-y-6">
                        {/* Active Rooms Section */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-2">Active Rooms</h2>
                            <div className="space-y-4">
                                {filteredRooms
                                    .filter(room => room.status.toLowerCase() === "active")
                                    .map((room) => (
                                        <div key={room.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-orange-400 hover:text-white">
                                            <div>
                                                <h3 className="font-bold">{room.name}</h3>
                                                <p className="text-sm flex items-center gap-1">
                                                    <User className="w-4 h-4 text-gray-500" /> {room.friends} friends
                                                </p>
                                                <p className="text-sm flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4 text-gray-500" /> {room.expenses} expenses
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm text-blue-500">{room.status}</span>
                                                {room.pinned && <Pin className="w-4 h-4 text-gray-500 ml-2 inline-block" />}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Archived Rooms Section */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-2">Archived Rooms</h2>
                            <div className="space-y-4">
                                {filteredRooms
                                    .filter(room => room.status.toLowerCase() === "archived")
                                    .map((room) => (
                                        <div key={room.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-orange-400 hover:text-white">
                                            <div>
                                                <h3 className="font-bold">{room.name}</h3>
                                                <p className="text-sm flex items-center gap-1">
                                                    <User className="w-4 h-4 text-gray-500" /> {room.friends} friends
                                                </p>
                                                <p className="text-sm flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4 text-gray-500" /> {room.expenses} expenses
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm text-gray-400">{room.status}</span>
                                                {room.pinned && <Pin className="w-4 h-4 text-gray-500 ml-2 inline-block" />}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="mb-4">
                            <img src={noRoom} alt="No Rooms" className="w-24 h-24" />
                        </div>
                        <p className="text-gray-600 text-lg">You have no room.</p>
                        <p className="text-gray-500">Create a first room and enjoy Split Bill!</p>
                        <p className="mt-4 text-gray-500">Just join an existing room</p>
                        <p className="text-gray-500">by entering room ID</p>
                    </div>
                )}
            </div>
        </div>
    );
}