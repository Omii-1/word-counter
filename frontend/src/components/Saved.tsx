import { MdDeleteOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteText, GetAllTextItem, getAllText } from "../services/textService";

export function Saved() {

    const [isDeleting, setIsDeleting] = useState(false)
    const [texts, setTexts] = useState<GetAllTextItem[]>([])
    const navigate = useNavigate()

    const handleDelete = async (id: number) => {
        if (isDeleting) return; // Prevent multiple clicks

        try {
            setIsDeleting(true)
            await deleteText({ id })
            onDataUpdate() // Refresh the data after successful deletion
        } catch (error) {
            console.error("Error deleting text:", error)
        } finally {
            setIsDeleting(false)
        }
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);

        // Extract hours and minutes, ensuring two-digit format
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');

        // Extract day, month and year
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();

        // Month names array for conversion to string
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getUTCMonth()];

        return `${hours}:${minutes} ${day} ${month} ${year}`;
    }

    const handleGetText = (id: number) => {
        // Navigate to the home page with the text ID as a parameter
        navigate(`/${id}`);
    };

    const {userId} = useParams()
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const data = await getAllText(userId);
                    if (data && data.texts) {
                        setTexts(data.texts);
                    } else {
                        setTexts([]);
                    }
                } catch (error) {
                    console.error("Error fetching texts by user ID:", error);
                    setTexts([]);
                }
            }
        };
        fetchData();
    }, [userId]);

    return (
        <div className="h-[80vh]">

            <h1 className="text-blue-500 text-5xl font-bold">Saved Data</h1>

            <div className="py-4 flex flex-col gap-5 justify-center items-center">

                {
                    texts && texts.length > 0 ? (
                        texts.map((item) => (
                            <div key={item.id} className="border flex shadow-lg px-2 py-3 rounded bg-gray-100 w-full justify-between">
                                <div className="flex gap-4 text-center w-3/4 justify-around">
                                    <div>
                                        <label htmlFor="" className="text-blue-500">Date</label>
                                        <p>{formatDate(item.updatedAt)}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-blue-500">Title</label>
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-1/4 justify-around ">
                                    <button
                                        onClick={() => handleGetText(item.id)}
                                        className="border rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white px-1 transition-all duration-300"><MdLogout size={25} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)} className="border rounded text-red-500 border-red-500 hover:bg-red-500 hover:text-white px-1 transition-all duration-300"><MdDeleteOutline size={25} />
                                    </button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-4xl flex justify-center items-center h-[80vh]">No saved data available.</p>
                    )
                }
            </div>
        </div>
    )
}
