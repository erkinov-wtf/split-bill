import React from 'react';
import './emptyNewRoom.css';

const BottomNav = () => {
    return (
        <div className="bottom-nav">
            <a href="#" className="nav-item">
                <img src="/empty-room/activities.png" className="nav-icon" alt="Activity Icon" style={{ width: '32px', height: '32px' }} />
                <span>Activity</span>
            </a>
            <a href="#" className="nav-item">
                <img src="/empty-room/rooms.png" className="nav-icon" alt="Rooms Icon" style={{ width: '32px', height: '32px' }} />
                <span>Rooms</span>
            </a>
            <a href="#" className="nav-item add-button">
                <div className="plus-circle">
                    <span>+</span>
                </div>
            </a>
            <a href="#" className="nav-item">
                <img src="/empty-room/friends.png" className="nav-icon" alt="Friends Icon" style={{ width: '32px', height: '32px' }} />
                <span>Friends</span>
            </a>
            <a href="#" className="nav-item">
                <img src="/empty-room/account.png" className="nav-icon" alt="Account Icon" style={{ width: '32px', height: '32px' }} />
                <span>Account</span>
            </a>
        </div>
    );
};

const EmptyNewRoom = () => {
    return (
        <div className="container">
            <div className="rectangle primary">
                <div className="text-layout">
                    <span className="primary-text">The Sydney Vacation</span>
                </div>
                <div className="text-layout-small">
                    <p className="small-text">Room ID: 77</p>
                </div>
                <div className="statistics-layout">
                    <button className="icon-button">
                        <img src="/empty-room/statistics.png" alt="Statistics" className="statistics-image" />
                    </button>
                </div>
                <div className="profile-layout">
                    <button className="icon-button">
                        <img src="/empty-room/profile.png" alt="Profile" className="profile-image" />
                    </button>
                </div>
                <div className="back-layout">
                    <button className="icon-button">
                        <img src="/empty-room/back.png" alt="Back" className="back-image" />
                    </button>
                </div>

            </div>
            <div className="rectangle secondary">
                <img
                    src="/empty-room/empty.png"
                    alt="Secondary Content"
                    className="secondary-image"
                />
                <p className="secondary-text">
                    You have no expense!<br/>
                    Try create a new one here
                </p>
                <div className="arrow-down"></div>
            </div>
            <BottomNav/>
        </div>
    );
};

export default EmptyNewRoom;