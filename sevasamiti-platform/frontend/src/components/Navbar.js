import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import logo from '../assets/karmsetu-logo.svg';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/home">
                    {/* Placeholder for KarmSetu Logo */}
                    <img src={logo} alt="KarmSetu Logo" className="navbar-logo" />
                </Link>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/home" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact</Link>
                </li>
            </ul>
            <div className="navbar-actions">
                <button className="donate-button" onClick={() => navigate('/donate')}>Donate Now</button>
                <div className="profile-dropdown">
                    <span onClick={handleLogout} className="logout-text-link" role="button" tabIndex="0">Logout</span>
                    <Link to="/profile" className="profile-icon">
                        <FontAwesomeIcon icon={faUser} className="profile-icon-fa" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
