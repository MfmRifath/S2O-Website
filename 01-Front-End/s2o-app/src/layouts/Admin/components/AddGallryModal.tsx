import React, { useState } from "react";
import "./addGallery.css";
import GalleryImageModel from "../../../Model/GalleryImageModel";

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
    galleryItem || {
      id: 0,
      event: "",
      description: "",
      date: "",
      img: [], // Use an array for images
    }
  );
  const [error, setError] = useState("");

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setItem((prevItem) => {
        const newImages = [...prevItem.img];
        newImages[index] = file; // Replace the image at the specified index
        return { ...prevItem, images: newImages };
      });
    }
  };

  const addImageField = () => {
    setItem((prevItem) => ({
      ...prevItem,
      images: [...prevItem.img, null],
    }));
  };

  const removeImageField = (index: number) => {
    setItem((prevItem) => {
      const newImages = [...prevItem.img];
      newImages.splice(index, 1);
      return { ...prevItem, images: newImages };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const addGallery = async () => {
    const formData = new FormData();
    formData.append(
      "gallery",
      JSON.stringify({
        event: item.event,
        description: item.description,
        date: item.date,
      })
    );

    // Append each image file if it exists
    item.img.forEach((image, index) => {
      if (image) formData.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:8080/api/galleries", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add gallery");

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
        {item.img.map((image, index) => (
          <div key={index} className="image-upload-thumbnail">
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, index)}
              accept="image/*"
              className="file-input"
            />
            {image && (
              <img
                src={URL.createObjectURL(image as File)}
                alt={`Uploaded ${index + 1}`}
                className="thumbnail-preview"
              />
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

// Export component
export default AddEditGalleryModal;
