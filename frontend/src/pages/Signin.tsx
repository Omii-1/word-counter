import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import { authActions } from "../store/auth";

interface LoginData {
  email: string;
  password: string;
}

interface SigninResponse {
  message: string;
  msg: string;
  role: string;
  id: string;
  token: string;
}

export function Signin() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [loginData, setLoginData] = useState <LoginData>({
    email: "",
    password: ""
  })

  const change = async (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setLoginData( {...loginData, [name]: value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if ( loginData.email === "" || loginData.password === ""){
        toast.error("Fill all values")
      } else {
        const res = await axios.post<SigninResponse>(`${import.meta.env.VITE_USER_BACKEND_URL}/signin`, loginData)

        toast.success(res.data.message)

        dispatch(authActions.login())
        dispatch(authActions.changeRole(res.data.role))

        localStorage.setItem("id", res.data.id)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("role", res.data.role)

        navigate("/")
      }
    } catch (err: any) {
      if(err.response && err.response.data) {
        if(Array.isArray(err.response.data.message) && err.response.data.message.length > 0) {
          const firstError = err.response.data.message[0]?.message
          toast.error(firstError || "Validation failed with an error.")
        } else if (err.response.data.msg) {
          toast.error(err.response.data.msg)
        } else {
          toast.error("An unexpected error occured. Please try again.")
        }
      } else {
        toast.error("An unexpected error occured. Please try again.")
      }
    }
  }

  return (
    <form className="w-full max-w-sm p-6 border rounded-lg shadow-md bg-gray-100" onSubmit={ handleSubmit }>
      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="email" className="text-blue-500 text-2xl font-medium">Email</label>
        <input type="text" id="email" className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        name="email"
        value={loginData.email}
        onChange={ change }/>
      </div>

      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="password" className="text-blue-500 text-2xl font-medium">Password</label>
        <input type="password" id="password" className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={loginData.password}
        name="password"
        onChange={ change }/>
      </div>

      <p
        className="text-blue-500 cursor-pointer mb-4"
        onClick={() => navigate("/signup")}
      >
        New User?
      </p>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out w-full text-2xl"
      type="submit">
        Login
      </button>
      
    </form>
  );
}
