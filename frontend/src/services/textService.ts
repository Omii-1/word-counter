import axios from 'axios';
import toast from 'react-hot-toast';

interface SaveTextParams {
    title: string;
    description: string;
}

export const saveText = async ({ title, description }: SaveTextParams): Promise<void> => {
    try {
        if (!title.trim()) {
            toast.error("Please enter a title.");
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_TEXT_BACKEND_URL}/create`, {
            title,
            description,
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        if (response.status === 201 && response.data && !response.data.error) {
            toast.success("Text created successfully.");
        } else {
            throw new Error("Unexpected response format.");
        }
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            // Check if the message is an array
            if (Array.isArray(err.response.data.message)) {
                err.response.data.message.forEach((error: any) => {
                    toast.error(error.message); // Display each validation error message
                });
            } else {
                // Handle single error messages
                toast.error(err.response.data.message);
            }
        } else {
            // Handle unexpected errors
            toast.error("An error occurred. Please try again.");
        }
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

        if (response.status === 200 && response.data && !response.data.error) {
            toast.success("Text deleted successfully.");
        } 
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
            // Check if the message is an array
            if (Array.isArray(err.response.data.message)) {
                err.response.data.message.forEach((error: any) => {
                    toast.error(error.message); // Display each validation error message
                });
            } else {
                // Handle single error messages
                toast.error(err.response.data.message);
            }
        } else {
            // Handle unexpected errors
            toast.error("An error occurred. Please try again.");
        }
    }
}
