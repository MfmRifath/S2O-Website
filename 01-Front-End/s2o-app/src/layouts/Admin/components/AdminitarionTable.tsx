import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AdministrationTable.css";

interface Image {
  url: string;
  keyName: string;
}

interface AdministrationModal {
  id: number;
  designation: string;
  adminName: string;
  adminQualification: string;
  insta: string;
  LinkedIn: string;
  email: string;
  year: number;
  adminImages: Image;
}

export const AdministrationTable: React.FC = () => {
  const [administrations, setAdministrations] = useState<AdministrationModal[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const history = useHistory();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAdministration = async () => {
      setIsLoading(true);
      setHttpError(null);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/administrations/all"
        );
        const dataWithAdminId = response.data.map((admin: any) => ({
          ...admin,
          adminId: admin.id, // Map `id` to `adminId`
        }));
        setAdministrations(dataWithAdminId);
      } catch (error: any) {
        setHttpError("An error occurred while fetching administrations.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdministration();
  }, []);

  // Delete an administration member by ID using Axios
  const deleteAdminMember = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/administrations/delete/admin-member/${id}`
      );
      setAdministrations(administrations.filter((admin) => admin.id !== id));
    } catch (error) {
      alert("Failed to delete the administration member.");
    }
  };

  // Navigate to edit page for a specific admin member
  const handleEdit = (id: number) => history.push(`/edit-admin/${id}`);

  // Pagination: Get data for the current page
  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return administrations.slice(startIndex, startIndex + itemsPerPage);
  };

  // Render pagination buttons
  const renderPagination = () => {
    const pageCount = Math.ceil(administrations.length / itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => (
      <button
        key={i + 1}
        className={`btn ${i + 1 === currentPage ? "btn-primary" : "btn-light"}`}
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div className="container mt-5 mb-5">
      <h2>Administration Members</h2>
      {isLoading && <p>Loading...</p>}
      {httpError && <p>{httpError}</p>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Designation</th>
              <th>Name</th>
              <th>Qualification</th>
              <th>Instagram</th>
              <th>LinkedIn</th>
              <th>Email</th>
              <th>Year</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              getPageData().map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.designation}</td>
                  <td>{admin.adminName}</td>
                  <td>{admin.adminQualification}</td>
                  <td>
                    <a
                      href={admin.insta}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </td>
                  <td>
                    <a
                      href={admin.LinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td>{admin.email}</td>
                  <td>{admin.year}</td>
                  <td>
                    <img
                      src={
                        admin.adminImages.url || "/path/to/default-image.jpg"
                      }
                      alt={admin.adminName}
                      className="img-thumbnail"
                      onError={(e) =>
                        (e.currentTarget.src = "/path/to/fallback-image.jpg")
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => handleEdit(admin.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAdminMember(admin.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-buttons">{renderPagination()}</div>
    </div>
  );
};

export default AdministrationTable;
