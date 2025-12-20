import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './HomePage.css'; // Import the new CSS file
import one from '../assets/one.jpeg';
import two from '../assets/two.jpeg';
import three from '../assets/three.jpeg';
import ContentSection from '../components/ContentSection'; // Import the new ContentSection component
import ContactPage from './ContactPage'; // Import ContactPage

const HomePage = () => {
    // Content for the sections, extracted from AboutUsPage
    const missionContent = "To empower individuals and communities by enabling access to education, healthcare, sustainable livelihoods, and social support systems—thereby building resilient, inclusive, and self-reliant communities.";
    const storyContent = "Karm Setu was founded with a simple yet powerful vision: to become a bridge (“Setu”) between intent and impact. What began as a focused effort to address local challenges has evolved into a multi-program organization working across sectors that directly influence quality of life. Over the years, we have grown through partnerships, volunteer engagement, and the trust of the communities we serve. Our journey continues to be shaped by on-ground learning, innovation, and an unwavering commitment to social good.";
    const valuesContent = (
        <div>
            <h3>Compassion</h3>
            <p>We place people at the center of everything we do, approaching every challenge with empathy, dignity, and respect.</p>
            <h3>Empowerment</h3>
            <p>We believe in enabling individuals—especially women and youth—to become confident decision-makers and leaders in their own lives and communities.</p>
            <h3>Sustainability</h3>
            <p>Our programs are designed for long-term impact, emphasizing self-reliance, environmental responsibility, and scalable solutions.</p>
            <h3>Collaboration</h3>
            <p>We work closely with communities, partners, institutions, and volunteers, recognizing that lasting change is achieved through collective effort.</p>
        </div>
    );
    const teamContent = "At Karm Setu, our strength lies in the people who drive our mission forward. Our team is a diverse group of dedicated professionals, volunteers, and community members who bring passion, expertise, and integrity to our work. Together, they ensure effective planning, transparent execution, and sustainable impact at the grassroots level.";
    const impactContent = "Over the years, Karm Setu has made a measurable and meaningful impact on the lives of individuals and communities through its focused interventions. Together with our stakeholders, we have educated thousands of children and adults, improved healthcare access, empowered women, and contributed to environmental conservation. Our impact is a reflection of shared commitment and motivates us to continue building pathways to progress.";


    return (
        <div className="homepage-container">
            <div className="homepage-carousel-container"> {/* New container for carousel styling */}
                <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false} showStatus={false}>
                    <div>
                        <img src={one} alt="slide 1"/>
                        <p className="legend">Empowering Communities</p>
                    </div>
                    <div>
                        <img src={two} alt="slide 2"/>
                        <p className="legend">Bridging Intent and Impact</p>
                    </div>
                    <div>
                        <img src={three} alt="slide 3"/>
                        <p className="legend">Sustainable Social Change</p>
                    </div>
                </Carousel>
            </div>

            <main>
                <ContentSection
                    title="Our Mission"
                    content={missionContent}
                    imageUrl={one} // Placeholder image
                    imageAlt="Our Mission Image"
                    reverse={false}
                />
                <ContentSection
                    title="Our Story"
                    content={storyContent}
                    imageUrl={two} // Placeholder image
                    imageAlt="Our Story Image"
                    reverse={true}
                />
                <ContentSection
                    title="Our Values"
                    content={valuesContent}
                    imageUrl={three} // Placeholder image
                    imageAlt="Our Values Image"
                    reverse={false}
                />
                <ContentSection
                    title="Our Team"
                    content={teamContent}
                    imageUrl={one} // Placeholder image
                    imageAlt="Our Team Image"
                    reverse={true}
                />
                <ContentSection
                    title="Our Impact"
                    content={impactContent}
                    imageUrl={two} // Placeholder image
                    imageAlt="Our Impact Image"
                    reverse={false}
                />
            </main>

            {/* Contact Us Section */}
            <section className="homepage-contact-section">
                <ContactPage />
            </section>
        </div>
    );
};

export default HomePage;
