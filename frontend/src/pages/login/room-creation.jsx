import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white w-96 h-[500px] p-6 rounded-xl shadow-lg flex flex-col relative">

                {/* Close button at top-left */}
                <button
                    className="absolute top-4 left-4 bg-orange-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-orange-700"
                    onClick={() => navigate(-1)}
                >
                    &#10006;
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-700 text-center mt-8">
                    Create a Room
                </h2>

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Enter Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full mt-6 p-3 text-gray-700 text-lg border-b border-gray-300 focus:outline-none focus:border-gray-500"
                />

                {/* Done Button (Now right below the input box) */}
                <button
                    className="mt-4 ml-auto bg-orange-500 text-blue-500 font-medium px-6 py-2 rounded-lg hover:bg-orange-700"
                    onClick={() => console.log("Room Created:", roomName)}
                >
                    Done
                </button>
            </div>
        </div>
    );
}
