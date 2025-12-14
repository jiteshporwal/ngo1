import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../service/api';
import './Auth.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        city: '',
        state: '',
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

        signup(formData)
            .then(response => {
                alert(response.message); // Show message like "OTP sent"
                navigate('/verify-email', { state: { userId: response.userId, email: formData.email } });
            }).catch(error => {
                console.error("Signup failed:", error);
                setError(error.message || 'Something went wrong. Please try again.');
                setLoading(false);
            });
    };
    
    const GOOGLE_AUTH_URL = 'http://localhost:8080/oauth2/authorize/google';

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
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
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className="form-control"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            className="form-control"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            className="form-control"
                            required
                            value={formData.state}
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
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="divider">OR</div>
                <a className="btn sso-btn" href={GOOGLE_AUTH_URL}>
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        className="sso-icon"
                    />
                    Sign up with Google
                </a>
                <p style={{ marginTop: '1rem' }}>
                    Already have an account?{' '}
                    <Link to="/login" className="auth-switch-link">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
