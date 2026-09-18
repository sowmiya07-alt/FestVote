import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const handleError = (error) => {
        if (!error.response) {
            toast.error('Unable to connect to the server. Make sure the backend is running.');
        } else if (error.response.status === 401 || error.response.status === 400) {
            toast.error(error.response.data.message || 'Invalid email/College ID or password.');
        } else {
            toast.error('Something went wrong on the server. Please try again.');
        }
    };

    const login = async (identifier, password) => {
        try {
            const res = await api.post('/auth/login', { identifier, password });
            setUser(res.data.user);
            localStorage.setItem('userInfo', JSON.stringify({ ...res.data.user, token: res.data.token }));
            return res.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    };

    const registerStudent = async (userData) => {
        try {
            const res = await api.post('/auth/register', userData);
            toast.success(res.data.message || 'Account created successfully! Please sign in.');
            return res.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, login, registerStudent, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
