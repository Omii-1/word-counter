import { toast } from "react-hot-toast";
import axios from "axios";

const userBackendURL: string = import.meta.env.VITE_USER_BACKEND_URL

// change password
interface changePasswordParams {
    userId: string;
    oldPassword: string;
    newPassword: string;
}
export const changePassword = async ({userId, oldPassword, newPassword} : changePasswordParams) : Promise<void> => {
    try {
        const res = await axios.patch(`${userBackendURL}/update-password/${userId}`,{
            oldPassword, newPassword
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        if(res.status === 200 && res.data.status === "success"){
            toast.success(res.data.message)
        }
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            if (Array.isArray(err.response.data.message)) {
                err.response.data.message.forEach((error: any) => {
                    toast.error(error.message); 
                });
            } else {
                toast.error(err.response.data.message);
            }
        }
    }
}

// delete account 
export const deleteUser = async( userId : string) : Promise<void> => {
    try {
        const res = await axios.delete(`${userBackendURL}/delete-user/${userId}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        if(res.status === 200 && res.data.status === "success"){
            toast.success(res.data.message)
        }
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            if (Array.isArray(err.response.data.message)) {
                err.response.data.message.forEach((error: any) => {
                    toast.error(error.message); 
                });
            } else {
                toast.error(err.response.data.message);
            }
        }
    }
}

// admin - get all users
interface TextItem {
    id: number;
    userId: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}
export interface getAllUserParams {
    id: number;
    userName: string;
    email: string;
    password: string;
    texts: number[];
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
    textsList: TextItem[];
}
export interface getAllUserData {
    data: getAllUserParams[];
}
export const getAllUsers = async(): Promise<getAllUserData | null> => {
    try {
        const res = await axios.get(`${userBackendURL}/all-users-with-texts`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        if(res.data.status === "success"){
            return res.data.data
        }
        return null
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            if (Array.isArray(err.response.data.message)) {
                err.response.data.message.forEach((error: any) => {
                    toast.error(error.message); 
                });
            } else {
                toast.error(err.response.data.message);
            }
        }
        return null
    }
}

export function formatDate(dateString: string): string {
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