import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
    const [roomName, setRoomName] = useState("");
    const navigate = useNavigate();
    const sessionId = localStorage.getItem("session_id");
    const [errorMessage, setErrorMessage] = useState("");

    const handleDone = async () => {
        if (roomName.trim()) {
            try {
                const response = await fetch("https://split-bill.steamfest.live/v1/rooms", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "X-Ya-User-Ticket": sessionId,
                    },
                    body: JSON.stringify({
                        name: roomName,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    navigate(`/rooms/${data.id}`);
                }
            } catch (error) {
                setErrorMessage("Something went wrong. Please try again later.");
            }
        }
    };

    const handleCancel = () => {
        navigate("/rooms");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative -mt-20">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create Room</h2>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a descriptive name"
                    autoFocus
                />
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                <p className="text-gray-600 text-sm mt-2">Create a room to start collaborating with others. Use a clear name that participants will recognize.</p>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDone}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
