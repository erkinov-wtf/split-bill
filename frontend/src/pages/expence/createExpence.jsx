
import avatar from "../../assets/Avatar.png";
import { ArrowLeft } from "lucide-react"

function expence(){
        console.log("create expence");
}

export default function CreateExpense() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 ">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                    <button className="rounded-full w-[30px] h-[30px]  shadow-indigo-950 shadow-2xl items-center">
                        <ArrowLeft />
                    </button>
                    <h6 className="text-xl font-bold flex-grow text-center">Create New Expense</h6>
                </div>

                <div className="mt-6">
                    <label className="block text-gray-700 font-medium">Expense Name</label>
                    <input type="text" placeholder="Qovun" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 font-medium">Expense Price</label>
                    <input type="number" placeholder="45.2" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Assign Friends</h2>
                    <div className="mt-3 space-y-3">
                        {["Hieu Le Quang", "Julia Peters", "Dora Obrien", "Callie Nunez"].map((friend, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                                <input type="checkbox" className="w-5 h-5 text-blue-600" />
                                <img src={avatar} alt={friend} className="w-12 h-12 rounded-full border" />
                                <h2 className="text-md font-medium text-gray-800">{friend}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={expence} className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold shadow-md">
                    Create Expense
                </button>
            </div>
        </div>
    );
}
