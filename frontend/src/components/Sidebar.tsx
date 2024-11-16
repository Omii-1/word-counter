import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { authActions } from "../store/auth";
import { deleteUser } from "../services/userServices";
import ConfirmDelete from "./ConfirmDelete";
import toast from "react-hot-toast";

export function Sidebar({ data, userId }) {

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

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const handleDeleteAccount = async () => {
        try {
            if(!userId){
                toast.error("userId not Present")
                return
            }
            
            await deleteUser(userId);
            handleLogout();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <>
            <div className=" p-4 bg-gray-100">
                <div className="flex flex-col justify-center items-center">
                    <span>
                        <FaUserCircle size={75} color="rgb(59 130 246)" />
                    </span>
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-black font-semibold text-lg">
                            {data.userName}
                        </h2>
                    </div>
                </div>
                {
                    role === "user" ? ( 
                        <div className="flex flex-col justify-center items-center gap-3 mt-4">
                    <Link
                        to="/profile"
                        className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                    >
                        Saved Data
                    </Link>
                    <Link
                        to= {`/profile/${userId}/change-password`}
                        className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                    >
                        Change Password
                    </Link>
                    <button
                        onClick={() => setShowConfirmDelete(true)}
                        className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                    >
                        Delete Account
                    </button>
                    <button
                        className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                        onClick={handleLogout}
                    >
                        Logout <MdLogout size={25} />
                    </button>
                </div>
                    ) : (
                    <div className="flex flex-col justify-center items-center gap-3 mt-4">
                        <Link
                            to={`/profile/${userId}`}
                            className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                        >
                            Saved Data
                        </Link>
                        <Link
                            to={`/profile/${userId}/all-users`}
                            className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                        >
                            All Users
                        </Link>
                        <Link
                            to= {`/profile/${userId}/change-password`}
                            className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                        >
                            Change Password
                        </Link>
                        <button
                            onClick={() => setShowConfirmDelete(true)}
                            className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                        >
                            Delete Account
                        </button>
                        <button
                            className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out flex gap-2 w-full text-center items-center justify-center"
                            onClick={handleLogout}
                        >
                            Logout <MdLogout size={25} />
                        </button>
                    </div>
                    )
                }
            </div>
            {
                showConfirmDelete && (
                    <ConfirmDelete onConfirm={handleDeleteAccount} onCancel={() => setShowConfirmDelete(false)} />
                )
            }
        </>
    )
}
