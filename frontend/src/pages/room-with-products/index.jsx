import React from 'react';
import {useNavigate} from 'react-router-dom';

const RoomWithProducts = ({roomData}) => {
    const navigate = useNavigate();

    const formatPrice = (cents) => {
        return (cents / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const getRemainingBalance = (roomData) => {
        if (!roomData || !roomData.room_products) return 0;

        return roomData.room_products.reduce((totalBalance, product) => {
            const totalUsers = product.user_products.length;
            if (totalUsers === 0) return totalBalance;

            const costPerUser = product.price / totalUsers;

            const unpaidAmount = product.user_products.reduce((productBalance, userProduct) => {
                return userProduct.status === "UNPAID" ? productBalance + costPerUser : productBalance;
            }, 0);

            return totalBalance + unpaidAmount;
        }, 0);
    };

    const remainingBalance = getRemainingBalance(roomData);

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            {/* Header - Matching EmptyRoomPage header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate("/rooms")}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <div className="flex flex-col items-center">
                            <h3 className="text-3xl font-semibold text-gray-900">{roomData.name}</h3>
                            <span className="text-xl text-gray-500 mt-1">Room ID: {roomData.id}</span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => navigate("participants")} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    {/* Price Details */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Total Amount</p>
                            <p className="text-2xl font-semibold text-gray-900">{formatPrice(roomData.total_price)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-sm mb-1">Remaining Balance</p>
                            <p className="text-2xl font-semibold text-red-600">{formatPrice(remainingBalance)}</p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 items-center mb-4">
                        {/* Total Members */}
                        <div className="flex items-center text-gray-500">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                            <span className="text-sm">{roomData.total_members} members</span>
                        </div>

                        {/* Status */}
                        <div className="text-right flex items-center gap-2 justify-end">
                            <p className="text-gray-500 text-sm">Status:</p>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                roomData.room_status === 'ACTIVE'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-300 text-gray-800'
                            }`}>{roomData.room_status}</span>
                        </div>
                    </div>
                </div>


                {/* Expenses List */}
                <div className="space-y-4">
                    {roomData.room_products.map((product) => (
                        <div key={product.id}
                             onClick={() => navigate(`/rooms/${roomData.id}/product/${product.id}`)}
                             className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center">
                                <div
                                    className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                    <span className="text-2xl">🛍️</span>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">{formatPrice(product.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sticky bottom-0 py-4">
                <button
                    onClick={() => navigate(`/rooms/${roomData.id}/new-expense`)}
                    className="w-full max-w-150 mx-auto block bg-orange-500 text-white py-4 rounded-xl font-medium hover:bg-orange-600 transition-colors">
                    Create New Expense
                </button>
            </div>
        </div>
    );
};

export default RoomWithProducts;