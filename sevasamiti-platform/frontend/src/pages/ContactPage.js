import React, { useState } from 'react';
import './ContactPage.css'; // Import the CSS file for styling
import contactImage from '../assets/contact-us.jpg'; // Assuming you have an image in assets

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        query: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        setMessage('Thank you for your query! Our team will reach out to you soon.');
        setFormData({ name: '', email: '', phone: '', query: '' });
    };

    return (
        <div className="contact-page-container">
            <div className="contact-header">
                <img src={contactImage} alt="Contact Us" className="contact-image" />
                <h1 className="contact-title">Karm Setu</h1>
            </div>

            <div className="contact-body">
                <div className="contact-form-container">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="query">Query</label>
                            <select id="query" name="query" value={formData.query} onChange={handleChange} required>
                                <option value="">Select a program</option>
                                <option value="Education & Skill Development">Education & Skill Development</option>
                                <option value="Healthcare & Well-being">Healthcare & Well-being</option>
                                <option value="Women Empowerment">Women Empowerment</option>
                                <option value="Livelihood & Community Development">Livelihood & Community Development</option>
                                <option value="Environmental Conservation">Environmental Conservation</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <button type="submit" className="submit-button">Send</button>
                    </form>
                    {message && <p className="success-message">{message}</p>}
                </div>

                <div className="contact-info-container">
                    <h2>For More Information</h2>
                    <div className="info-section">
                        <h3>Registered Office</h3>
                        <p>Karm Setu</p>
                        <p>MP, India</p>
                        <p>Gaytri Nager, Rampura Naka, Manasa, MP</p>
                    </div>
                    <div className="info-section">
                        <h3>For donation-related queries, please write to:</h3>
                        <p>jiteshporwaljp18@gmail.com</p>
                        <p>or call: +91 9826711839 / +91 9999999999</p>
                    </div>
                    <div className="info-section">
                        <h3>For all other queries:</h3>
                        <p>info@karmsetu.org</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;