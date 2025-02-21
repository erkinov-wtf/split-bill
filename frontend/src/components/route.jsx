import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const sessionId = localStorage.getItem("session_id");

    return sessionId ? children : <Navigate to="/onboarding" replace />;
};

export default PrivateRoute;
