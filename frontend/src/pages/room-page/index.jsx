import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyRoomPage from "../empty-new-room/index.jsx";
import RoomWithProducts from "../room-with-products/index.jsx";

const RoomPage = () => {
    const { roomId } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sessionId = localStorage.getItem("session_id");

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`https://split-bill.steamfest.live/v1/rooms/${roomId}`, {
                    headers: {
                        "X-Ya-User-Ticket": sessionId,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch room data');
                }

                const data = await response.json();
                setRoomData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomData();
    }, [roomId, sessionId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600">
                {error}
            </div>
        );
    }

    if (!roomData || roomData.room_products.length === 0) {
        return <EmptyRoomPage
            roomName={roomData?.name}
            roomId={roomId}
        />;
    }

    return <RoomWithProducts roomData={roomData} />;
};

export default RoomPage;