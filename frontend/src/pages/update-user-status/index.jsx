import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateUserStatus = () => {
    const navigate = useNavigate();

    // Initial users data
    const [users, setUsers] = useState([
        { id: 1, name: 'Benjamin Willis', amount: 128.0, paid: true },
        { id: 2, name: 'Beulah Walker', amount: 128.0, paid: false, hasNotification: true },
        { id: 3, name: 'Sally Hawkins', amount: 128.0, paid: false },
        { id: 4, name: 'Song Bao', amount: 128.0, paid: true },
    ]);

    // Pre-select Benjamin
    const [selectedUsers, setSelectedUsers] = useState([1]);

    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const makeUnpaid = () => {
        setUsers((prev) =>
            prev.map((user) =>
                selectedUsers.includes(user.id)
                    ? { ...user, paid: false }
                    : user
            )
        );
    };

    const makePaid = () => {
        setUsers((prev) =>
            prev.map((user) =>
                selectedUsers.includes(user.id)
                    ? { ...user, paid: true }
                    : user
            )
        );
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center">
                <button onClick={handleBack} className="mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h5 className="text-center text-black flex-grow text-lg mr-7 font-semibold">Expense</h5>
                {/* Dummy spacer for alignment */}
                <div className="w-6"></div>
            </div>

            {/* Main Content */}
            <div className="flex-grow text-black p-4">
                <h2 className="text-2xl font-bold mb-5">Product super name</h2>
                <p className="text-sm mb-4">Assigned Friends</p>

                <div className="space-y-4">
                    {users.map((user) => {
                        const isSelected = selectedUsers.includes(user.id);
                        return (
                            <div key={user.id} className="flex items-center justify-between">
                                {/* Left side: checkbox, avatar/notification, name & status */}
                                <div className="flex items-center">
                                    {/* Checkbox */}
                                    <div
                                        onClick={() => toggleUserSelection(user.id)}
                                        className={`w-5 h-5 mr-3 flex items-center justify-center border border-gray-300 rounded cursor-pointer 
                      ${isSelected ? 'bg-black border-black' : 'bg-white'}
                    `}
                                    >
                                        {isSelected && (
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 12L10 17L19 8"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Notification/avatar */}
                                    {user.hasNotification ? (
                                        <div className="mr-3">
                                            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
                                                {/* Example bell icon */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                                    )}

                                    <div>
                                        <p className="font-medium text-sm">{user.name}</p>
                                        <p
                                            className={`text-xs ${
                                                user.paid ? 'text-green-500' : 'text-red-500'
                                            }`}
                                        >
                                            {user.paid ? 'Paid' : 'Unpaid'}
                                        </p>
                                    </div>
                                </div>

                                {/* Right side: amount */}
                                <div>
                                    <p className="font-medium text-sm">${user.amount.toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer with buttons */}
            <div className="p-4 border-t border-gray-200 flex space-x-4">
                <button
                    onClick={makeUnpaid}
                    className="flex-1 bg-yellow-400 text-black py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors"
                >
                    Make Unpaid
                </button>
                <button
                    onClick={makePaid}
                    className="flex-1 bg-yellow-400 text-black py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors"
                >
                    Make Paid
                </button>
            </div>
        </div>
    );
};

export default UpdateUserStatus;
