import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { Link } from "react-router-dom";
import GalleryImageModel from "../../Model/GalleryImageModel";

const Gallery: React.FC = () => {
  const [galleries, setGalleries] = useState<GalleryImageModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/galleries");

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: Unable to fetch galleries.`
          );
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

  // Generate URLs for image files in each gallery
  const images = galleries.flatMap((gallery) =>
    Array.isArray(gallery.images)
      ? gallery.images.map((img) => {
          const imgUrl = img.file ? URL.createObjectURL(img.file) : img.url;
          return { original: imgUrl, thumbnail: imgUrl };
        })
      : []
  );

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-4xl font-extrabold text-gray-800">S2O Gallery</h3>
        </div>

        {/* Loading/Error States */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : httpError ? (
          <div className="text-center text-red-500">{httpError}</div>
        ) : (
          <div>
            {/* Image Gallery */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <ImageGallery items={images} />
            </div>

            {/* View More Button */}
            <div className="text-center mt-6">
              <Link
                to="/Gallery"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full shadow-md hover:from-teal-500 hover:to-blue-500 hover:shadow-lg transition-transform transform hover:scale-105"
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