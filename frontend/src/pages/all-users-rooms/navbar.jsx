import { Link } from "react-router-dom";
import Home from "../../assets/bottombar/Home.png";
import rooms from "../../assets/bottombar/ic_groups_active.png";
import friends from "../../assets/bottombar/ic_friends_normal.png";
import account from "../../assets/bottombar/ic_account_normal.png";



export default function Bottombar() {
    return (
        <div className="  bg-white border-2 text-black border-gray-200  fixed left-105 bottom-0 p-4 rounded-t-4xl shadow-xl w-200 h-30 ">
            {/* Logo */}


            {/* Navigation Menu */}
            <nav className="flex justify-between ">
                <Link  to="/home"> <img className="w-15 hover:w-17 " src={Home}/>Home</Link>

                <Link  to="/rooms">
                   <img className="w-15 hover:w-17"  src={rooms}/> Rooms
                </Link>
                <Link to="/friends">
                   <img className="w-15 hover:w-17"  src={friends}/> Friends
                </Link>
                <Link to="/account">
                   <img className="w-15 hover:w-17"  src={account}/> Account
                </Link>
            </nav>


        </div>
    );
}



