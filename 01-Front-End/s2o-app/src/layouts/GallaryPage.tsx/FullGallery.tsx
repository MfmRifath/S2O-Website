import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import GalleryImageModel from "../../Model/GalleryImageModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus, faTimes, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const FullGallery: React.FC = () => {
  const [galleries, setGalleries] = useState<GalleryImageModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);

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

  const openModal = (images: string[], index: number) => {
    setCurrentGalleryImages(images);
    setCurrentImageIndex(index);
    setModalIsOpen(true);
    setZoomLevel(1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentGalleryImages([]);
    setCurrentImageIndex(0);
  };

  const zoomIn = () =>
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 0.1, 3));
  const zoomOut = () =>
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 1));

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentGalleryImages.length);
    setZoomLevel(1);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length
    );
    setZoomLevel(1);
  };

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
                        onClick={() =>
                          openModal(
                            gallery.images.map((img) =>
                              img.file ? URL.createObjectURL(img.file) : img.url
                            ),
                            index
                          )
                        }
                      >
                        <img
                          src={imgSrc}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
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
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          overlayClassName="modal-overlay"
        >
          {currentGalleryImages.length > 0 && (
            <div className="relative bg-black flex items-center justify-center w-full h-full">
              <div className="absolute top-4 right-4 flex space-x-4 text-white">
                <FontAwesomeIcon
                  icon={faSearchPlus}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={zoomIn}
                />
                <FontAwesomeIcon
                  icon={faSearchMinus}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={zoomOut}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className="cursor-pointer hover:text-red-500"
                  onClick={closeModal}
                />
              </div>
              <button
                className="absolute left-4 text-white text-3xl hover:text-gray-400"
                onClick={goToPrevImage}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <img
                src={currentGalleryImages[currentImageIndex]}
                alt="Current View"
                className="w-auto max-h-full transform transition-transform"
                style={{ transform: `scale(${zoomLevel})` }}
              />
              <button
                className="absolute right-4 text-white text-3xl hover:text-gray-400"
                onClick={goToNextImage}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default FullGallery;