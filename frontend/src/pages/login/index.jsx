import { useState } from "react";
import { Eye, Check, ArrowRight } from "lucide-react";

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">

        <div className="w-96 p-6 bg-white rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                <p className="text-gray-600 mb-6">Welcome back!</p>

                <label className="block text-gray-700 font-semibold">EMAIL</label>
                <div className="relative mb-4">
                    <input
                        type="email"
                        placeholder="yourname@email.com"
                        className="w-full p-2 border rounded-lg pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Check className="absolute right-3 top-3 text-green-500" />
                </div>

                <label className="block text-gray-700 font-semibold">PASSWORD</label>
                <div className="relative mb-6">
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full p-2 border rounded-lg pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Eye
                        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                </div>

                <button className="w-full bg-[#FFCA62] text-white font-semibold py-2 rounded-lg flex justify-center items-center hover:bg-yellow-500 transition">
                    Log In
                    <ArrowRight className="ml-2" />
                </button>

                <p className="text-center text-gray-600 mt-4">or if you are new user, just register</p>
                <button className="w-full bg-black text-white py-2 rounded-lg mt-3 hover:bg-gray-800 transition">Register</button>
            </div>
        </div>
    );
}

export default Login;
