import React, { useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './S2OAcademy.css'; // Import the CSS file for custom styles

const s2oAcademiaInfo = {
    logo: require('./../../../Images/s2o-academy.jpg'), // Adjust the path to your S2O Academia logo
    description: 'S2O Academy is committed to delivering high-quality education through innovative and engaging learning experiences. Our programs are designed to foster intellectual growth, creativity, and critical thinking. Join us to explore a world of knowledge and opportunities.'
};

export const S2OAcademyPage = () => {
    const logoRef = useRef<HTMLImageElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger animation when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class
                    if (entry.target === logoRef.current) {
                        logoRef.current?.classList.add('animate-fadeInUp');
                    }
                    if (entry.target === descriptionRef.current) {
                        descriptionRef.current?.classList.add('animate-fadeInUp');
                    }
                }
            });
        }, options);

        if (logoRef.current) {
            observer.observe(logoRef.current);
        }

        if (descriptionRef.current) {
            observer.observe(descriptionRef.current);
        }

        return () => {
            if (logoRef.current) {
                observer.unobserve(logoRef.current);
            }
            if (descriptionRef.current) {
                observer.unobserve(descriptionRef.current);
            }
        };
    }, []);

    return (
        <section className="text-center py-5">
            <div className="mb-5">
                <img 
                    src={s2oAcademiaInfo.logo} 
                    alt="S2O Academia Logo" 
                    className="s2o-logo mb-3" 
                    ref={logoRef} 
                />
                <p 
                    className="s2o-description" 
                    ref={descriptionRef}
                >
                    {s2oAcademiaInfo.description}
                </p>
                <a href="#explore" className="btn btn-outline-light explore-btn">Explore S2O Academy</a>
            </div>
        </section>
    );
};

export default S2OAcademyPage;
