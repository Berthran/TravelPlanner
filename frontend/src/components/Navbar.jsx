import React from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 shadow-lg p-4 flex items-center justify-between z-50">
            <Link to="/">
                <p className="text-white text-2xl font-extrabold italic tracking-wider">TravelPlanner</p>
            </Link>

            <input type="checkbox" id="menu-bar" className="hidden" />
            <label htmlFor="menu-bar" className="text-white text-2xl cursor-pointer lg:hidden">
                <FontAwesomeIcon icon={faBars} />
            </label>

            <nav className="lg:flex lg:items-center lg:space-x-6 hidden">
                <ul className="flex space-x-6">
                    <Link to="/">
                        <li><p className="text-white text-lg hover:border-b-2 hover:border-white transition-transform">Home</p></li>
                    </Link>
                    <Link to="/dashboard">
                        <li><p className="text-white text-lg hover:border-b-2 hover:border-white transition-transform">Dashboard</p></li>
                    </Link>
                    <Link to="/planTrip">
                        <li><p className="text-white text-lg hover:border-b-2 hover:border-white transition-transform">Plan Trip</p></li>
                    </Link>
                    <Link to="/login">
                        <li><p className="text-white text-lg hover:border-b-2 hover:border-white transition-transform">Login</p></li>
                    </Link>
                    <Link to="/register">
                        <li><p className="text-white text-lg hover:border-b-2 hover:border-white transition-transform">Register</p></li>
                    </Link>
                </ul>
            </nav>

            {/* Mobile menu */}
            <nav className="lg:hidden fixed top-16 left-0 w-full bg-white border-t border-gray-200 transition-transform transform -translate-x-full" id="mobile-menu">
                <ul className="flex flex-col items-center space-y-4 p-4">
                    <Link to="/">
                        <li><p className="text-black text-lg hover:border-b-2 hover:border-black transition-transform">Home</p></li>
                    </Link>
                    <Link to="/dashboard">
                        <li><p className="text-black text-lg hover:border-b-2 hover:border-black transition-transform">Dashboard</p></li>
                    </Link>
                    <Link to="/planTrip">
                        <li><p className="text-black text-lg hover:border-b-2 hover:border-black transition-transform">Plan Trip</p></li>
                    </Link>
                    <Link to="/login">
                        <li><p className="text-black text-lg hover:border-b-2 hover:border-black transition-transform">Login</p></li>
                    </Link>
                    <Link to="/register">
                        <li><p className="text-black text-lg hover:border-b-2 hover:border-black transition-transform">Register</p></li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
