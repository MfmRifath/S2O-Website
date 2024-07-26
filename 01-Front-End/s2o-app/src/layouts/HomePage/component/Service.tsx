import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ServiceCard from './ServiceCard'; // Adjust path if necessary
import './Service.css'; // Import the CSS file for animations

const services = [
    {
        icon: 'fas fa-laptop-code',
        title: 'Web Development',
        description: 'Building responsive and modern web applications tailored to your needs.',
        link: '#',
        animationType: 'bounce'
    },
    {
        icon: 'fas fa-mobile-alt',
        title: 'Mobile Development',
        description: 'Creating mobile applications for Android and iOS platforms with a seamless user experience.',
        link: '#',
        animationType: 'rotate'
    },
    {
        icon: 'fas fa-search',
        title: 'SEO Services',
        description: 'Improving your website’s visibility on search engines through proven SEO techniques.',
        link: '#',
        animationType: 'pulse'
    },
    {
        icon: 'fas fa-cloud',
        title: 'Cloud Computing',
        description: 'Providing scalable cloud solutions to enhance your business operations.',
        link: '#',
        animationType: 'bounce'
    }
];

export const ServicesPage = () => {
    return (
        <section className="container-xxl py-5">
            <div >
                <div className="text-center mx-auto mb-5">
                    <h1 className="mb-3">Our Services</h1>
                    <p>We offer a wide range of services to meet your needs. Explore our offerings below and find the right solution for your business.</p>
                </div>
                <div className="row g-4">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            link={service.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Add an empty export statement to ensure the file is treated as a module.
export {};
