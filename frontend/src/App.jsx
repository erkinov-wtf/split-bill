import './App.css'
import Login from "./Pages/Login/index.jsx";
import {Link, Route, Routes} from "react-router-dom";
import ExpenseApp from "./pages/empty-new-room/emptyNewRoom.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
            <Route path="/empty-new-room" element={<ExpenseApp />} />
        </Routes>
        
        <Link to="/login">Login</Link>
        <Link to="/empty-new-room">ExpenseApp</Link>
    </>
  )
}

export default App
