import { Typography } from "@mui/material";

const Onboarding = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            {/* White Background - Now Wider */}
            <div className="w-[90vw] md:w-[75vw] lg:w-[65vw] xl:w-[55vw] h-[90vh] bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg relative">

                {/* Logo - Centered & Scaled */}
                <div className="w-64 h-64 flex justify-center items-center mb-6">
                    <img
                        src="/src/assets/Logo.png"
                        alt="Split Bill Logo"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Text - Sliding in from Right to More Centered Below Logo */}
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    className="absolute text-black tracking-wide uppercase font-extrabold text-5xl font-sans animate-[slide-in_0.5s_ease-out_forwards]"
                    style={{ top: "calc(50% + 140px)", left: "50%", transform: "translateX(-50%)" }}
                >
                    Split Bill
                </Typography>

                <style>
                    {`
                        @keyframes slide-in {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(-50%); opacity: 1; }
                        }
                    `}
                </style>
            </div>
        </div>
    );
};

export default Onboarding;