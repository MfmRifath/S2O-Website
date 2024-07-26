import React, { useEffect, useRef, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Donation.css'; // Import the CSS file for custom styles

const donationInfo = {
    description: 'Your generous donation will help us continue to provide high-quality education and resources to students and educators. Every contribution makes a significant impact in fostering learning and growth within our community.'
};

export const DonationPage = () => {
    const [amount, setAmount] = useState('');
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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
                    if (entry.target === descriptionRef.current) {
                        descriptionRef.current?.classList.add('animate-fadeInUp');
                    }
                    if (entry.target === inputRef.current) {
                        inputRef.current?.classList.add('animate-fadeInUp');
                    }
                    if (entry.target === buttonRef.current) {
                        buttonRef.current?.classList.add('animate-fadeInUp');
                    }
                }
            });
        }, options);

        if (descriptionRef.current) {
            observer.observe(descriptionRef.current);
        }

        if (inputRef.current) {
            observer.observe(inputRef.current);
        }

        if (buttonRef.current) {
            observer.observe(buttonRef.current);
        }

        return () => {
            if (descriptionRef.current) {
                observer.unobserve(descriptionRef.current);
            }
            if (inputRef.current) {
                observer.unobserve(inputRef.current);
            }
            if (buttonRef.current) {
                observer.unobserve(buttonRef.current);
            }
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleDonateClick = () => {
        alert(`Thank you for your donation of $${amount}!`);
    };

    return (
        <section className="text-center py-5 mt-5">
            <h1 className="mb-4 animate-fadeInUp">Donation</h1>
            <div className="mb-5">
                <p 
                    className="donation-description animate-fadeInUp" 
                    ref={descriptionRef}
                >
                    {donationInfo.description}
                </p>
                <input 
                    type="number" 
                    className="form-control donation-input mb-3 animate-fadeInUp" 
                    placeholder="Enter donation amount" 
                    value={amount}
                    onChange={handleInputChange}
                    ref={inputRef}
                />
                <button 
                    className="btn btn-primary donate-btn btn-outline-light animate-fadeInUp" 
                    onClick={handleDonateClick}
                    disabled={!amount || parseFloat(amount) <= 0}
                    ref={buttonRef}
                >
                    Donate Now
                </button>
            </div>
        </section>
    );
};

export default DonationPage;
