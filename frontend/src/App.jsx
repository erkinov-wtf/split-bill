import './App.css'
import Login from "./Pages/Login/index.jsx";
import {Link, Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
        
        <Link to="/login">Login</Link>
    </>
  )
}

export default App
