import axios from 'axios';
import toast from 'react-hot-toast';

const backendTextURL : string = import.meta.env.VITE_TEXT_BACKEND_URL

interface SaveTextParams {
    title: string;
    description: string;
}
interface saveTextResponse {
    textId: number
}
export const saveText = async ({ title, description }: SaveTextParams): Promise<saveTextResponse | null> => {
    try {
        if (!title.trim()) {
            toast.error("Please enter a title.");
            return null;
        }

        const response = await axios.post(`${import.meta.env.VITE_TEXT_BACKEND_URL}/create`, {
            title,
            description,
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        if (response.data.status === "success") {
            toast.success(response.data.message);
            return { textId: response.data.textId}
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
};

interface deleteTextParams {
    id: number
}
export const deleteText = async({id}: deleteTextParams): Promise<void> => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_TEXT_BACKEND_URL}/delete/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        if (response.data.status === "success") {
            toast.success(response.data.message);
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

interface getTextParams {
    id: number
}
interface TextResponse {
    title: string;
    description: string;
}
export const getText = async({id}: getTextParams) : Promise<TextResponse | null> => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_TEXT_BACKEND_URL}/get/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        
        if (response.data.status === "success") {
            return {
                title: response.data.text.title,
                description: response.data.text.description
            };
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

interface UpdateTextParams {
    id: number
    title: string;
    description: string;
}
export const UpdateText = async ({ id, title, description }: UpdateTextParams): Promise<void> => {
    try {
        if (!title.trim()) {
            toast.error("Please enter a title.");
            return;
        }

        const response = await axios.patch(`${import.meta.env.VITE_TEXT_BACKEND_URL}/update/${id}`, {
            newTitle: title,
            newDescription: description,
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        if (response.data.status === "success") {
            toast.success(response.data.message)
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
};

// get all text of user
export interface GetAllTextItem {
    id: number;
    userId: number;
    title: string;
    description: string;
    createdAt: string; // Use Date if you parse these strings to Date objects
    updatedAt: string; // Same as above
}
interface GetAllTextParams {
    texts: GetAllTextItem[];
}
export const getAllText = async(userId: string): Promise< GetAllTextParams | null > => {
    try{
        const res = await axios.get(`${backendTextURL}/user-texts/${userId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });

        if (res.data.status === "success") {
            return { texts: res.data.texts };
        }
        return null;
    } catch (err:any) {
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