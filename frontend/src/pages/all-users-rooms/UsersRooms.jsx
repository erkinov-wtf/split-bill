
import { useState } from "react";
import { Plus, User, DollarSign, Pin, Search, X } from "lucide-react";
import noRoom from "../../assets/img.png";

export default function UsersRoomPage() {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const addRoom = () => {
        const newRoom = {
            name: `New Room ${rooms.length + 1}`,
            friends: Math.floor(Math.random() * 10) + 1,
            expenses: Math.floor(Math.random() * 5) + 1,
            status: Math.random() > 0.5 ? "active" : "archived",
            pinned: Math.random() > 0.5
        };
        setRooms([...rooms, newRoom]);
    };

    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex">
            {/* Sidebar */}


            {/* Main Content */}
            <div className="p-6  w-85
            ">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 sticky  top-0 bg-white h-26 p-4 rounded-lg shadow-md w-85 -ml-7">
                    <h1 className="text-2xl font-bold">Rooms</h1>
                    <div className="flex gap-2">
                        {rooms.length >= 1 && (
                            <button
                                className="bg-yellow-400 p-2 rounded-full shadow-md hover:bg-yellow-500"
                                onClick={() => setShowSearch(!showSearch)}
                            >
                                {showSearch ? <X className="w-6 h-6 text-black" /> : <Search className="w-6 h-6 text-black" />}
                            </button>
                        )}
                        <button
                            className="bg-yellow-400 p-2 rounded-full shadow-md hover:bg-yellow-500"
                            onClick={addRoom}
                        >
                            <Plus className="w-6 h-6 text-black items-center" />
                        </button>
                    </div>
                </div>

                {/* Search Input */}
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md shadow-sm sticky top-27 bg-white"
                    />
                )}

                {/* Active Rooms Section */}
                {rooms.length !== 0 &&
                    <div>
                        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                            <h2 className="text-lg font-semibold mb-2">Active Rooms</h2>
                            <div className="space-y-4">
                                {filteredRooms
                                    .filter(room => room.status === "active")
                                    .map((room, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-orange-400 hover:text-white">
                                            <div>
                                                <h3 className="font-bold">{room.name}</h3>
                                                <p className="text-sm flex items-center gap-1">
                                                    <User className="w-4 h-4 text-gray-500" /> {room.friends} friends
                                                </p>
                                                <p className="text-sm flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4 text-gray-500" /> {room.expenses} expenses
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm text-blue-500">{room.status}</span>
                                                {room.pinned && <Pin className="w-4 h-4 text-gray-500 ml-2 inline-block" />}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>


                        <div className="bg-white p-4 rounded-lg shadow-md ">
                            <h2 className="text-lg font-semibold mb-2">Archived Rooms</h2>
                            <div className="space-y-4">
                                {filteredRooms
                                    .filter(room => room.status === "archived")
                                    .map((room, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-orange-400 hover:text-white">
                                            <div>
                                                <h3 className="font-bold">{room.name}</h3>
                                                <p className="text-sm flex items-center gap-1">
                                                    <User className="w-4 h-4 text-gray-500" /> {room.friends} friends
                                                </p>
                                                <p className="text-sm flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4 text-gray-500" /> {room.expenses} expenses
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm text-gray-400">{room.status}</span>
                                                {room.pinned && <Pin className="w-4 h-4 text-gray-500 ml-2 inline-block" />}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>   }
                {rooms.length === 0 &&
                    <div className="flex flex-col items-center justify-center  text-center px-4 ">
                        {/* Illustration */}
                        <div className="mb-4">
                            <img src={noRoom} alt="No Rooms" className="w-24 h-24" />
                        </div>

                        {/* Message */}
                        <p className="text-gray-600 text-lg">You have no room.</p>
                        <p className="text-gray-500">Create a first room and enjoy Split Bill!</p>

                        {/* Join Existing Room */}
                        <p className="mt-4 text-gray-500">Just join an existing room</p>
                        <p className="text-gray-500">by entering room ID</p>
                    </div>}

            </div>
        </div>
    );
}
