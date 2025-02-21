import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock } from 'lucide-react';

export default function RoomWithProducts() {
    const [roomData, setRoomData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { roomId } = useParams();
    const sessionId = localStorage.getItem("session_id");

    useEffect(() => {
        fetchRoomData();
    }, [roomId]);

    const fetchRoomData = async () => {
        try {
            const response = await fetch(`https://split-bill.steamfest.live/v1/rooms/${roomId}`);
            const data = await response.json();
            setRoomData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching room data:', error);
            setIsLoading(false);
        }
    };

    const formatPrice = (cents) => {
        return (cents / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    if (isLoading || !roomData) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="px-4 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/rooms')}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex gap-4">
                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <Clock className="w-6 h-6" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <Users className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-1">{roomData.name}</h1>
                <p className="text-gray-400">Room ID: {roomData.id}</p>
            </div>

            {/* Stats Card */}
            <div className="mx-4 p-6 bg-gray-800 rounded-2xl mb-6">
                <div className="flex justify-between items-baseline mb-6">
                    <div>
                        <p className="text-gray-400 mb-1">Total Amount</p>
                        <p className="text-3xl font-bold">{formatPrice(roomData.total_price)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            roomData.room_status === 'ACTIVE' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                            {roomData.room_status}
                        </span>
                    </div>
                </div>
                <div className="flex items-center text-gray-400">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{roomData.total_members} members</span>
                </div>
            </div>

            {/* Products List */}
            <div className="px-4">
                <h2 className="text-xl font-semibold mb-4">Expenses</h2>
                <div className="space-y-4">
                    {roomData.room_products.map((product) => (
                        <div key={product.id} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mr-4">
                                    <span className="text-2xl">🛍️</span>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-1">{product.name}</h3>
                                    <p className="text-gray-400 text-sm">ID: {product.id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{formatPrice(product.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Expense Button */}
            <div className="fixed bottom-6 left-0 right-0 px-4">
                <button
                    onClick={() => navigate(`/rooms/${roomId}/new-expense`)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition-colors"
                >
                    Add New Expense
                </button>
            </div>
        </div>
    );
}