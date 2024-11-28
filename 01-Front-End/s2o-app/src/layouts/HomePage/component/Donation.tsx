import React, { useEffect, useRef, useState } from 'react';

const donationInfo = {
    description:
        'Your generous donation will help us continue to provide high-quality education and resources to students and educators. Every contribution makes a significant impact in fostering learning and growth within our community.',
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
            threshold: 0.1, // Trigger animation when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
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
        <section className="py-12 bg-gradient-to-br from-blue-50 to-teal-50 text-center">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-gray-800 mb-6 animate-fadeInUp">
                    Make a Donation
                </h1>

                {/* Description */}
                <p
                    className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 animate-fadeInUp"
                    ref={descriptionRef}
                >
                    {donationInfo.description}
                </p>

                {/* Input and Button */}
                <div className="max-w-md mx-auto space-y-4">
                    <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none animate-fadeInUp"
                        placeholder="Enter donation amount"
                        value={amount}
                        onChange={handleInputChange}
                        ref={inputRef}
                    />
                    <button
                        className={`w-full py-3 text-white font-medium rounded-lg shadow-md transform transition-all ${
                            amount && parseFloat(amount) > 0
                                ? 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 hover:shadow-lg hover:scale-105'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        onClick={handleDonateClick}
                        disabled={!amount || parseFloat(amount) <= 0}
                        ref={buttonRef}
                    >
                        Donate Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DonationPage;