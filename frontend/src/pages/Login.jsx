import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api';
import Navbar from '../components/Navbar';
import '../styles/login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/'); // Redirect after successful login
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className='loginPage'>
            <Navbar />
            <div className='grid'>
                <h2 className='title'>Welcome Back!</h2>
                <form onSubmit={handleSubmit} className='form login'>
                    <div className='form__field'>
                        <label htmlFor='login__email'>Email</label>
                        <input
                            id='login__email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className='form__field'>
                        <label htmlFor='login__password'>Password</label>
                        <input
                            id='login__password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <div className='form__field'>
                        <input type='submit' value='Sign In' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
