import React, { useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Vision.css'; // Import the CSS file

export const Vision = () => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleScroll = () => {
        cardRefs.current.forEach((card) => {
            if (card && isInViewport(card)) {
                card.classList.add('animate');
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
        <section className="my-5">
            <div>
                <h3 className="text-center mb-4">Mission, Vision &amp; History</h3>
                <div className="row">
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card h-100"
                            ref={(el) => (cardRefs.current[0] = el)}
                        >
                            <div className="card-body text-center">
                                <i className="fas fa-bullseye fa-3x mb-3 card-icon bounce"></i>
                                <h4 className="card-title">Mission</h4>
                                <p className="card-text">Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You day real less till dear read. Considered use dispatched melancholy sympathize discretion led.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card h-100"
                            ref={(el) => (cardRefs.current[1] = el)}
                        >
                            <div className="card-body text-center">
                                <i className="fas fa-eye fa-3x mb-3 card-icon rotate"></i>
                                <h4 className="card-title">Vision</h4>
                                <p className="card-text">Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You day real less till dear read. Considered use dispatched melancholy sympathize discretion led.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card h-100"
                            ref={(el) => (cardRefs.current[2] = el)}
                        >
                            <div className="card-body text-center">
                                <i className="fas fa-history fa-3x mb-3 card-icon pulse"></i>
                                <h4 className="card-title">History</h4>
                                <p className="card-text">Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You day real less till dear read. Considered use dispatched melancholy sympathize discretion led.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div
                            className="card h-100"
                            ref={(el) => (cardRefs.current[3] = el)}
                        >
                            <div className="card-body text-center">
                                <i className="fas fa-users fa-3x mb-3 card-icon bounce"></i>
                                <h4 className="card-title">Our Team</h4>
                                <p className="card-text">Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You day real less till dear read. Considered use dispatched melancholy sympathize discretion led.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
