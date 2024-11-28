import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Image {
  url: string;
  keyName: string;
}

interface AdministrationModal {
  id?: number;
  designation: string;
  adminName: string;
  adminQualification: string;
  insta: string;
  linkedIn: string;
  email: string;
  year: number;
  adminImages?: Image;
}

export const AddEditAdministration: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<AdministrationModal>({
    designation: "",
    adminName: "",
    adminQualification: "",
    insta: "",
    linkedIn: "",
    email: "",
    year: new Date().getFullYear(),
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState<string | null>(null);

  // Fetch existing admin data if editing
  useEffect(() => {
    if (id) {
      const fetchAdminData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8080/api/administrations/${id}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching admin data:", error);
          setHttpError("Failed to load admin data.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchAdminData();
    }
  }, [id]);

  const resetFormFields = () => {
    setFormData({
      designation: "",
      adminName: "",
      adminQualification: "",
      insta: "",
      linkedIn: "",
      email: "",
      year: new Date().getFullYear(),
    });
    setSelectedImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitAdminMember = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = id
      ? `http://localhost:8080/api/administrations/edit/${id}`
      : `http://localhost:8080/api/administrations/add`;

    if (
      !formData.designation ||
      !formData.adminName ||
      !formData.adminQualification ||
      !formData.insta ||
      !formData.linkedIn ||
      !formData.email ||
      !formData.year
    ) {
      setDisplayWarning(true);
      return;
    }

    const data = new FormData();
    data.append("administration", JSON.stringify(formData));
    if (selectedImage) {
      data.append("image", selectedImage);
    }

    try {
      const response = await axios({
        method: id ? "put" : "post",
        url,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        resetFormFields();
        setDisplaySuccess(true);
        setDisplayWarning(false);
      } else {
        throw new Error("Failed to add/update administration member");
      }
    } catch (error) {
      console.error("Error submitting administration member:", error);
      setHttpError("Failed to save admin data.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Admin {id ? "updated" : "added"} successfully.
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out.
        </div>
      )}
      {httpError && (
        <div className="alert alert-danger" role="alert">
          {httpError}
        </div>
      )}
      <div className="card">
        <div className="card-header">
          {id ? "Edit Administration Member" : "Add Administration Member"}
        </div>
        <div className="card-body">
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <form onSubmit={submitAdminMember}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                    value={formData.designation}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="adminName"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                    value={formData.adminName}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Qualification</label>
                  <input
                    type="text"
                    name="adminQualification"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                    value={formData.adminQualification}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Instagram Link</label>
                  <input
                    type="text"
                    name="insta"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                    value={formData.insta}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">LinkedIn Link</label>
                  <input
                    type="text"
                    name="linkedIn"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                    value={formData.linkedIn}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Year</label>
                  <input
                    type="number"
                    name="year"
                    className="form-control"
                    required
                    onChange={handleInputChange}
                    value={formData.year}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                {id ? "Update Administration Member" : "Add Administration Member"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Export component
export default AddEditAdministration;