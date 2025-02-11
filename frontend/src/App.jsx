import './App.css'
import Login from "./Pages/Login/index.jsx";
import {Link, Route, Routes} from "react-router-dom";
import AccordionExpandIcon from "./pages/join-room/index.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>

                <Route path="/join-room" element={<AccordionExpandIcon/>}/>
            </Routes>

            <Link to="/login">Login</Link>
        </>
    )
}

export default App
