import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { Link } from "react-router-dom";
import GalleryImageModel from "../../Model/GalleryImageModel";

const Gallery: React.FC = () => {
  const [galleries, setGalleries] = useState<GalleryImageModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/galleries");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Unable to fetch galleries.`);
        }

        const galleriesJson: GalleryImageModel[] = await response.json();
        setGalleries(galleriesJson);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching galleries:", error);
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchGalleries();
  }, []);

  const images = galleries.flatMap((gallery) =>
    Array.isArray(gallery.images)
      ? gallery.images
          .filter((img) => img && (img.file || img.url)) // Filter out invalid images
          .map((img) => {
            const imgUrl = img.file ? URL.createObjectURL(img.file) : img.url!;
            return {
              original: imgUrl,
              thumbnail: imgUrl,
              description: gallery.description || "No description available", // Use description from GalleryImageModel
              eventName: gallery.event,  // Use event name from GalleryImageModel
              eventDate: gallery.date,   // Use event date from GalleryImageModel
            };
          })
      : []
  );

  const handleSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="py-8 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">S2O Gallery</h3>
        </div>

        {/* Loading/Error States */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : httpError ? (
          <div className="text-center text-red-500">{httpError}</div>
        ) : (
          <div>
            {/* Image Gallery Wrapper */}
            <div className="shadow-lg py-1 px-2 rounded-lg overflow-hidden max-w-[80%] max-h-[40%] mx-auto">
              <ImageGallery
                items={images}
                showPlayButton={true}
                showFullscreenButton={true}
                slideDuration={400}
                slideInterval={2000}
                onSlide={handleSlide}  // Track the current slide index
              />
            </div>

            {/* Custom Caption Display */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-md">
              <span>{images[currentIndex]?.eventName}</span>
              <div>{images[currentIndex]?.eventDate}</div>
              <div>{images[currentIndex]?.description}</div> {/* Show description */}
            </div>

            {/* View More Button */}
            <div className="text-center mt-4">
              <Link
                to="/Gallery"
                className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full shadow-md hover:from-teal-500 hover:to-blue-500 hover:shadow-lg transition-transform transform hover:scale-105 text-sm"
              >
                View More
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;