import React, { useEffect } from 'react'
import {Toaster} from 'sonner'
import {Routes , Route} from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'
import SignupPage from '@/pages/SignupPage'
import LoginPage from '@/pages/LoginPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ChatHomePage from './components/Home/ChatHomePage'
import AuthProtector from './protector/AuthProtector'
import HomeProtector from './protector/HomeProtector'
import ProfilePage from './components/profile/ProfilePage'

 const initialUser = {
    name: "Alex Johnson",
    status: "Working on something cool 🚀",
    avatar: "/male.jpg",
  }


const App = () => {


  return (
      <>  
        <ScrollToTop/>
       <Toaster richColors position='top-right' duration={2000} />
       <Routes>
        <Route path="/signup" element={
          <AuthProtector>
          <SignupPage />
          </AuthProtector>
          } />
        <Route path="/login" element={
          <AuthProtector>
          <LoginPage />
          </AuthProtector>
          } />
        <Route path="/forgot-password" element={
          <AuthProtector>
          <ForgotPasswordPage />
          </AuthProtector>
          } />
        <Route path="/" element={
          <HomeProtector>
          <ChatHomePage />
          </HomeProtector>
          } />

          <Route path='/profile' element={
            <HomeProtector>
              <ProfilePage initialUser={initialUser} />
            </HomeProtector>
          } />

      </Routes>
      </> 
 )
}

export default App
