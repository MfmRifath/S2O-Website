import React from 'react';
import ServiceCard from './ServiceCard';
export const ServicesPage = () => {
    const services = [
      {
        icon: 'fas fa-laptop-code',
        title: 'Web Development',
        description: 'Building responsive and modern web applications tailored to your needs.',
        link: '#',
        animationType: 'animate-bounce',
      },
      {
        icon: 'fas fa-mobile-alt',
        title: 'Mobile Development',
        description: 'Creating mobile applications for Android and iOS platforms with a seamless user experience.',
        link: '#',
        animationType: 'animate-rotate',
      },
      {
        icon: 'fas fa-search',
        title: 'SEO Services',
        description: 'Improving your website’s visibility on search engines through proven SEO techniques.',
        link: '#',
        animationType: 'animate-pulse',
      },
      {
        icon: 'fas fa-cloud',
        title: 'Cloud Computing',
        description: 'Providing scalable cloud solutions to enhance your business operations.',
        link: '#',
        animationType: 'animate-bounce',
      },
    ];
  
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-gray-800">Our Services</h1>
            <p className="text-gray-600 mt-4">
              We offer a wide range of services to meet your needs. Explore our offerings below and find the right solution for your business.
            </p>
          </div>
  
          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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