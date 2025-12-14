import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../service/api';
import './Auth.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        login(formData)
            .then(response => {
                console.log("Login successful! Response:", response);
                localStorage.setItem('accessToken', response.accessToken);
                console.log("accessToken stored. Navigating to /home...");
                navigate('/home');
            }).catch(error => {
                console.error("Login failed:", error);
                setError(error.message || 'Invalid username or password. Please try again.');
                setLoading(false);
            });
    };
    
    const GOOGLE_AUTH_URL = 'http://localhost:8080/oauth2/authorize/google';

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="divider">OR</div>
                <a className="btn sso-btn" href={GOOGLE_AUTH_URL}>
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        className="sso-icon"
                    />
                    Sign in with Google
                </a>
                <p style={{ marginTop: '1rem' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" className="auth-switch-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
