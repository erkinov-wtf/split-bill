import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";

const ParticipantsPage = () => {
    const { roomId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sessionId = localStorage.getItem("session_id");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`https://split-bill.steamfest.live/v1/rooms/${roomId}/users`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "X-Ya-User-Ticket": sessionId,
                    },
                });
                if (!response.ok) throw new Error("Failed to load participants");
                const data = await response.json();
                setParticipants(data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
    }, [roomId]);

    if (loading) return <div className="text-center text-gray-500 py-10">Loading participants...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h3 className="text-3xl ml-5 font-bold text-gray-900 text-center flex-grow">
                    Room ID {roomId} Participants
                </h3>
                <div className="w-10"></div>
                {/* Spacer to balance layout */}
            </div>


            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {participants.map(user => (
                        <div key={user.id} className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                            <img src={user.photo_url} alt={user.full_name}
                                 className="w-12 h-12 rounded-full object-cover border border-gray-300 mr-4"/>
                            <div>
                                <p className="text-lg font-semibold text-gray-900">{user.full_name}</p>
                                <p className="text-gray-500 text-sm">@{user.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ParticipantsPage;
