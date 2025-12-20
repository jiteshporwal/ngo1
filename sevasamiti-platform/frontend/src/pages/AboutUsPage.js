import React from 'react';
import './AboutUsPage.css'; // Import the CSS file for styling

const AboutUsPage = () => {
    return (
        <div className="about-us-container">
            <header className="about-us-header">
                <h1>About Us</h1>
                <p className="subtitle">Learn more about our mission, vision, and values.</p>
            </header>

            <section className="about-us-section">
                <h2>Our Mission</h2>
                <p>To empower individuals and communities by enabling access to education, healthcare, sustainable livelihoods, and social support systems—thereby building resilient, inclusive, and self-reliant communities.</p>
            </section>

            <section className="about-us-section">
                <h2>Our Story</h2>
                <p>Karm Setu was founded with a simple yet powerful vision: to become a bridge (“Setu”) between intent and impact. What began as a focused effort to address local challenges has evolved into a multi-program organization working across sectors that directly influence quality of life. Over the years, we have grown through partnerships, volunteer engagement, and the trust of the communities we serve. Our journey continues to be shaped by on-ground learning, innovation, and an unwavering commitment to social good.</p>
            </section>

            <section className="about-us-section">
                <h2>Our Values</h2>
                <div className="values-grid">
                    <div className="value-item">
                        <h3>Compassion</h3>
                        <p>We place people at the center of everything we do, approaching every challenge with empathy, dignity, and respect.</p>
                    </div>
                    <div className="value-item">
                        <h3>Empowerment</h3>
                        <p>We believe in enabling individuals—especially women and youth—to become confident decision-makers and leaders in their own lives and communities.</p>
                    </div>
                    <div className="value-item">
                        <h3>Sustainability</h3>
                        <p>Our programs are designed for long-term impact, emphasizing self-reliance, environmental responsibility, and scalable solutions.</p>
                    </div>
                    <div className="value-item">
                        <h3>Collaboration</h3>
                        <p>We work closely with communities, partners, institutions, and volunteers, recognizing that lasting change is achieved through collective effort.</p>
                    </div>
                </div>
            </section>

            <section className="about-us-section">
                <h2>Our Team</h2>
                <p>At Karm Setu, our strength lies in the people who drive our mission forward. Our team is a diverse group of dedicated professionals, volunteers, and community members who bring passion, expertise, and integrity to our work. Together, they ensure effective planning, transparent execution, and sustainable impact at the grassroots level.</p>
            </section>

            <section className="about-us-section">
                <h2>Our Impact</h2>
                <p>Over the years, Karm Setu has made a measurable and meaningful impact on the lives of individuals and communities through its focused interventions. Together with our stakeholders, we have educated thousands of children and adults, improved healthcare access, empowered women, and contributed to environmental conservation. Our impact is a reflection of shared commitment and motivates us to continue building pathways to progress.</p>
            </section>
        </div>
    );
};

export default AboutUsPage;