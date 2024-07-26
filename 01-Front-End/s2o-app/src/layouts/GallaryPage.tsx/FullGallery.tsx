import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import GalleryImageModel from "../../Model/GalleryImageModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus, faTimes } from "@fortawesome/free-solid-svg-icons";


export const FullGallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryImageModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const galleryId = (window.location.pathname).split('/')[0];

  useEffect(() => {
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

  const openModal = (imgSrc: any) => {
    setCurrentImage(imgSrc);
    setModalIsOpen(true);
    setZoomLevel(1); // Reset zoom level when a new image is opened
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage(null);
  };

  const zoomIn = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel + 0.1);
  };

  const zoomOut = () => {
    setZoomLevel(prevZoomLevel => Math.max(prevZoomLevel - 0.1, 1));
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1>S2O Gallery</h1>
      </div>
      <div>
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : httpError ? (
          <div className="alert alert-danger" role="alert">
            {httpError}
          </div>
        ) : gallery != null ? (
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Event: {gallery.event}</h2>
              <p className="card-text">Description: {gallery.description}</p>
              <p className="card-text">Date: {gallery.date}</p>
              <div className="row">
                {[gallery.img, gallery.img1, gallery.img2, gallery.img3, gallery.img4, gallery.img5].map((imgSrc, index) => (
                  <div className="col-md-4 mb-3 d-flex justify-content-center" key={index}>
                    <img
                      src={imgSrc}
                      alt={`Gallery image ${index + 1}`}
                      className="img-fluid rounded"
                      width="150"
                      height="150"
                      onClick={() => openModal(imgSrc)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">No gallery images available.</p>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        style={{
          content: {
            height:'100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            maxHeight: '90vh',
            maxWidth: '90vw',
          },
        }}
      >
        {currentImage && (
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ position: 'absolute', top: '-225px', right: '10px', zIndex: 1000 }}>
              <FontAwesomeIcon
                icon={faSearchPlus}
                className="mx-2"
                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                onClick={zoomIn}
              />
              <FontAwesomeIcon
                icon={faSearchMinus}
                className="mx-2"
                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                onClick={zoomOut}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className="mx-2"
                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                onClick={closeModal}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={currentImage}
                alt="Current View"
                className="img-fluid"
                style={{ transform: `scale(${zoomLevel})`, maxHeight: '80vh', maxWidth: '80vw' }}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
