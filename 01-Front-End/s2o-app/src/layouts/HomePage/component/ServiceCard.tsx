import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  animationType?: 'bounce' | 'rotate' | 'pulse'; // Optional animation type
}

const ServiceCard = ({ icon, title, description, link, animationType }: ServiceCardProps) => (
  <div className="col-span-1 bg-white rounded-xl shadow-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
    <div className={`text-blue-600 text-4xl mb-4 ${animationType}`}>
      <i className={icon}></i>
    </div>
    <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 mb-4">{description}</p>
    <a
      href={link}
      className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full hover:from-teal-500 hover:to-blue-500 shadow-md hover:shadow-lg transition-all"
    >
      Learn More
    </a>
  </div>
);

export default ServiceCard;