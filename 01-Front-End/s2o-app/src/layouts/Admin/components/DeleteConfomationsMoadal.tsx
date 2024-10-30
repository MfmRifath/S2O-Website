import React from "react";
import "./DeleteConfirmationModal.css";

interface DeleteConfirmationModalProps {
  galleryId: number;
  onDeleteSuccess: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ galleryId, onDeleteSuccess, onCancel }) => {
  const handleDelete = async () => {
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
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="modal-buttons">
          <button className="btn-delete" onClick={handleDelete}>
            Yes, Delete
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
