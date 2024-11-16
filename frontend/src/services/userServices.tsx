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
