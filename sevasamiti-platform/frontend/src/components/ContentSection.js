import React from 'react';
import './ContentSection.css';

const ContentSection = ({ title, content, imageUrl, imageAlt, reverse = false }) => {
    return (
        <section className={`content-section ${reverse ? 'reverse' : ''}`}>
            <div className="content-section-image">
                <img src={imageUrl} alt={imageAlt} />
            </div>
            <div className="content-section-text">
                <h2>{title}</h2>
                {typeof content === 'string' ? <p>{content}</p> : content}
            </div>
        </section>
    );
};

export default ContentSection;
