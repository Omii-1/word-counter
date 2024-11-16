import { MdLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import ConfirmDelete from "./ConfirmDelete";
import { getAllUsers, getAllUserData, formatDate, deleteUser } from "../services/userServices"

export function AllUsers() {
    const [users, setUsers] = useState<getAllUserData[]>([])

    const fetchData = async () => {
        try {
            const data = await getAllUsers();
            if (data) {
                setUsers(data);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching all users: ", error);
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate()
    const onclickHandle = (userId: number) => {
        navigate(`/profile/${userId}`)
    }

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

    const handleDeleteAccount = async (userId: number) => {
        try {
            if (!userId) {
                toast.error("userId not Present")
                return
            }

            await deleteUser(userId);

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            toast.success("User deleted successfully");
            setShowConfirmDelete(false);

        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="h-[80vh]">

            <h1 className="text-blue-500 text-5xl font-bold">All Users</h1>

            <div className="py-4 flex flex-col gap-5 justify-center items-center">

                {
                    users && users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className="border flex shadow-lg px-2 py-3 rounded bg-gray-100 w-full justify-between">
                                <div className="flex gap-4 text-center w-3/4 justify-around">
                                    <div>
                                        <label htmlFor="" className="text-blue-500">Date</label>
                                        <p>{formatDate(user.updatedAt)}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-blue-500">Email</label>
                                        <p>{user.email}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-blue-500">Texts</label>
                                        <p>{(user.texts).length}</p>
                                    </div>
                                </div>
                                <div className="flex w-1/4 justify-between ">
                                    <button
                                        onClick={() => onclickHandle(user.id)}
                                        className="border rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white px-2 transition-all duration-300 "><MdLogout size={25} />
                                    </button>
                                    <Link
                                        to= {`/profile/${user.id}/change-password`}
                                        className="border rounded  border-black hover:bg-black hover:text-white px-2 transition-all duration-300 flex items-center"><RiLockPasswordLine size={25} />
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setUserIdToDelete(user.id);
                                            setShowConfirmDelete(true);
                                        }}
                                        className="border rounded text-red-500 border-red-500 hover:bg-red-500 hover:text-white px-2 transition-all duration-300 "><MdDeleteOutline size={25} />
                                    </button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-4xl flex justify-center items-center h-[80vh]">No saved data available.</p>
                    )
                }
            </div>
            {
                showConfirmDelete && (
                    <ConfirmDelete onConfirm={() => userIdToDelete && handleDeleteAccount(userIdToDelete)}  onCancel={() => setShowConfirmDelete(false)} />
                )
            }
        </div>
    )
}
