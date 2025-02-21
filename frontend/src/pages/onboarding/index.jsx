import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);

        // Cleanup timer when component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen w-screen bg-white">
            <div className="flex flex-col items-center">
                <img
                    src="/logo.png"
                    alt="Split Bill Logo"
                    className="w-32 h-32 object-contain"
                />
            </div>
        </div>
    );
};

export default Onboarding;