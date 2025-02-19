import { useState } from "react";
import { Eye, Check, X, ArrowRight } from "lucide-react";

function Registration() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showValidation, setShowValidation] = useState(false);

    const isLongEnough = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const passwordsMatch = password === confirmPassword && password;

    const allValid = isLongEnough && hasLetter && hasNumber && passwordsMatch;

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setShowValidation(true);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setShowValidation(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allValid) {
            alert("Registration Successful!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-96 p-6 bg-white rounded-2xl  shadow-xl  ring-amber-500 ring 1">
                <h2 className="text-3xl font-bold text-gray-800">Registration</h2>

                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-500 font-semibold mt-4">FULL NAME</label>
                    <input
                        type="text"
                        placeholder="Your Full Name"
                        className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <label className="block text-gray-500 font-semibold mt-4">LOGIN</label>
                    <input
                        type="text"
                        placeholder="Enter login"
                        className="w-full p-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <label className="block text-gray-500 font-semibold mt-4">NEW PASSWORD</label>
                    <div className="relative mb-4">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full p-2 border rounded-lg pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <Eye
                            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        />
                    </div>

                    <label className="block text-gray-500 font-semibold">CONFIRM PASSWORD</label>
                    <div className="relative mb-4">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Confirm password"
                            className="w-full p-2 border rounded-lg pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        {/*<Eye*/}
                        {/*    className="absolute right-3 top-3 text-gray-500 cursor-pointer"*/}
                        {/*    onClick={() => setPasswordVisible(!passwordVisible)}*/}
                        {/*/>*/}
                        {/*{passwordsMatch && <Check className="absolute right-3 top-3 text-green-500" />}*/}
                    </div>

                    {showValidation && !allValid && (
                        <div className="mb-4">
                            <p className={isLongEnough ? "text-green-500 flex items-center" : "text-red-500 flex items-center "}>
                                {isLongEnough ? <Check className="mr-2 " /> : <X className="mr-2" />} Must be at least 8 characters long
                            </p>
                            <p className={hasLetter ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                                {hasLetter ? <Check className="mr-2" /> : <X className="mr-2" />} Must include at least one letter
                            </p>
                            <p className={hasNumber ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                                {hasNumber ? <Check className="mr-2" /> : <X className="mr-2" />} Must include at least 1 number
                            </p>
                            <p className={passwordsMatch ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                                {passwordsMatch ? <Check className="mr-2" /> : <X className="mr-2" />} Passwords must match
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#FFCA62] text-white font-semibold py-2 rounded-lg flex justify-center items-center hover:bg-yellow-500 transition">
                        Register
                        <ArrowRight className="ml-2" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registration;
