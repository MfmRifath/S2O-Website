import React, { useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Founder.css';

const founderInfo = {
    image: require('./../../../Images/Founder/Founder.png'), // Adjust the path to the founder's image
    name: 'MSM.Usama',
    description: 'Mr.MSM.Usama is the visionary founder of S2O Academy. With a passion for education and technology, John has dedicated his career to creating innovative learning solutions that empower students and educators alike. Under his leadership, S2O Academy has grown into a leading institution, known for its excellence in academic and extracurricular programs.'
};

export const FounderPage = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const nameRef = useRef<HTMLHeadingElement | null>(null);
    const descriptionRef = useRef<HTMLParagraphElement | null>(null);

    const isInViewport = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom >= 0 &&
            rect.left < window.innerWidth &&
            rect.right >= 0
        );
    };

    const handleScroll = () => {
        if (imageRef.current && nameRef.current && descriptionRef.current) {
            const image = imageRef.current;
            const name = nameRef.current;
            const description = descriptionRef.current;

            if (isInViewport(image)) {
                image.classList.add('animate-scaleIn');
            }

            if (isInViewport(name)) {
                name.classList.add('animate-slideInUp');
            }

            if (isInViewport(description)) {
                description.classList.add('animate-slideInUp');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger on initial load

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="py-5">
            <div className="text-center mb-5">
                <h1><b>Founder</b></h1>
                <img
                    ref={imageRef}
                    src={founderInfo.image}
                    alt="Founder"
                    className="rounded-circle founder-image mb-3"
                />
                <h2 ref={nameRef} className="founder-name">
                    {founderInfo.name}
                </h2>
                <p ref={descriptionRef} className="founder-description">
                    {founderInfo.description}
                </p>
            </div>
        </section>
    );
};

export default FounderPage;
