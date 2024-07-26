// Advicers.js
import React from 'react';
import Slider from 'react-slick';
import './../component/Advicers.css';

const Advicers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slidesData = [
    {
      image: require('./../../../Images/Advicers/ad1.png'),
      content: 'Principal',
    },
    {
      image: require('./../../../Images/Advicers/ad2.png'),
      content: 'Slide 2 Content',
    },
    {
      image: require('./../../../Images/Advicers/ad3.png'),
      content: 'Slide 3 Content',
    },
    {
      image: require('./../../../Images/Advicers/ad4.png'),
      content: 'Slide 4 Content',
    },
    {
      image: require('./../../../Images/Advicers/ad6.jpg'),
      content: 'Slide 5 Content',
    },
  ];

  return (
    <div className="carousel-container mt-5">
        <div className='d-flex justify-content-center'><h1>Advisor</h1></div>
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="carousel-content">
              <h5>{slide.content}</h5>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Advicers;
