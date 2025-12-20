import React, { useState } from 'react';
import './DonationForm.css';

const DonationForm = () => {
    const [donationType, setDonationType] = useState('one-time');
    const [amount, setAmount] = useState(500);
    const [customAmount, setCustomAmount] = useState('');

    // State for dynamic goal and impact
    const [monthlyGoal, setMonthlyGoal] = useState(500000); // Placeholder
    const [monthlyRaised, setMonthlyRaised] = useState(380000); // Placeholder
    const [totalImpactRaised, setTotalImpactRaised] = useState(2500000); // Placeholder
    const [totalDonors, setTotalDonors] = useState(1250); // Placeholder

    const monthlyProgress = (monthlyRaised / monthlyGoal) * 100;

    const handleAmountClick = (selectedAmount) => {
        setAmount(selectedAmount);
        setCustomAmount('');
    };

    return (
        <div className="donation-form-container">
            <div className="donation-form">
                <h2>Make a Donation</h2>
                <div className="donation-type">
                    <button
                        className={`donation-type-btn ${donationType === 'one-time' ? 'active' : ''}`}
                        onClick={() => setDonationType('one-time')}
                    >
                        One-time
                    </button>
                    <button
                        className={`donation-type-btn ${donationType === 'monthly' ? 'active' : ''}`}
                        onClick={() => setDonationType('monthly')}
                    >
                        Monthly
                    </button>
                </div>
                <div className="donation-amounts">
                    {[500, 1000, 2500, 5000, 10000].map((a) => (
                        <button
                            key={a}
                            className={`amount-btn ${amount === a ? 'active' : ''}`}
                            onClick={() => handleAmountClick(a)}
                        >
                            ₹{a}
                        </button>
                    ))}
                </div>
                <div className="custom-amount">
                    <label htmlFor="custom-amount">Other:</label>
                    <input
                        type="number"
                        id="custom-amount"
                        value={customAmount}
                        onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setAmount(0);
                        }}
                        placeholder="Enter amount"
                    />
                </div>
                <div className="processing-fees">
                    <input type="checkbox" id="cover-fees" />
                    <label htmlFor="cover-fees">Cover processing fees (₹0)</label>
                </div>
                <button className="donate-now-btn">Donate Now</button>
                <p className="secure-payment-notice">Secure payment powered by Stripe & Razorpay</p>
            </div>
            <div className="donation-impact">
                <div className="donation-goal">
                    <h3>This Month's Goal</h3>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${monthlyProgress}%` }}></div>
                    </div>
                    <div className="goal-amounts">
                        <span>₹{monthlyRaised.toLocaleString('en-IN')}</span>
                        <span>₹{monthlyGoal.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <div className="total-impact">
                    <h3>Total Impact</h3>
                    <p className="total-raised">₹{totalImpactRaised.toLocaleString('en-IN')}</p>
                    <p className="total-donors">{totalDonors.toLocaleString('en-IN')} Generous Donors</p>
                </div>
                 <div className="tax-benefits">
                    <h3>Tax Benefits</h3>
                    <ul>
                        <li>80G tax exemption certificate</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DonationForm;
