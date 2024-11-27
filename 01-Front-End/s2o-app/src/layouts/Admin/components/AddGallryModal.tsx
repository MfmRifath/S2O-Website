import React, { useState } from "react";
import "./addGallery.css";
import GalleryImageModel from "../../../Model/GalleryImageModel";
import Image from "../../../Model/Image";

interface AddEditGalleryModalProps {
  galleryItem: GalleryImageModel | null;
  onSave: (galleryItem: GalleryImageModel) => void;
  onClose: () => void;
}

export const AddEditGalleryModal: React.FC<AddEditGalleryModalProps> = ({
  galleryItem,
  onSave,
  onClose,
}) => {
  const [item, setItem] = useState<GalleryImageModel>(
    galleryItem || new GalleryImageModel(0, "", [], "", "")
  );

  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setItem((prevItem) => {
        const updatedImages = [...prevItem.images];
        const newImage = new Image(0, "", file); // Create a new Image object
        updatedImages[index] = newImage;
        return new GalleryImageModel(
          prevItem.id,
          prevItem.event,
          updatedImages,
          prevItem.description,
          prevItem.date
        );
      });
    }
  };

  const addImageField = () => {
    setItem((prevItem) => {
      const updatedImages = [...prevItem.images, new Image(0, "", undefined)];
      return new GalleryImageModel(
        prevItem.id,
        prevItem.event,
        updatedImages,
        prevItem.description,
        prevItem.date
      );
    });
  };

  const removeImageField = (index: number) => {
    setItem((prevItem) => {
      const updatedImages = [...prevItem.images];
      updatedImages.splice(index, 1);
      return new GalleryImageModel(
        prevItem.id,
        prevItem.event,
        updatedImages,
        prevItem.description,
        prevItem.date
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const addGallery = async () => {
    const formData = new FormData();
    formData.append(
      "gallery",
      JSON.stringify({
        event: item.event,
        description: item.description || "",
        date: item.date,
      })
    );

    item.images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file); // Append only File objects
      }
    });

    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name}`);
      } else {
        console.log(`${key}:`, value);
      }
    }

    try {
      const response = await fetch("http://localhost:8080/api/galleries", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add gallery");
      }

      const newGallery = await response.json();
      onSave(newGallery);
      onClose();
    } catch (error) {
      console.error("Error adding gallery:", error);
      setError("Failed to add gallery. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (!item.event || !item.date) {
      setError("Event name and date are required.");
      return;
    }

    if (item.images.some((image) => !image.file && !image.url)) {
      setError("All images must have a file or a URL.");
      return;
    }

    setError("");
    addGallery();
  };

  return (
    <div className="modal-container">
      <h5 className="modal-title">
        {galleryItem ? "Edit Gallery Item" : "Add Gallery Item"}
      </h5>

      {error && <p className="error-text">{error}</p>}

      <input
        name="event"
        value={item.event}
        onChange={handleChange}
        placeholder="Event Name *"
        className="input-field"
      />
      <textarea
        name="description"
        value={item.description}
        onChange={handleChange}
        placeholder="Description"
        className="textarea-field"
      />
      <input
        name="date"
        value={item.date}
        onChange={handleChange}
        placeholder="Date *"
        type="date"
        className="input-field"
      />

      <div className="image-upload-section">
        <label>Upload Images:</label>
        {item.images.map((image, index) => (
          <div key={index} className="image-upload-thumbnail">
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, index)}
              accept="image/*"
              className="file-input"
            />
            {image.file ? (
              <img
                src={URL.createObjectURL(image.file)}
                alt={`Uploaded ${index + 1}`}
                className="thumbnail-preview"
              />
            ) : (
              <img src={image.url} alt={`Uploaded ${index + 1}`} className="thumbnail-preview" />
            )}
            <button
              onClick={() => removeImageField(index)}
              className="remove-image-button"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={addImageField} className="add-image-button">
          Add Image
        </button>
      </div>

      <div className="button-group">
        <button onClick={handleSubmit} className="btn-save">
          Save
        </button>
        <button onClick={onClose} className="btn-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEditGalleryModal;