import * as React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import { Link } from 'react-router-dom';
import './Gallery.css'; // Import the CSS file for custom styles
import { useState } from 'react';
import GalleryImageModel from '../../Model/GalleryImageModel';



function Gallery() {
  const [gallery, setGallery] = React.useState<GalleryImageModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const galleryId = (window.location.pathname).split('/')[0];
 
  React.useEffect(() => {
    const fetchGallery = async () => {
      const baseUrl: string = `http://localhost:8080/api/galleries/${galleryId + 1}`;
      
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();
      
      const loadedGallery: GalleryImageModel = {
        id: responseJson.id,
        event: responseJson.event,
        description: responseJson.description,
        date: responseJson.date,
        img: responseJson.img,
        img1: responseJson.img1,
        img2: responseJson.img2,
        img3: responseJson.img3,
        img4: responseJson.img4,
        img5:responseJson.img5
      };

      setGallery(loadedGallery);
      setIsLoading(false);
    };

    fetchGallery().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, []);
  const images = [
    {
      original: `${gallery?.img}`,
      thumbnail: `${gallery?.img}`,
    },
    {
      original: `${gallery?.img1}`,
      thumbnail:`${gallery?.img1}`,
    },
    {
      original: `${gallery?.img2}`,
      thumbnail: `${gallery?.img2}`,
    },
  ];

  
  return (
    <div className='container mt-3'>
      <div className="homepage-carousel-title gallery-title">
        <h3><b>S2O Gallery</b></h3>
      </div>
      <ImageGallery items={images} />
      <div className='homepage-carousel-title'>
        <Link className='btn btn-secondary btn-outline-light view-more-btn mb-5' to="/Gallery">View More</Link>
      </div>
    </div>
  );
}

export default Gallery;
