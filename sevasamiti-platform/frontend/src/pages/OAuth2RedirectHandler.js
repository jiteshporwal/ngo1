import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('accessToken', token);
            navigate('/home'); 
        } else {
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;