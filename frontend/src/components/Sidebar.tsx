import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export function Sidebar() {
    return (
        <div className=" w-[25%] h-full flex flex-col items-center gap-2 p-4">
            <div >
                <FaUserCircle size={75} color="rgb(59 130 246)"/>
            </div>
            <div>
                <h2 className="text-blue-500">Username: <span className="text-black">OmJuvatkar</span> </h2>
                <h3 className="text-blue-500">Email: <span className="text-black">omjuvatkar123@gmail.com</span></h3>
            </div>
            <button className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2">Logout <MdLogout size={25}/></button>
        </div>
    )
}
