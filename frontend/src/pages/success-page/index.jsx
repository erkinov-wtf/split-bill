import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const redirectLogin = () => {
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="text-center bg-white ">
                <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 relative">
                        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="5" fill="none" />
                            <path d="M30 50 L45 65 L75 35" stroke="black" strokeWidth="5" fill="none" />
                            <path d="M50 10 A40 40 0 0 1 90 50" fill="none" stroke="orange" strokeWidth="5" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Congrats!</h2>
                <p className="text-gray-600">You have successfully registered.</p>
                <p className="text-gray-600 mb-4">Redirecting to login in 3 seconds...</p>
                <button onClick={redirectLogin} className="bg-yellow-400 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">
                    Log In Now
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
