import type { RootState } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const authState = useSelector((state: RootState) => {
        return state.auth;
    });
    const { isAuthenticated, loading } = authState;

    console.log("ProtectedRoute: isAuthenticated", isAuthenticated, "loading", loading);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" />;
    }
    return children;
};

export default ProtectedRoute;