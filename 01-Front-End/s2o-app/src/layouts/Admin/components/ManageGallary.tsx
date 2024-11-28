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

  const handleAddGallery = () => {
    setEditGalleryItem(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditGallery = (galleryItem: GalleryImageModel) => {
    setEditGalleryItem(galleryItem);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteGallery = (galleryItem: GalleryImageModel) => {
    setDeleteGalleryItem(galleryItem);
    setIsDeleteModalOpen(true);
  };

  const handleSaveGallery = (updatedGallery: GalleryImageModel) => {
    if (editGalleryItem) {
      setGalleryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedGallery.id ? updatedGallery : item
        )
      );
    } else {
      setGalleryItems((prevItems) => [...prevItems, updatedGallery]);
    }
    setIsAddEditModalOpen(false);
  };

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
    <div className="container mx-auto p-6">
      <h4 className="text-2xl font-bold text-gray-700 mb-6">Manage Gallery</h4>
      <button
        onClick={handleAddGallery}
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-all mb-4"
      >
        Add Gallery Item
      </button>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Event", "Date", "Description", "Images", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-300"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {galleryItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-gray-300">{item.id}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.event}</td>
                <td className="px-4 py-2 border-b border-gray-300">{item.date}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {item.description}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <div className="flex flex-wrap gap-2">
                    {(item.images || []).map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Gallery image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded shadow"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    onClick={() => handleEditGallery(item)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition-all mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGallery(item)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddEditModalOpen && (
        <AddEditGalleryModal
          galleryItem={editGalleryItem}
          onSave={handleSaveGallery}
          onClose={() => setIsAddEditModalOpen(false)}
        />
      )}

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