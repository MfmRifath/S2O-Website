import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import GalleryImageModel from "../../Model/GalleryImageModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus,
  faSearchMinus,
  faTimes,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    <div className="py-12 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Explore Our Gallery
          </h1>
        </div>

        {/* Loading/Error States */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : httpError ? (
          <div className="text-center text-red-500">
            <p>Something went wrong while loading galleries.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800 mb-2">
                    Event: {gallery.event}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {gallery.description}
                  </p>
                  <p className="text-xs text-gray-500">{gallery.date}</p>
                </div>
                <Carousel
                  showThumbs={false}
                  dynamicHeight={true}
                  infiniteLoop={true}
                  showStatus={false}
                  className="gallery-carousel"
                >
                  {gallery.images.map((image, index) => {
                    const imgSrc =
                      image.file ? URL.createObjectURL(image.file) : image.url;

                    return (
                      <div
                        key={index}
                        className="relative cursor-pointer"
                        onClick={() => openModal(imgSrc)}
                      >
                        <img
                          src={imgSrc}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                          <FontAwesomeIcon
                            icon={faExpand}
                            className="text-white text-2xl"
                          />
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Modal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          overlayClassName="modal-overlay"
        >
          {currentImage && (
            <div className="relative bg-white rounded-lg p-6 shadow-lg">
              {/* Modal Controls */}
              <div className="absolute top-4 right-4 space-x-2">
                <FontAwesomeIcon
                  icon={faSearchPlus}
                  className="cursor-pointer text-gray-700 hover:text-blue-500 transition"
                  onClick={zoomIn}
                />
                <FontAwesomeIcon
                  icon={faSearchMinus}
                  className="cursor-pointer text-gray-700 hover:text-blue-500 transition"
                  onClick={zoomOut}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className="cursor-pointer text-red-500 hover:text-red-600 transition"
                  onClick={closeModal}
                />
              </div>
              <img
                src={currentImage}
                alt="Current View"
                className="w-full h-auto"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default FullGallery;