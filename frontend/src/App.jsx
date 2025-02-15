import './App.css'
import Login from "./Pages/Login/index.jsx";
import {Link, Route, Routes} from "react-router-dom";
import CreateExpense from "./pages/expense/createExpense.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/expense" element={<CreateExpense />} />
        </Routes>

        <Link to="/login">Login</Link>
    </>
  )
}

export default App
