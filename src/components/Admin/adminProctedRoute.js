import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/admin/auth', {
                    method: 'GET',
                    credentials: 'include', // Ensure cookies are sent
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    navigate('/admin/login');
                }
            } catch (error) {
                navigate('/admin/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return isAuthenticated ? <>{children}</> : null;
};

export default AdminProtectedRoute;
