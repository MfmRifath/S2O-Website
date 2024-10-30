import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { Link } from "react-router-dom";
import "./Gallery.css";
import GalleryImageModel from "../../Model/GalleryImageModel";

function Gallery() {
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
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchGalleries();
  }, []);

  // Generate URLs for image files in each gallery
  const images = galleries.flatMap((gallery) =>
    gallery.img.map((imgFile) => {
      const imgUrl =
        typeof imgFile === "string" ? imgFile : URL.createObjectURL(imgFile);
      return { original: imgUrl, thumbnail: imgUrl };
    })
  );

  return (
    <div className="container mt-3">
      <div className="homepage-carousel-title gallery-title">
        <h3>
          <b>S2O Gallery</b>
        </h3>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : httpError ? (
        <div className="alert alert-danger">{httpError}</div>
      ) : (
        <div>
          <ImageGallery items={images} />
          <div className="homepage-carousel-title mt-4">
            <Link
              className="btn btn-secondary btn-outline-light view-more-btn mb-5"
              to="/Gallery"
            >
              View More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
