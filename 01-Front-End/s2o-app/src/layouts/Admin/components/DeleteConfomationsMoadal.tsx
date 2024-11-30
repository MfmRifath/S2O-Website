import React, { useState } from "react";

interface DeleteConfirmationModalProps {
  galleryId: number;
  onDeleteSuccess: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ galleryId, onDeleteSuccess, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true); // Show loading spinner
    try {
      const response = await fetch(
        `http://localhost:8080/api/galleries/${galleryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false); // Hide loading spinner
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 font-medium text-white rounded flex items-center justify-center ${
              isDeleting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 transition"
            }`}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;