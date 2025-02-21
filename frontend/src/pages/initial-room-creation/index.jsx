import React from "react";
import rasm from "./Symbolpng.png";



const InitialRoomCreation = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg w-full h-full flex flex-col items-center justify-center">
                <div className="flex justify-center mb-4">
                    <img src={rasm}  className="w-24 h-24" />
                </div>
                <h2 className="text-2xl text-5xl font-bold mb-2">Welcome to Split Bill!</h2>
                <p className="text-gray-600 text-center">You can create Rooms then create expense to split bills with your friends.</p>
                <div className="mt-4 w-48">
                    <button className="   bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg shadow hover:bg-yellow-500" disabled>
                        Create Room
                    </button>
                </div>
                <div className="mt-2 w-48">
                    <button className=" bg-gray-300 text-white font-bold py-2 px-6 rounded-lg shadow cursor-not-allowed" disabled>
                        Join Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InitialRoomCreation;