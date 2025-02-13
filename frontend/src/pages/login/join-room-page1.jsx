import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate(); // Allows navigation

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white w-80 p-6 rounded-xl shadow-lg flex flex-col items-center">

                {/* Close button */}
                <button
                    className="self-start text-gray-600 hover:text-black"
                    onClick={() => navigate(-1)} // Navigates back
                >
                    &#10006;
                </button>

                {/* Room ID Input */}
                <label htmlFor="roomId" className="w-full text-gray-700 mt-4 text-sm">
                    ROOM ID
                </label>
                <input
                    id="roomId"
                    type="text"
                    name="roomId"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none text-black bg-gray-50"
                    placeholder="Enter Room ID"
                />

                {/* Join Room Button */}
                <button
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-md mt-4"
                    onClick={() => console.log("Joining room:", roomId)}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
}