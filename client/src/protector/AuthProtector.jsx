import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContextApi';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthProtector = ({children}) =>{
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
  
    const isAuthenticated = user?.isAuthenticated;
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/',{replace : true});
       
      }
    }, [isAuthenticated, navigate, location]);
  
    if (isAuthenticated) {
      return null;
    }
  
    return <>{children}</>;
  };
  
  

export default AuthProtector
