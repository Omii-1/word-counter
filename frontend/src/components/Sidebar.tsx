import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../store/auth";

export function Sidebar({ data }) {

    const role = useSelector((state) => state.auth.role)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(authActions.logout())
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/")
    }
    
    return (
        <div className=" w-[25%] h-full flex flex-col items-center gap-2 p-4">
            <div >
                <FaUserCircle size={75} color="rgb(59 130 246)" />
            </div>
            <div>
                <h2 className="text-blue-500">Username: <span className="text-black">{data.userName}</span> </h2>
                <h3 className="text-blue-500">Email: <span className="text-black">{data.email}</span></h3>
            </div>
            <button className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2" onClick={handleLogout}>Logout <MdLogout size={25} /></button>
        </div>
    )
}
