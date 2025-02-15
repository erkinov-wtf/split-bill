import React, { useState } from 'react';
import { X as CloseIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const JoinRoomPage = () => {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleJoin = () => {
        console.log('Joining room:', roomId);
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-6 relative">
            {/* Close Button */}
            <button
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all">
                <CloseIcon size={15}/>
            </button>


            {/* Form Container */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                {/* ROOM ID Input */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                    ROOM ID
                </label>
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter Room ID"
                />

                {/* Join Button */}
                <button
                    onClick={handleJoin}
                    className="w-full mt-4 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all">
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default JoinRoomPage;
