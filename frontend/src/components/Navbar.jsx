import '../styles/navbar.scss'
import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"



const Navbar = () => {

    return (
        <div className='navContainer'>
            <Link to="/">
                <p className='navLogo'>TravelPlanner</p>
            </Link>

            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar">
                <FontAwesomeIcon icon={faBars}
                    className="icon" />
            </label>
            <nav className='navbar'>
                <ul>
                    <Link to="/">
                        <li><p>Home</p></li>
                    </Link>
                    <Link to="/dashboard">
                        <li><p>Dashboard</p></li>
                    </Link>
                    <Link to="/planTrip">
                        <li><p>Plan Trip</p></li>
                    </Link>
                    <Link to="/login">
                        <li><p>Login</p></li>
                    </Link>
                    <Link to="/register">
                        <li><p>Register</p></li>
                    </Link>
                </ul>
            </nav>
        </div >
    )
}

export default Navbar
