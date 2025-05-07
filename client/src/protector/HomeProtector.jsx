import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContextApi';

const HomeProtector = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useAuth()

    let loginPath = '/login'

    const isAuthenticated = user?.isAuthenticated

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(loginPath, { replace: true });
        }
    }, [isAuthenticated, navigate, loginPath]);

    if (!isAuthenticated) {
        return null; // Prevents rendering if not authenticated
    }

    return <>{children}</>;
};

export default HomeProtector;