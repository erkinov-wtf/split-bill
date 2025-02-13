import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/login/room-creation.jsx";

import CreateRoom from "./pages/Login/room-creation.jsx"; // ✅ Added CreateRoom

function App() {
    return (
        <>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/create-room" element={<CreateRoom />} /> {/* ✅ New Route */}
            </Routes>

            {/* Navigation Links */}
            <div className="flex gap-4 mt-4">
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                <Link to="/join-room" className="text-blue-500 hover:underline">Join Room</Link>
                <Link to="/create-room" className="text-green-500 hover:underline">Create Room</Link> {/* ✅ New Link */}
            </div>
        </>
    );
}

export default App;
