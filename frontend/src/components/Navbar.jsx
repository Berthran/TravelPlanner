import React from 'react';
import '../styles/navbar.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem('token'); // Check if the user is authenticated

    return (
        <div className='navContainer'>
            <Link to="/">
                <p className='navLogo'>Travel Planner</p>
            </Link>

            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar">
                <FontAwesomeIcon icon={faBars} className="icon" />
            </label>
            <nav className='navbar'>
                <ul>
                    <Link to="/">
                        <li><p>Home</p></li>
                    </Link>
                    {token && ( // Only show these links if the user is authenticated
                        <>
                            <Link to="/dashboard">
                                <li><p>Dashboard</p></li>
                            </Link>
                            <Link to="/planTrip">
                                <li><p>Plan Trip</p></li>
                            </Link>
                        </>
                    )}
                    {!token ? ( // Show Login and Register links if not authenticated
                        <>
                            <Link to="/login">
                                <li><p>Login</p></li>
                            </Link>
                            <Link to="/register">
                                <li><p>Register</p></li>
                            </Link>
                        </>
                    ) : (
                        <Link to="/logout"> {/* Optional: Add a Logout link */}
                            <li><p>Logout</p></li>
                        </Link>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
