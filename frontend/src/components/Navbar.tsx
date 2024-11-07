import { useNavigate } from "react-router-dom"

export function Navbar() {

    const navigate = useNavigate()

    return (
        <div className="flex justify-between px-6 py-4 shadow-lg">
            <h1 className="text-blue-500 text-3xl font-bold cursor-pointer"
            onClick={ () => navigate("/")}>WordCounter.io</h1>

            <div className="flex gap-2">
                <button className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out "
                onClick={ () => navigate("/signin")}>Login</button>
                <button className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out "
                onClick={() => navigate("signup")}>Signup</button>
                <button className="border bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out "
                onClick={() => navigate("profile")}>Profile</button>
            </div>
        </div>
    )
}
