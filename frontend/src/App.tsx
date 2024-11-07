import {Routes, Route, useLocation} from "react-router-dom"
import './App.css'

import { Navbar } from "./components/Navbar"
import {Home} from "./pages/Home"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Profile} from "./pages/Profile"

function App(): JSX.Element {
  const location = useLocation()
  const needsCenter = ['/signin', '/signup'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      
      <div className={`flex-grow p-4 ${needsCenter ? 'flex items-center justify-center' : ''}`}>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/signup" element={ <Signup />} />
          <Route path="/signin" element={ <Signin />} />
          <Route path="/profile" element={ <Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
