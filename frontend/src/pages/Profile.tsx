import { Sidebar } from "../components/Sidebar"
import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import axios from "axios"

export function Profile() {

    const backendUrl = import.meta.env.VITE_USER_BACKEND_URL
    const [profile, setProfile] = useState([])

    const { userId } = useParams()

    const fetchProfile = async () => {
        const info = await axios.get(`${backendUrl}/get-user`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => res.data.data)
        setProfile(info)
        console.log(profile);

    }

    useEffect(() => {
        fetchProfile()
    }, [userId])

    return (
        <div className="flex w-full min-h-[80vh] items-center">
            <div className="w-1/4" >
                <Sidebar data={profile} userId={userId} />
            </div>
            <div className="w-3/4 p-4">
                <Outlet/>
            </div>
        </div>
    )
}
