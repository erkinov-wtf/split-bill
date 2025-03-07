import { useState } from "react";
import { Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message

    const navigate = useNavigate();


    const redirectToRegistration = async () => {
        navigate("/registration");
    }

    const handleLogin = async () => {
        setErrorMessage(""); // Reset error message before request

        try {
            const response = await fetch("https://split-bill.steamfest.live/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("session_id", data.id);

                navigate("/rooms");
            } else {
                setErrorMessage("Incorrect login credentials. Please try again.");
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-96 p-6 bg-white rounded-2xl shadow-xl">
                <h3 className="text-4xl font-bold text-gray-800">Login</h3>
                <p className="text-gray-600 mb-6">Welcome back!</p>

                <label htmlFor="username" className="block text-gray-700 font-semibold">USERNAME</label>
                <div className="relative mb-4">
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="sama"
                        className="w-full p-2 border rounded-lg pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <label htmlFor="password" className="block text-gray-700 font-semibold">PASSWORD</label>
                <div className="relative mb-6">
                    <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full p-2 border rounded-lg pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Eye
                        data-testid="eye-icon"
                        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                </div>

                {/* Show error message */}
                {errorMessage && (
                    <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}

                <button
                    onClick={handleLogin}
                    className="w-full bg-[#FFCA62] text-white font-semibold py-2 rounded-lg flex justify-center items-center hover:bg-yellow-500 transition">
                    Log In
                    <ArrowRight className="ml-2" />
                </button>

                <p className="text-center text-gray-600 mt-4">or if you are new user, just register</p>
                <button onClick={redirectToRegistration}  className="w-full bg-black text-white py-2 rounded-lg mt-3 hover:bg-gray-800 transition">
                    Register
                </button>
            </div>
        </div>
    );
}

export default Login;
