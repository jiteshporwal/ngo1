import React, { useState } from 'react';
import './DonatePage.css'; // Assume a separate CSS file for styling

const DonatePage = () => {
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: '',
    paymentMethod: 'credit-card',
    anonymous: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate API call for donation processing
    // In a real app, integrate with Stripe, PayPal, or backend API
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
      console.log('Donation submitted:', formData);
      setSubmitMessage('Thank you for your generous donation! Your support means the world to us.');
      setFormData({ amount: '', name: '', email: '', paymentMethod: 'credit-card', anonymous: false });
    } catch (error) {
      setSubmitMessage('There was an error processing your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="donate-page">
      <header className="donate-header">
        <h1>Support Our Cause</h1>
        <p>Your donation helps us make a difference. Every contribution counts!</p>
      </header>

      <main className="donate-main">
        <form onSubmit={handleSubmit} className="donate-form">
          <div className="form-group">
            <label htmlFor="amount">Donation Amount ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="1"
              step="0.01"
              placeholder="Enter amount"
              required
            />
            <div className="amount-suggestions">
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, amount: '25' }))}>$25</button>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, amount: '50' }))}>$50</button>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, amount: '100' }))}>$100</button>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, amount: '500' }))}>$500</button>
            </div>
          </div>

          {!formData.anonymous && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleInputChange}
              />
              Donate anonymously (hide name and email)
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting} className="donate-button">
            {isSubmitting ? 'Processing...' : `Donate $${formData.amount || 0}`}
          </button>
        </form>

        {submitMessage && (
          <div className="message-popup-backdrop" onClick={() => setSubmitMessage('')}>
            <div className={`message message-popup ${submitMessage.includes('Thank you') ? 'success' : 'error'}`} onClick={(e) => e.stopPropagation()}>
              {submitMessage}
            </div>
          </div>
        )}
      </main>

      <footer className="donate-footer">
        <p>Secure donation powered by [Your Payment Provider]. All donations are tax-deductible.</p>
      </footer>
    </div>
  );
};

export default DonatePage;
