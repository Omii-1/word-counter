import { MdDeleteOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { deleteText } from "../services/textService";

interface DataItem {
    id: number;
    userId: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface SavedProps {
    data: DataItem[]; 
    onDataUpdate: () => void;
}

export function Saved({data, onDataUpdate}: SavedProps) {

    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)


    const handleDelete = async (id: number) => {
        if (isDeleting) return; // Prevent multiple clicks

        try {
            setIsDeleting(true)
            await deleteText({id})
            onDataUpdate() // Refresh the data after successful deletion
        } catch (error) {
            console.error("Error deleting text:", error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="border-l border-blue-500 w-[75%] min-h-[590px] p-4">

            <h1 className="text-blue-500 text-4xl font-bold">Saved Data</h1>

            <div className="py-4 w-full flex flex-col gap-5 justify-center items-center">

                {
                    data && data.length > 0 ? (
                        data.map((item) => (
                            <div key={item.id} className="border flex shadow-lg px-2 py-3 pcursor-pointer rounded bg-gray-100 w-full gap-2">
                                <div className="flex gap-4 text-center w-4/5 justify-between">
                                    <div>
                                        <label htmlFor="" className="text-blue-500">Date</label>
                                        <p>{item.updatedAt}</p>
                                    </div>
                                    {/* <div>
                                        <label htmlFor="" className="text-blue-500">Username</label>
                                        <p>{item.userName}</p>
                                    </div> */}
                                    <div>
                                        <label htmlFor="" className="text-blue-500">Title</label>
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-1/5 justify-end">
                                    <button 
                                    className="border rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white px-1 transition-all duration-300"><MdLogout size={25} />
                                    </button>
                                    <button 
                                    onClick={ () => handleDelete(item.id)}className="border rounded text-red-500 border-red-500 hover:bg-red-500 hover:text-white px-1 transition-all duration-300"><MdDeleteOutline size={25} />
                                    </button>
                                </div>
    
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No saved data available.</p>
                    )
                }
            </div>
        </div>
    )
}
