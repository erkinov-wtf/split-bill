import './App.css'
import Login from "./Pages/Login/index.jsx";
import { Route, Routes} from "react-router-dom";
import UsersRoomPage from "./pages/all-users-rooms/usersRoomPage.jsx";
import Bottombar from "./pages/all-users-rooms/navbar.jsx";


function App() {

  return (
    <>

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/rooms" element={<UsersRoomPage/>} />
        </Routes>
        
        <Bottombar/>

    </>
  )
}

export default App
