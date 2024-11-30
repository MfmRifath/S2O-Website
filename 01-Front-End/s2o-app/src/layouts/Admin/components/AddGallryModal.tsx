import React, { useState } from "react";
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
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setItem((prevItem) => {
        const updatedImages = [...prevItem.images];
        const newImage = new Image(0, "", file);
        updatedImages[index] = newImage;
        return new GalleryImageModel(
          prevItem.id,
          prevItem.event,
          updatedImages,
          prevItem.description,
          prevItem.date
        );
      });
    } else {
      console.error("No file selected");
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
    const imageToDelete = item.images[index]; // Get the image to be removed
  
    if (galleryItem && imageToDelete.url) {
      // Extract the keyName from the image URL or object
      const keyName = imageToDelete.keyName;
  
      // If the gallery item exists and the image has a keyName, delete it from the database
      fetch(`http://localhost:8080/api/images/${keyName}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the image from the database");
          }
          console.log(`Image with keyName ${keyName} deleted successfully.`);
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });
    }
  
    // Remove the image from the state
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

  const saveGallery = async () => {
    const formData = new FormData();

    formData.append(
      "gallery",
      JSON.stringify({
        event: item.event,
        description: item.description || "",
        date: item.date,
      })
    );

    item.images.forEach((image, index) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    const url = galleryItem
      ? `http://localhost:8080/api/galleries/${galleryItem.id}`
      : `http://localhost:8080/api/galleries`;

    const method = galleryItem ? "PUT" : "POST";

    try {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          const updatedGallery = JSON.parse(xhr.responseText);
          onSave(updatedGallery);
          onClose();
        } else {
          setError(`Failed to ${galleryItem ? "edit" : "add"} gallery`);
        }
        setUploadProgress(null);
      };

      xhr.onerror = () => {
        setError(`Failed to ${galleryItem ? "edit" : "add"} gallery. Please try again.`);
        setUploadProgress(null);
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error saving gallery:", error);
      setError(`Failed to ${galleryItem ? "edit" : "add"} gallery. Please try again.`);
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
    saveGallery();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
        <h5 className="text-xl font-bold text-gray-700 mb-4">
          {galleryItem ? "Edit Gallery Item" : "Add Gallery Item"}
        </h5>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            name="event"
            value={item.event}
            onChange={handleChange}
            placeholder="Event Name *"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="date"
            value={item.date}
            onChange={handleChange}
            placeholder="Date *"
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <div className="space-y-4">
            <label className="text-gray-700 font-medium">Upload Images:</label>
            {item.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-4">
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
                    className="w-16 h-16 object-cover rounded shadow"
                  />
                ) : (
                  <img
                    src={image.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-16 h-16 object-cover rounded shadow"
                  />
                )}
                <button
                  onClick={() => removeImageField(index)}
                  className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addImageField}
              className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
            >
              Add Image
            </button>
          </div>
        </div>

        {uploadProgress !== null && (
          <div className="mt-4">
            <p>Uploading: {uploadProgress}%</p>
            <div className="w-full bg-gray-300 h-2 rounded">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditGalleryModal;