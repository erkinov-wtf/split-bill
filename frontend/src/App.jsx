import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/join-room-page.jsx";
import Onboarding from "./Pages/Login/join-room-page.jsx"; // Добавляем Onboarding

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Onboarding />} /> {/* Показываем Onboarding на главной */}
                <Route path="/login" element={<Login />} />
            </Routes>

            <Link to="/login">Login</Link>
        </>
    );
}

export default App;
