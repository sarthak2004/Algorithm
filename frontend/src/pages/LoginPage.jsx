import React, { useEffect, useContext } from 'react'
import { UserContext } from "../auth/UserProvider";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Login from '../components/Login'
import Profile from '../components/Profile';
import Loader from '../components/Loader';
import FloatingBackground from './FloatingBackground';

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  const { user, isLoading } = useContext(UserContext);
  
  if (isLoading) {
    return <Loader />
  }

  

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      
      <div className="flex-grow">
      <FloatingBackground />
        {!user ? <Login />: <Profile />}
      </div>

      <Footer />
    </div>
  )
}

export default LoginPage

