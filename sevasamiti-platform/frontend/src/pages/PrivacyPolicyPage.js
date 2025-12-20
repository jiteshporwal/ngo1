import React from 'react';
import './LegalPages.css';

const PrivacyPolicyPage = () => {
    return (
        <div className="legal-page-container">
            <h1>Karm Setu Privacy Policy</h1>

            <section>
                <h2>1. Introduction and Scope</h2>
                <p>Karm Setu is committed to protecting the privacy and confidentiality of your personal information. This Privacy Policy outlines how we collect, use, store, and disclose the personal data we receive through our website.</p>
                <p>By using our website, making a donation, or signing up for our communications, you consent to the terms of this Privacy Policy.</p>
            </section>

            <section>
                <h2>2. Information We Collect</h2>
                <p>We collect personal information to effectively carry out our mission, process donations, and communicate with our supporters. The information we collect falls into two main categories:</p>

                <h3>A. Information You Voluntarily Provide (Directly Collected)</h3>
                <ul>
                    <li><strong>Donor & Contact Information:</strong> Name, postal address, email address, phone number, and organization/company name.</li>
                    <li><strong>Donation Details:</strong> Amount donated, donation date, type of donation (one-time/recurring), and comments/instructions provided with the donation.</li>
                    <li><strong>Financial Data:</strong> Credit/debit card details or bank account information are collected and processed only by our secure third-party payment gateways (We do not store your full payment card details).</li>
                    <li><strong>Volunteer/Application Data:</strong> Information provided in job, volunteer, or program applications (e.g., CV, educational background, photograph).</li>
                </ul>

                <h3>B. Information Collected Automatically (Indirectly Collected)</h3>
                <ul>
                    <li><strong>Usage Data:</strong> IP address, browser type, operating system, pages visited, time spent on the site, and the referring website.</li>
                    <li><strong>Cookies:</strong> Small data files placed on your device. We use cookies for website functionality, analytics, and to personalize your experience. You can manage your cookie preferences through your browser settings.</li>
                </ul>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
