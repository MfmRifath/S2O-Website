import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Service.css'; // Import the CSS file for animations

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    link: string;
    animationType?: 'bounce' | 'rotate' | 'pulse'; // Optional animation type
}

const ServiceCard = ({ icon, title, description, link, animationType }: ServiceCardProps) => (
    <div className="col-lg-3 col-md-6 mb-4">
        <div className={`service-card h-100 text-center p-4 ${animationType ? `service-icon-${animationType}` : ''}`}>
            <div className={`service-icon ${animationType ? animationType : ''} mb-3`}>
                <i className={`${icon} fa-3x`}></i>
            </div>
            <h4 className="service-title">{title}</h4>
            <p className="service-description">{description}</p>
            <div>
                <a href={link} className="btn btn-secondary">Learn More</a>
            </div>
        </div>
    </div>
);

export default ServiceCard;
