import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to="/terms" className="footer-link">Terms and Conditions</Link>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </div>
            <div className="social-media">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <p className="copyright">&copy; 2025 SevaSetu. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
