import back from "../../assets/L.Icon.png";
import avatar from "../../assets/Avatar.png";
import {useState} from "react";

export default function CreateExpense() {
    const [bgColor, setBgColor] = useState("#D97706");
    return (

            <div className=" bg-gray-100 p-6 rounded-xl shadow-md w-[500px] mx-auto ">
                <div className="flex items-center  justify-start ">
                    <button className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 shadow-md hover:bg-gray-200">
                        <img src={back} alt="Back" className="w-full h-full object-cover" />
                    </button>
                    <h2 className="text-[20px] font-bold font-sans flex-grow pl-0.5 mr-4 text-black">Create New Expense</h2>
                </div>

                <div className="mt-6">
                    <label className="block  font-medium text-gray-500 items-start">Expense Name</label>
                    <input type="text" placeholder="Qovun" className="w-full mt-1 p-2 rounded-lg focus:ring-2  bg-white" />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-500 font-medium">Expense Price</label>
                    <input type="number" placeholder="45.2" className="w-full mt-1 p-2  rounded-lg focus:ring-2 bg-white" />
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-500">Assign Friends</h2>
                    <div className="mt-3 space-y-3">
                        {["Hieu Le Quang", "Julia Peters", "Dora Obrien", "Callie Nunez"].map((friend, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-md">
                                <input type="checkbox" className="w-5 h-5 text-blue-600 bg-white" />
                                <img src={avatar} alt={friend} className="w-12 h-12 rounded-full border" />
                                <h2 className="text-md font-medium text-gray-800">{friend}</h2>
                            </div>
                        ))}
                    </div>
                </div>


                <button style={{marginTop: "10px", width: "100%", borderRadius: "20px", backgroundColor: bgColor, color: "white", padding: "10px", }}
                        onMouseEnter={() => setBgColor("#e29700")}
                        onMouseLeave={() => setBgColor("#D97706")}>
                    <h2 className="text-2xl font-semibold ">Create Expense</h2>
                </button>


</div>

    );
}
