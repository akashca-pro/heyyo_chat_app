import React from 'react'
import {Toaster} from 'sonner'
import {Routes , Route} from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'
import SignupPage from '@/pages/SignupPage'
import LoginPage from '@/pages/LoginPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ChatHomePage from './components/Home/ChatHomePage'

const App = () => {
  return (
      <>  
        <ScrollToTop/>
       <Toaster richColors position='top-right' duration={2000} />
       <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<ChatHomePage />} />
      </Routes>
      </> 
 )
}

export default App
