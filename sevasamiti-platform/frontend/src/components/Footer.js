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
                <a href="https://www.facebook.com/share/1G4SzaHFsa/" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.instagram.com/karm_setu?igsh=MTEwcnpzM2N0NXJwcg==" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <p className="copyright">&copy; 2025 KarmSetu. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
