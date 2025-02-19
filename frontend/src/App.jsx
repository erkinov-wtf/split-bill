import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Onboarding from "./pages/onboarding/index.jsx";
import JoinRoomPage from "./pages/join-room/index.jsx";
import Login from "./pages/login/index.jsx";
import CreateRoom from "./pages/create-room/index.jsx";
import UpdateUserStatus from "./pages/update-user-status/index.jsx";

const Home = () => {
    return (
        <div>
            <p className="text-black">Home Page Content</p>
            <Link to="/onboarding" className="text-blue-500 underline">Go to Onboarding</Link>
        </div>
    );
};

function App() {
    return (
        <Routes>
            {/* Onboarding Page (OUTSIDE Layout) */}
            <Route path="/onboarding" element={<Onboarding />} />

            {/* All Other Pages (INSIDE Layout) */}
            <Route path="*" element={<Layout><Home /></Layout>} />
            <Route path="/join" element={<Layout><JoinRoomPage /></Layout>} />
            <Route path="/Login" element={<Layout><Login /></Layout>} />

            <Route path="/create" element={<Layout><CreateRoom /></Layout>} />
            <Route path="/update-status" element={<Layout><UpdateUserStatus /></Layout>} />
        </Routes>
    );
}

export default App