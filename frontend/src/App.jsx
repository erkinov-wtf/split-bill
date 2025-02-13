import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/login/join-room-page1.jsx"; // Corrected the login page import
import JoinRoom from "./pages/Login/join-room-page1.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/join-room" element={<JoinRoom />} />
            </Routes>

            <Link to="/login">Login</Link>
            <Link to="/join-room">Join Room</Link>
        </>
    );
}

export default App;
