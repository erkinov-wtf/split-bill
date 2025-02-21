import React, { useState } from 'react';
import { X as CloseIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const JoinRoomPage = () => {
    const [roomId, setRoomId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const sessionId = localStorage.getItem("session_id");

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
            return await response.json();
        } catch (err) {
            console.error(`Error fetching room ${roomId} details:`, err);
            return null;
        }
    };

    const handleJoin = async () => {
        setLoading(true);
        setMessage('');
        const data = await fetchRoomDetails(roomId);
        if (data) {
            setMessage('Room found! Joining now');
            setTimeout(() => navigate(`/rooms/${roomId}`), 1350);
        } else {
            setMessage('Failed to find room. Please check the Room ID.');
        }
        setLoading(false);
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-6 relative">
            {/* Close Button */}
            <button
                onClick={() => navigate("/rooms")}
                className="absolute top-4 left-4 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all">
                <CloseIcon size={15}/>
            </button>

            {/* Form Container */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                    ROOM ID
                </label>
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter Room ID"
                    disabled={loading}
                />

                {/* Join Button */}
                <button
                    onClick={handleJoin}
                    className="w-full mt-4 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all"
                    disabled={loading}>
                    {loading ? 'Searching...' : 'Join Room'}
                </button>

                {/* Status Message */}
                {message && (
                    <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
                )}
            </div>
        </div>
    );
};

export default JoinRoomPage;
