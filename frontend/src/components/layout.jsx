import React, {useEffect, useState} from "react";
import {Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const sessionId = localStorage.getItem("session_id");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://split-bill.steamfest.live/me", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "X-Ya-User-Ticket": sessionId,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const logout = () => {
        localStorage.removeItem("session_id");
        navigate("/login");
    };

    if (isLoading) {
        return (
            <div className="bg-white p-4 rounded-lg shadow sticky top-0">
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-2 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-4 rounded-lg shadow sticky top-0">
                <div className="text-red-500 text-center">
                    Failed to load user data. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow sticky top-0">
            <div className="flex flex-col items-center text-center">
                <img
                    src={userData?.photo_url || '/default-profile.jpg'}
                    alt={userData?.full_name || 'User'}
                    className="w-24 h-24 mb-2 border-4 border-gray-300 rounded-full mx-auto"
                    onError={(e) => {
                        e.target.src = '/default-profile.jpg';
                    }}
                />
                <h2 className="text-lg font-semibold text-gray-900">
                    {userData?.full_name || 'Anonymous User'}
                </h2>
                <p className="text-gray-600">Student at New Uzbekistan University</p>
                <p className="text-gray-600 mb-2">Tashkent</p>
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
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 space-y-2">
        {/* Spending Overview Section */}
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Spending</h2>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">You Spent:</span>
                    <span className="text-xl font-bold text-gray-800">$2,272.52</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Receivable:</span>
                    <span className="text-xl font-bold text-emerald-600">+ $938.83</span>
                </div>
            </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Spending Breakdown Section */}
        <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-800">Spending Breakdown</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Shopping</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Dining</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 bg-teal-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">Games</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Others</span>
                </div>
            </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Frequent Spend Section */}
        <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-800">Frequent Spend</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bateaux Parisiens</span>
                    <span className="text-sm font-medium text-gray-600">3x - $322.50</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Carrousel Louvre</span>
                    <span className="text-sm font-medium text-gray-600">3x - $268.24</span>
                </div>
            </div>
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