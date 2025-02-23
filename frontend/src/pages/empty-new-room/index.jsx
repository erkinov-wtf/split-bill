import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyRoomPage = ({ roomName, roomId }) => {
    const navigate = useNavigate();
    const [isCreator, setIsCreator] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const sessionId = localStorage.getItem("session_id");

    useEffect(() => {
        checkRoomOwnership();
    }, [roomId]);

    const checkRoomOwnership = async () => {
        try {
            const response = await fetch('https://split-bill.steamfest.live/v1/rooms/created',  {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "X-Ya-User-Ticket": sessionId,
                },
            });
            const data = await response.json();

            const isOwner = data.items.some(room => room.id === parseInt(roomId));
            setIsCreator(isOwner);
            setIsLoading(false);
        } catch (error) {
            console.error('Error checking room ownership:', error);
            setIsLoading(false);
        }
    };

    const handleCreateExpense = () => {
        if (isCreator) {
            navigate(`/rooms/${roomId}/new-expense`);
        } else {
            setShowAlert(true);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            {/* Header */}
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
                            <h3 className="text-3xl font-semibold text-gray-900">{roomName}</h3>
                            <span className="text-xl text-gray-500 mt-1">Room ID: {roomId}</span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => navigate("participants")} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                            <path d="M3 8h18" strokeWidth="1.5"/>
                            <path d="M8 13h8" strokeWidth="1.5"/>
                            <path d="M8 17h5" strokeWidth="1.5"/>
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Expenses Yet</h3>
                    <p className="text-gray-500 mb-6">Start tracking your group expenses by creating your first one</p>
                    <button
                        onClick={handleCreateExpense}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Create New Expense
                    </button>
                </div>
            </div>

            {/* Alert Modal */}
            {showAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                        <div className="flex items-center mb-4">
                            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900">Permission Denied</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Only the room creator can add new expenses.
                        </p>
                        <button
                            onClick={() => setShowAlert(false)}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Understood
                        </button>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-900">Loading...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmptyRoomPage;