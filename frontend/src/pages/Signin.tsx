import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginData {
  email: string;
  password: string;
}

export function Signin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState <LoginData>({
    email: "",
    password: ""
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(loginData)
  }

  return (
    <form className="w-full max-w-sm p-6 border rounded-lg shadow-md bg-gray-100" onSubmit={ handleSubmit }>
      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="email" className="text-blue-500 text-2xl font-medium">Email</label>
        <input type="text" id="email" className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={loginData.email}
        onChange={ (e) => setLoginData({...loginData, email: e.target.value})}/>
      </div>

      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="password" className="text-blue-500 text-2xl font-medium">Password</label>
        <input type="password" id="password" className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={loginData.password}
        onChange={ (e) => setLoginData({...loginData, password: e.target.value})}/>
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
