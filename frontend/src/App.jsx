import './App.css';
import Onboarding from "./pages/onboarding/index.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
        </>
    );
}

export default App;
