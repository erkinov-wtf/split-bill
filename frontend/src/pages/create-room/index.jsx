import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();

    const handleDone = () => {
        if (roomName.trim()) {
            // Process room creation here
            console.log('Creating room:', roomName);

            // Navigate back to home or to the newly created room
            navigate('/');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-md max-w-md mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <button
                    onClick={handleCancel}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-lg font-semibold text-gray-800">Create Room</h2>
                <button
                    onClick={handleDone}
                    className={`text-blue-600 font-medium ${!roomName.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-800 transition-colors'}`}
                    disabled={!roomName.trim()}
                >
                    Done
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col px-6 pt-8 pb-6">
                <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-2">
                    Room Name
                </label>
                <div className="relative">
                    <input
                        id="roomName"
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full border-0 border-b-2 border-gray-300 pb-2 text-lg text-black focus:ring-0 focus:border-blue-500 transition-colors bg-transparent"
                        placeholder="Enter a descriptive name"
                        autoFocus
                    />
                </div>

                <p className="mt-4 text-sm text-gray-500">
                    Create a room to start collaborating with others. Use a clear name that participants will recognize.
                </p>
            </div>
        </div>
    );
};

export default CreateRoom;