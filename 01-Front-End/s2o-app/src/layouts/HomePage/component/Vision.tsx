import React, { useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Vision = () => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleScroll = () => {
        cardRefs.current.forEach((card) => {
            if (card && isInViewport(card)) {
                card.classList.add('animate-fade-in');
            }
        });
    };

    const isInViewport = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom >= 0 &&
            rect.left < window.innerWidth &&
            rect.right >= 0
        );
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger on initial load

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="py-12 bg-gradient-to-br from-blue-50 to-teal-50">
            <div className="container mx-auto px-6 lg:px-20">
                <h3 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
                    Mission, Vision &amp; History
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Mission */}
                    <div
                        className="bg-white shadow-lg rounded-3xl p-6 text-center transform transition hover:scale-105 hover:shadow-2xl animate-fade-in"
                        ref={(el) => (cardRefs.current[0] = el)}
                    >
                        <i className="fas fa-bullseye fa-3x text-teal-600 mb-4"></i>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">Mission</h4>
                        <p className="text-gray-600">
                            Comfort produce husband boy her had hearing. Law others theirs passed but wishes.
                        </p>
                    </div>

                    {/* Vision */}
                    <div
                        className="bg-white shadow-lg rounded-3xl p-6 text-center transform transition hover:scale-105 hover:shadow-2xl animate-fade-in"
                        ref={(el) => (cardRefs.current[1] = el)}
                    >
                        <i className="fas fa-eye fa-3x text-blue-600 mb-4"></i>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">Vision</h4>
                        <p className="text-gray-600">
                            Comfort produce husband boy her had hearing. Law others theirs passed but wishes.
                        </p>
                    </div>

                    {/* History */}
                    <div
                        className="bg-white shadow-lg rounded-3xl p-6 text-center transform transition hover:scale-105 hover:shadow-2xl animate-fade-in"
                        ref={(el) => (cardRefs.current[2] = el)}
                    >
                        <i className="fas fa-history fa-3x text-yellow-600 mb-4"></i>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">History</h4>
                        <p className="text-gray-600">
                            Comfort produce husband boy her had hearing. Law others theirs passed but wishes.
                        </p>
                    </div>

                    {/* Our Team */}
                    <div
                        className="bg-white shadow-lg rounded-3xl p-6 text-center transform transition hover:scale-105 hover:shadow-2xl animate-fade-in"
                        ref={(el) => (cardRefs.current[3] = el)}
                    >
                        <i className="fas fa-users fa-3x text-purple-600 mb-4"></i>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">Our Team</h4>
                        <p className="text-gray-600">
                            Comfort produce husband boy her had hearing. Law others theirs passed but wishes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};