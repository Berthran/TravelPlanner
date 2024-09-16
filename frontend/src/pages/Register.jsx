import React, { useState } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setError(''); // Clear previous errors
        setLoading(true); // Show loading indicator

        try {
            await axios.post('http://localhost:5000/api/v1/register', {
                name,
                username,
                phone,
                password
            });
            navigate('/login'); // Redirect to login page
        } catch (error) {
            setError('Error registering: ' + error.response?.data?.message || 'Please try again later.');
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div className='grid place-items-center bg-light-pink h-screen w-screen'>
            <Navbar />
            <div className="max-w-md mx-auto w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className='text-2xl font-cursive text-black mb-12 text-center'>
                    Join our Community!
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    {error && <div className="text-red-600 mb-4">{error}</div>}
                    <div className="flex flex-col">
                        <label htmlFor="register__name" className="flex items-center space-x-2 bg-light-blue text-white p-3 rounded-t-md">
                            <svg className="w-4 h-4 fill-bright-blue">
                                <use href="#icon-user"></use>
                            </svg>
                            <span className="sr-only">Name</span>
                        </label>
                        <input
                            id="register__name"
                            type="text"
                            name="name"
                            className="border border-gray-300 p-3 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="register__username" className="flex items-center space-x-2 bg-light-blue text-white p-3 rounded-t-md">
                            <svg className="w-4 h-4 fill-bright-blue">
                                <use href="#icon-user"></use>
                            </svg>
                            <span className="sr-only">Username</span>
                        </label>
                        <input
                            id="register__username"
                            type="text"
                            name="username"
                            className="border border-gray-300 p-3 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="register__phone" className="flex items-center space-x-2 bg-light-blue text-white p-3 rounded-t-md">
                            <FontAwesomeIcon icon={faPhone} className="w-4 h-4 fill-bright-blue" />
                            <span className="sr-only">Phone Number</span>
                        </label>
                        <input
                            id="register__phone"
                            type="text"
                            name="phone"
                            className="border border-gray-300 p-3 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="register__password" className="flex items-center space-x-2 bg-light-blue text-white p-3 rounded-t-md">
                            <svg className="w-4 h-4 fill-bright-blue">
                                <use href="#icon-lock"></use>
                            </svg>
                            <span className="sr-only">Password</span>
                        </label>
                        <input
                            id="register__password"
                            type="password"
                            name="password"
                            className="border border-gray-300 p-3 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <button
                            type="submit"
                            className={`w-full py-3 text-white font-bold text-lg uppercase rounded-md ${loading ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
                <p className="text-center mt-6">
                    Already a member? <a href="/login" className="text-blue-600 hover:text-blue-800">Sign In</a>
                    <svg className="inline w-4 h-4 fill-blue-600 ml-2">
                        <use href="#icon-arrow-right"></use>
                    </svg>
                </p>
            </div>
            {/* SVG symbols here */}
        </div>
    );
};

export default Register;
