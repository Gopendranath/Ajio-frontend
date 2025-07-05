import type { RootState } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { isAuthenticated } from '@/store/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuth = useSelector((state: RootState) => isAuthenticated(state));
    console.log(isAuth);
    if (!isAuth) {
        return <Navigate to="/sign-up" />;
    }
    return children;
};

export default ProtectedRoute;