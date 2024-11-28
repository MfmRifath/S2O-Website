import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Advicers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slidesData = [
    {
      image: require('./../../../Images/Advicers/ad1.png'),
      name: 'Dr. John Smith',
      designation: 'Principal',
      description: 'Guiding our academic excellence with a wealth of experience.',
    },
    {
      image: require('./../../../Images/Advicers/ad2.png'),
      name: 'Jane Doe',
      designation: 'Senior Advisor',
      description: 'Leading strategic initiatives to drive innovation and growth.',
    },
    {
      image: require('./../../../Images/Advicers/ad3.png'),
      name: 'Michael Brown',
      designation: 'Educational Consultant',
      description: 'Bringing insights and expertise to enhance learning methodologies.',
    },
    {
      image: require('./../../../Images/Advicers/ad4.png'),
      name: 'Emily White',
      designation: 'Board Member',
      description: 'Championing student-centric policies and governance.',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 lg:px-8">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
            Our Advisors
          </span>
        </h1>
        <p className="text-lg text-gray-600">
          Meet our exceptional advisors driving our vision forward.
        </p>
      </div>

      {/* Slider Section */}
      <Slider {...settings} className="max-w-5xl mx-auto">
        {slidesData.map((advisor, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl group transition-all duration-300"
          >
            {/* Advisor Image */}
            <div className="relative flex justify-center items-center">
              <img
                src={advisor.image}
                alt={advisor.name}
                className="w-32 h-32 rounded-full object-cover shadow-md transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Advisor Details */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {advisor.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{advisor.designation}</p>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                {advisor.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Advicers;