import React, { useEffect, useRef, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const founderInfo = {
    image: require('./../../../Images/Founder/Founder.png'), // Adjust the path to the founder's image
    name: 'MSM.Usama',
    description: 'Mr.MSM.Usama is the visionary founder of S2O Academy. With a passion for education and technology, MSM.Usama has dedicated his career to creating innovative learning solutions that empower students and educators alike. Under his leadership, S2O Academy has grown into a leading institution, known for its excellence in academic and extracurricular programs.'
};

export const FounderPage = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const nameRef = useRef<HTMLHeadingElement | null>(null);

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
        if (imageRef.current && nameRef.current) {
            const image = imageRef.current;
            const name = nameRef.current;

            if (isInViewport(image)) {
                image.classList.add('animate-scaleIn');
            }

            if (isInViewport(name)) {
                name.classList.add('animate-slideInUp');
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
        <section className="py-16">
            {/* Glassmorphism Effect with Transparent Background */}
            <div className="bg-opacity-60 backdrop-blur-lg p-10 rounded-xl text-white max-w-5xl mx-auto text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-6"><b className='founder'>Founder</b></h1>
                <div className="flex justify-center mb-6 relative">
                    {/* Shimmer Effect */}
                    {!isImageLoaded && (
                        <div className="absolute w-48 h-48 rounded-full bg-gray-300 animate-pulse"></div>
                    )}
                    {/* Image */}
                    <img
                        ref={imageRef}
                        src={founderInfo.image}
                        alt="Founder"
                        className={`rounded-full w-48 h-48 object-cover mb-4 transition-transform transform hover:scale-105 ease-in-out duration-300 ${
                            isImageLoaded ? '' : 'hidden'
                        }`}
                        onLoad={() => setIsImageLoaded(true)}
                        onError={() => setIsImageLoaded(true)} // Stop shimmer if the image fails to load
                    />
                </div>
                <h2 ref={nameRef} className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 opacity-0 animate-slideInUp">
                    {founderInfo.name}
                </h2>
                <p className="text-lg text-gray-800">
                    {founderInfo.description}
                </p>
            </div>
        </section>
    );
};

export default FounderPage;