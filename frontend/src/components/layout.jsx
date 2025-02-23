import React from "react";
import {Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const UserInfo = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("session_id");
        navigate("/login");
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow sticky top-0">
            <div className="flex flex-col items-center text-center">
                <img
                    src="/profile.jpg"
                    alt="User"
                    className="w-24 h-24 mb-2 border-4 border-gray-300 rounded-full mx-auto"
                />
                <h2 className="text-lg font-semibold text-gray-900">Rakhmatilla Erkinov</h2>
                <p className="text-gray-600">Student at New Uzbekistan University</p>
                <p className="text-gray-600 mb-2">Tashkent Region</p>
                <p className="font-medium text-gray-900">OY STARTECH LLC</p>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between text-gray-600 text-sm">
                <span>Profile viewers</span>
                <span className="text-blue-500 font-semibold">13</span>
            </div>
            <button
                onClick={logout}
                className="mt-2 w-full py-2 text-sm font-semibold bg-orange-500 text-white rounded hover:bg-orange-600"
            >
                Logout
            </button>
            <hr className="my-3 border-gray-300" />
            <div className="space-y-2 text-gray-600">
                <div className="flex items-center cursor-pointer hover:text-gray-900">
                    <span className="mr-2">📑</span> Saved items
                </div>
                <div className="flex items-center cursor-pointer hover:text-gray-900">
                    <span className="mr-2">👥</span> Groups
                </div>
                <div className="flex items-center cursor-pointer hover:text-gray-900">
                    <span className="mr-2">📰</span> Newsletters
                </div>
                <div className="flex items-center cursor-pointer hover:text-gray-900">
                    <span className="mr-2">📅</span> Events
                </div>
            </div>
        </div>
    );
};

const ExtraContent = () => (
    <div className="bg-white text-black p-4 rounded-lg shadow sticky top-0">
        <Typography variant="h6" className="font-semibold">Spending</Typography>
        <div className="flex justify-between items-center mt-2">
            <Typography variant="body2" className="text-gray-600">You Spent:</Typography>
            <Typography variant="h6" className="font-bold">$2,272.52</Typography>
        </div>
        <div className="flex justify-between items-center">
            <Typography variant="body2" className="text-gray-600">Total Receivable:</Typography>
            <Typography variant="h6" className="text-green-600 font-bold">+ $938.83</Typography>
        </div>
        <Divider className="my-3 border-gray-300" />
        <Typography variant="h6" className="font-semibold">Spending Breakdown</Typography>
        <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <Typography variant="body2">Entertainment</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <Typography variant="body2">Shopping</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                <Typography variant="body2">Dining</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                <Typography variant="body2">Uncategory</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-teal-400 rounded-full"></div>
                <Typography variant="body2">Transportation</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <Typography variant="body2">Others</Typography>
            </div>
        </div>
        <Divider className="my-3 border-gray-300" />
        <Typography variant="h6" className="font-semibold">Frequent Spend</Typography>
        <div className="bg-gray-100 p-4 rounded-lg mt-2">
            <Typography variant="body2">Bateaux Parisiens 3x - $322.50</Typography>
            <Typography variant="body2">Carrousel du Louvre 3x - $268.24</Typography>
            <Typography variant="body2">L'Ami Louis 2x - $260.00</Typography>
        </div>
    </div>
);

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-4 px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3">
                        <div className="relative">
                            <UserInfo />
                        </div>
                    </div>
                    <div className="md:col-span-6">
                        <div className="min-h-[calc(100vh-2rem)] bg-white rounded-lg shadow">
                            {children}
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <div className="relative">
                            <ExtraContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;