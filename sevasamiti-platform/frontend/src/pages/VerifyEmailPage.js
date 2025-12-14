import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp, sendOtp } from '../service/api';
import './Auth.css'; // Reusing Auth.css for styling

const VerifyEmailPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get userId from state passed during navigation from SignupPage
    const userId = location.state?.userId;
    const userEmail = location.state?.email; // Optional: display email to user

    if (!userId) {
        // Redirect to signup if userId is not available (e.g., direct access to this page)
        navigate('/signup', { replace: true });
        return null;
    }

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const verifyOtpRequest = { userId, otp };

        verifyOtp(verifyOtpRequest)
            .then(response => {
                localStorage.setItem('accessToken', response.accessToken);
                alert('Email verified successfully! You are now logged in.');
                navigate('/home');
            })
            .catch(error => {
                setError(error.message || 'Invalid OTP. Please try again.');
                setLoading(false);
            });
    };

    const handleResendOtp = () => {
        setLoading(true);
        setError('');
        sendOtp({ userId })
            .then(response => {
                alert(response.message);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message || 'Failed to resend OTP.');
                setLoading(false);
            });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Verify Your Email</h2>
                {userEmail && <p>An OTP has been sent to <strong>{userEmail}</strong></p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="auth-form" onSubmit={handleVerifyOtp}>
                    <div className="form-group">
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            className="form-control"
                            required
                            value={otp}
                            onChange={handleOtpChange}
                            maxLength="6" // Assuming 6-digit OTP
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
                <div className="divider">OR</div>
                <button className="btn btn-primary" onClick={handleResendOtp} disabled={loading} style={{backgroundColor: '#6c757d'}}>
                    {loading ? 'Sending...' : 'Resend OTP'}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
