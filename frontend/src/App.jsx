import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Onboarding from "./pages/onboarding/index.jsx";
import JoinRoomPage from "./pages/join-room/index.jsx";
import Login from "./pages/login/index.jsx";
import UsersRoomPage from "./pages/all-users-rooms/index.jsx";
import CreateRoom from "./pages/create-room/index.jsx";
import UpdateUserStatus from "./pages/update-user-status/index.jsx";
import SuccessPage from "./pages/success-page/index.jsx";
import CreateExpense from "./pages/expence/index.jsx";
import Registration from "./pages/registration/index.jsx";
import PrivateRoute from "./components/route.jsx";
import EmptyRoomPage from "./pages/empty-new-room/index.jsx";
import RoomPage from "./pages/room-page/index.jsx";

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
            {/* Public Routes */}
            <Route path="/onboarding" element={<Onboarding/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/success-page" element={<SuccessPage/>}/>

            {/* Protected Routes */}
            <Route path="*" element={<PrivateRoute><Layout><Home/></Layout></PrivateRoute>}/>
            <Route path="/join" element={<PrivateRoute><Layout><JoinRoomPage/></Layout></PrivateRoute>}/>
            <Route path="/create" element={<PrivateRoute><Layout><CreateRoom/></Layout></PrivateRoute>}/>
            <Route path="/rooms" element={<PrivateRoute><Layout><UsersRoomPage/></Layout></PrivateRoute>}/>

            <Route path="/update-status" element={<PrivateRoute><Layout><UpdateUserStatus/></Layout></PrivateRoute>}/>
            <Route path="/empty-new-room" element={<PrivateRoute><Layout><EmptyRoomPage/></Layout></PrivateRoute>}/>


            <Route path="/rooms/:roomId/new-expense" element={<PrivateRoute><Layout><CreateExpense/></Layout></PrivateRoute>}/>
            <Route path="/rooms/:roomId" element={<PrivateRoute><Layout><RoomPage/></Layout></PrivateRoute>}/>
        </Routes>
    );
}

export default App;
