import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  linkedin: string;
  email: string;
  year: number;
  adminImage: Image;
}

export const AdministrationTable: React.FC = () => {
  const [administrations, setAdministrations] = useState<AdministrationModal[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const navigate = useNavigate();
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
          adminId: admin.id,
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

  const handleEdit = (id: number) => navigate(`/edit-admin/${id}`);

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return administrations.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderPagination = () => {
    const pageCount = Math.ceil(administrations.length / itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => (
      <button
        key={i + 1}
        className={`px-4 py-2 mx-1 rounded-lg ${
          i + 1 === currentPage
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Administration Members
      </h2>
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {httpError && (
        <p className="text-center text-red-500">{httpError}</p>
      )}
      {!isLoading && administrations.length === 0 && (
        <p className="text-center text-gray-500">No records found.</p>
      )}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {[
                "ID",
                "Designation",
                "Name",
                "Qualification",
                "Instagram",
                "LinkedIn",
                "Email",
                "Year",
                "Image",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              getPageData().map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {admin.id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {admin.designation}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {admin.adminName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {admin.adminQualification}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <a
                      href={admin.insta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      Instagram
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <a
                      href={admin.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {admin.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {admin.year}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <img
                      src={
                        admin.adminImage?.url || "/path/to/default-image.jpg"
                      }
                      alt={admin.adminName || "No Image Available"}
                      className="w-16 h-16 rounded-lg object-cover shadow"
                      onError={(e) =>
                        (e.currentTarget.src = "/path/to/fallback-image.jpg")
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all mr-2"
                      onClick={() => handleEdit(admin.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
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
      <div className="flex justify-center mt-4 space-x-2">{renderPagination()}</div>
    </div>
  );
};

export default AdministrationTable;