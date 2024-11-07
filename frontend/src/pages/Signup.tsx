import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Signup() {
  const navigate = useNavigate();
  const [ signupData, setSignupData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(signupData)
  }

  return (
    <form className="w-full max-w-sm p-6 border rounded-lg shadow-md bg-gray-100" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="username" className="text-blue-500 text-2xl font-medium">Username</label>
        <input type="text" id="username" className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={signupData.username}
        onChange={ (e) => setSignupData({...signupData, username: e.target.value})}/>
      </div>

      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="email" className="text-blue-500 text-2xl font-medium">Email</label>
        <input type="text" id="email" className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={signupData.email}
        onChange={ (e) => setSignupData({...signupData, email: e.target.value})}/>
      </div>

      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="password" className="text-blue-500 text-2xl font-medium">Password</label>
        <input type="password" id="password" className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={signupData.password}
        onChange={ (e) => setSignupData({...signupData, password: e.target.value})}/>
      </div>

      <div className="flex flex-col mb-4 gap-2">
        <label htmlFor="confirmPassword" className="text-blue-500 text-2xl font-medium">Confirm Password</label>
        <input type="password" id="confirmPassword" className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={signupData.confirmPassword}
        onChange={ (e) => setSignupData({...signupData, confirmPassword: e.target.value})}/>
      </div>

      <p
        className="text-blue-500 cursor-pointer mb-4"
        onClick={() => navigate("/signin")}
      >
        Existing User?
      </p>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out w-full text-2xl" type="submit">
        Signup
      </button>
      
    </form>
  );
}
