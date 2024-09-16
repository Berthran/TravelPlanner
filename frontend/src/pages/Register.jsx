import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/Navbar';
import '../styles/register.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setError(''); // Clear previous errors
        setLoading(true); // Show loading indicator
    
        try {
            await axios.post('http://localhost:5000/api/v1/signup', {
                email,
                username,
                password
            });
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Registration error:', error); // Log the full error object
            setError(error.response?.data?.message || 'Error registering. Please try again later.');
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };
    

    return (
        <div className='registerPage'>
            <Navbar />
            <div className="grid">
                <h2 className='title'>Welcome On Board!</h2>
                <form onSubmit={handleRegister} className="form login">
                    {error && <div className="error">{error}</div>}
                    <div className="form__field">
                        <label htmlFor="register__email">
                            <svg className="icon">
                                <use href="#icon-user"></use>
                            </svg>
                            <span className="hidden">Email</span>
                        </label>
                        <input
                            id="register__email"
                            type="text"
                            name="Email"
                            className="form__input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="register__username">
                            <svg className="icon">
                                <use href="#icon-user"></use>
                            </svg>
                            <span className="hidden">Username</span>
                        </label>
                        <input
                            id="register__username"
                            type="text"
                            name="username"
                            className="form__input"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="register__password">
                            <svg className="icon">
                                <use href="#icon-lock"></use>
                            </svg>
                            <span className="hidden">Password</span>
                        </label>
                        <input
                            id="register__password"
                            type="password"
                            name="password"
                            className="form__input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form__field">
                        <input type="submit" value="Register" disabled={loading} />
                        {loading && <span className="loading">Registering...</span>}
                    </div>
                </form>
                <p className="text--center">
                    Already a member? <a href="/login">Sign In</a>
                    <svg className="icon">
                        <use href="#icon-arrow-right"></use>
                    </svg>
                </p>
            </div>
            {/* SVG symbols here */}
        </div>
    );
};

export default Register;