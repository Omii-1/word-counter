import { Sidebar } from "../components/Sidebar"
import { Saved } from "../components/Saved"
import { useEffect, useState } from "react"
import axios from "axios"

export function Profile() {

    const backendUrl = import.meta.env.VITE_USER_BACKEND_URL
    const [profile, setProfile] = useState([])

    const fetchProfile = async () => {
        const info = await axios.get(`${backendUrl}/get-user`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then( res => res.data.data)
        setProfile(info)
        console.log(profile);
        
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    // Handler to refresh data after deletion
    const handleDataUpdate = () => {
        fetchProfile()
    }

    return (
        <div className="flex w-full h-full">
            <Sidebar data={profile} />
            <Saved data = {profile.textsList} onDataUpdate={handleDataUpdate} />
        </div>
    )
}
