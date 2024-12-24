import React, { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const s2oAcademiaInfo = {
    logo: require("./../../../Images/s2o-academy.jpg"), // Adjust the path to your S2O Academy logo
    description:
        "S2O Academy is committed to delivering high-quality education through innovative and engaging learning experiences. Our programs are designed to foster intellectual growth, creativity, and critical thinking. Join us to explore a world of knowledge and opportunities.",
};

export const S2OAcademyPage = () => {
    const logoRef = useRef<HTMLImageElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for JWT token in localStorage or sessionStorage
        const token = localStorage.getItem("token"); // Adjust to your JWT storage method
        if (token) {
            try {
                // Decode token to validate and check expiration
                const payload = JSON.parse(atob(token.split(".")[1])); // Decode payload
                const isTokenValid = payload.exp * 1000 > Date.now(); // Check if token is expired
                setIsLoggedIn(isTokenValid);
            } catch (error) {
                console.error("Invalid token:", error);
                setIsLoggedIn(false); // Invalid token, log the user out
            }
        } else {
            setIsLoggedIn(false); // No token, user is not logged in
        }
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1, // Trigger animation when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add animation class
                    if (entry.target === logoRef.current) {
                        logoRef.current?.classList.add("animate-fadeInUp");
                    }
                    if (entry.target === descriptionRef.current) {
                        descriptionRef.current?.classList.add("animate-fadeInUp");
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
        <section className="text-center py-12 bg-gradient-to-r from-blue-50 via-teal-50 to-blue-100">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Logo */}
                <div className="mb-8">
                    <img
                        src={s2oAcademiaInfo.logo}
                        alt="S2O Academy Logo"
                        className="mx-auto w-40 lg:w-64 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                        ref={logoRef}
                    />
                </div>

                {/* Description */}
                <p
                    className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto animate-opacity"
                    ref={descriptionRef}
                >
                    {s2oAcademiaInfo.description}
                </p>

                {/* Button */}
                <a
                    href={isLoggedIn ? "#explore" : "/login"} // Link changes based on login status
                    className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full shadow-md hover:from-teal-500 hover:to-blue-500 hover:shadow-lg transform transition-transform hover:scale-105"
                >
                    {isLoggedIn ? "Explore S2O Academy" : "Sign In"} {/* Conditional Button Text */}
                </a>
            </div>
        </section>
    );
};

export default S2OAcademyPage;