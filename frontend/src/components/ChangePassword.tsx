import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"

import { changePassword } from "../services/userServices"

export function ChangePassword() {

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const { userId } = useParams()

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setPassword({...password, [name]: value})
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(!userId){
            toast.error("User ID is missing")
            return
        }
        if(password.oldPassword === "" || password.newPassword === "" || password.confirmNewPassword === "") {
            toast.error("Fill all values")
        } else if (password.newPassword !== password.confirmNewPassword){
            toast.error("New password and confirm new password are not same")
        } else {
            await changePassword( { userId, oldPassword: password.oldPassword, newPassword:password.confirmNewPassword } )

            setPassword({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            })
        }
        
    }

    return (
        <div className='h-[80vh] flex flex-col items-center justify-center'>
            <h1 className="text-blue-500 text-5xl font-bold mb-6">Change Password</h1>

            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md w-96 space-y-4" >
                <div className="flex flex-col">
                    <label htmlFor="old-password" className="text-lg text-gray-700 mb-2">Old Password</label>
                    <input
                        id="old-password"
                        type="password"
                        name="oldPassword"
                        onChange={ handleOnchange}
                        value={password.oldPassword}
                        className="border border-gray-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="new-password" className="text-lg text-gray-700 mb-2">New Password</label>
                    <input
                        id="new-password"
                        type="password"
                        name="newPassword"
                        onChange={ handleOnchange}
                        value={password.newPassword}
                        className="border border-gray-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="confirm-password" className="text-lg text-gray-700 mb-2">Confirm New Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirmNewPassword"
                        onChange={ handleOnchange}
                        value={password.confirmNewPassword}
                        className="border border-gray-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Change Password
                </button>
            </form>
        </div>
    )
}
