import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api'; // Import the centralized API client
import Navbar from '../components/Navbar';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard'); // Redirect after successful login
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className='h-screen w-screen bg-light-pink flex items-center justify-center'>
            <Navbar />
            <div className='w-full max-w-md p-6'>
                <h2 className='text-2xl font-cursive text-black mb-12 text-center'>Welcome Back!</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex flex-col'>
                        <label htmlFor='login__username' className='bg-light-blue px-4 py-2 rounded-t-lg'>
                            Username
                        </label>
                        <input
                            id='login__username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'
                            required
                            className='bg-white border rounded-b-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='login__password' className='bg-light-blue px-4 py-2 rounded-t-lg'>
                            Password
                        </label>
                        <input
                            id='login__password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                            className='bg-white border rounded-b-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <input
                            type='submit'
                            value='Sign In'
                            className='bg-blue-500 text-white py-2 px-4 rounded-lg font-bold uppercase cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
