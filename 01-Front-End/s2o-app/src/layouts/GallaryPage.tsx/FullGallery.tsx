import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import GalleryImageModel from "../../Model/GalleryImageModel";
import Image from "../../Model/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus,
  faSearchMinus,
  faTimes,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./FullGallery.css";

export const FullGallery: React.FC = () => {
  const [galleries, setGalleries] = useState<GalleryImageModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/galleries");
        if (!response.ok) throw new Error("Failed to fetch galleries.");

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

  const openModal = (imgSrc: string) => {
    setCurrentImage(imgSrc);
    setModalIsOpen(true);
    setZoomLevel(1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage(null);
  };

  const zoomIn = () =>
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 0.1, 3));
  const zoomOut = () =>
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 1));

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="gallery-title">Explore Our Gallery</h1>
      </div>
      {isLoading ? (
        <div className="loading-spinner text-center">Loading...</div>
      ) : httpError ? (
        <div className="error-message text-center">
          <p>Something went wrong while loading galleries.</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="row gallery-row">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="col-md-4 mb-4">
              <div className="gallery-card shadow-lg rounded">
                <div className="gallery-card-body">
                  <h5 className="gallery-card-title">Event: {gallery.event}</h5>
                  <p className="gallery-card-text">{gallery.description}</p>
                  <p className="gallery-card-date">{gallery.date}</p>
                  <Carousel
                    showThumbs={false}
                    dynamicHeight={true}
                    infiniteLoop={true}
                    showStatus={false}
                    className="gallery-carousel"
                  >
                    {gallery.images.map((image, index) => {
                      // Determine image source
                      const imgSrc =
                        image.file ? URL.createObjectURL(image.file) : image.url;

                      return (
                        <div
                          key={index}
                          className="carousel-image-wrapper"
                          onClick={() => openModal(imgSrc)}
                        >
                          <img
                            src={imgSrc}
                            alt={`Gallery image ${index + 1}`}
                            className="carousel-image"
                          />
                          <div className="carousel-overlay">
                            <FontAwesomeIcon
                              icon={faExpand}
                              className="expand-icon"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        {currentImage && (
          <div className="modal-image-container">
            <div className="modal-controls">
              <FontAwesomeIcon
                icon={faSearchPlus}
                className="modal-icon"
                onClick={zoomIn}
              />
              <FontAwesomeIcon
                icon={faSearchMinus}
                className="modal-icon"
                onClick={zoomOut}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className="modal-icon close-icon"
                onClick={closeModal}
              />
            </div>
            <img
              src={currentImage}
              alt="Current View"
              className="modal-image"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};