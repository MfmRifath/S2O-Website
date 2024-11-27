import React, { useEffect, useState } from "react";
import GalleryImageModel from "../../../Model/GalleryImageModel";
import AddEditGalleryModal from "./AddGallryModal";
import { DeleteConfirmationModal } from "./DeleteConfomationsMoadal";

export const ManageGallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryImageModel[]>([]);
  const [editGalleryItem, setEditGalleryItem] =
    useState<GalleryImageModel | null>(null);
  const [deleteGalleryItem, setDeleteGalleryItem] =
    useState<GalleryImageModel | null>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch galleries on mount
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/galleries");
        if (!response.ok) throw new Error("Failed to fetch gallery items.");

        const galleriesJson: GalleryImageModel[] = await response.json();
        setGalleryItems(galleriesJson);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    };

    fetchGalleries();
  }, []);

  // Add a new gallery
  const handleAddGallery = () => {
    setEditGalleryItem(null);
    setIsAddEditModalOpen(true);
  };

  // Edit an existing gallery
  const handleEditGallery = (galleryItem: GalleryImageModel) => {
    setEditGalleryItem(galleryItem);
    setIsAddEditModalOpen(true);
  };

  // Delete a gallery
  const handleDeleteGallery = (galleryItem: GalleryImageModel) => {
    setDeleteGalleryItem(galleryItem);
    setIsDeleteModalOpen(true);
  };

  // Save gallery changes
  const handleSaveGallery = (updatedGallery: GalleryImageModel) => {
    if (editGalleryItem) {
      // Update existing item
      setGalleryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedGallery.id ? updatedGallery : item
        )
      );
    } else {
      // Add new item
      setGalleryItems((prevItems) => [...prevItems, updatedGallery]);
    }
    setIsAddEditModalOpen(false);
  };

  // Confirm gallery deletion
  const handleConfirmDelete = async () => {
    if (deleteGalleryItem) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/galleries/${deleteGalleryItem.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete gallery item");

        setGalleryItems((prevItems) =>
          prevItems.filter((item) => item.id !== deleteGalleryItem.id)
        );
      } catch (error) {
        console.error("Error deleting gallery item:", error);
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  return (
    <div>
      <h4>Manage Gallery</h4>
      <button onClick={handleAddGallery} className="btn btn-primary mb-3">
        Add Gallery Item
      </button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Date</th>
            <th>Description</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {galleryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.event}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>
                <div className="image-thumbnails">
                  {(item.images || []).map((image, index) => (
                    <img
                    key={index}
                    src={image.url} // Use the URL for the image
                    alt={`Gallery image ${index + 1}`}
                    className="thumbnail"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }} // Define size and maintain aspect ratio
                  />
                  ))}
                </div>
              </td>
              <td>
                <button
                  onClick={() => handleEditGallery(item)}
                  className="btn btn-warning mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteGallery(item)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {isAddEditModalOpen && (
        <AddEditGalleryModal
          galleryItem={editGalleryItem}
          onSave={handleSaveGallery}
          onClose={() => setIsAddEditModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && deleteGalleryItem && (
        <DeleteConfirmationModal
          galleryId={deleteGalleryItem.id}
          onDeleteSuccess={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ManageGallery;