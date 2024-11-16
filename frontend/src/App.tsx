import {Routes, Route, useLocation} from "react-router-dom"
import { useEffect } from "react"
import { Toaster } from 'react-hot-toast';

import './App.css'
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "./store/auth"
import { Navbar } from "./components/Navbar"
import {Home} from "./pages/Home"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Profile} from "./pages/Profile"
import { Saved } from "./components/Saved";
import { ChangePassword } from "./components/ChangePassword"
import { AllUsers } from "./components/AllUsers";

function App(): JSX.Element {

  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role) 

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")){
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  }, []) 

  const location = useLocation()
  const needsCenter = ['/signin', '/signup'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      
      <div className={`flex-grow p-4 ${needsCenter ? 'flex items-center justify-center' : ''}`}>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/:textId" element={ <Home />} />
          <Route path="/signup" element={ <Signup />} />
          <Route path="/signin" element={ <Signin />} />
          <Route path="/profile/:userId" element={ <Profile />}>
            {
              role === "user" ? <>
                <Route index element={<Saved />} />
                <Route path="change-password" element={<ChangePassword />} />
              </> : <>
                <Route index element={<Saved />} />
                <Route path="all-users" element={<AllUsers />} />
                <Route path="change-password" element={<ChangePassword />} />
              </>
            }
          </Route>
        </Routes>
        <Toaster />
      </div>
    </div>
  )
}

export default App
