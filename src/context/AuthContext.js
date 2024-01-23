import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import api from '../api/api-calls';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);

        fetchUserData(decoded.sub, JWT, '/');
    }

    function logout() {
        localStorage.clear();
        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
        });

        console.log('User logged out!');
        navigate('/');
    }

    async function fetchUserData(userId, token, redirectUrl) {
        try {
            const result = await api.get(`/api/v1/auth/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setAuthState({
                ...authState,
                isAuth: true,
                user: {
                    id: result.data?.id,
                    username: result.data?.username,
                    email: result.data?.email,
                    roles: result.data?.roles?.[0]?.name,
                },
                status: 'done',
            });
        } catch (e) {
            console.error(e);
            setAuthState({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        isAuth: authState.isAuth,
        user: authState.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {authState.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
