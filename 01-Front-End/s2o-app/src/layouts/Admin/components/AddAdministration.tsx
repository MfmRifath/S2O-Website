import React, { useState } from "react";
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
  LinkedIn: string;
  email: string;
  year: number;
  adminImages?: Image;
}

export const AddEditAdministration: React.FC = () => {
  const [formData, setFormData] = useState<AdministrationModal>({
    designation: "",
    adminName: "",
    adminQualification: "",
    insta: "",
    LinkedIn: "",
    email: "",
    year: new Date().getFullYear(),
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Updated field ${name}:`, value); // Debugging log
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file || null);
  };

  const resetFormFields = () => {
    setFormData({
      designation: "",
      adminName: "",
      adminQualification: "",
      insta: "",
      LinkedIn: "",
      email: "",
      year: new Date().getFullYear(),
    });
    setSelectedImage(null);
  };

  const submitAdminMember = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = formData.id
      ? `http://localhost:8080/api/administrations/edit/admin-member/${formData.id}`
      : `http://localhost:8080/api/administrations/add/admin-member`;

    if (
      formData.designation &&
      formData.adminName &&
      formData.adminQualification &&
      formData.insta &&
      formData.LinkedIn &&
      formData.email &&
      formData.year &&
      selectedImage
    ) {
      const data = new FormData();
      data.append("administration", JSON.stringify(formData));
      data.append("image", selectedImage);

      try {
        const response = await axios({
          method: formData.id ? "put" : "post",
          url,
          data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200 || response.status === 201) {
          resetFormFields();
          setDisplaySuccess(true);
        } else {
          throw new Error("Failed to add/update administration member");
        }
      } catch (error) {
        // Log the error response from Axios for better debugging
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
        } else {
          console.error("Error submitting administration member:", error);
        }
        setDisplayWarning(true);
      }
    } else {
      setDisplayWarning(true);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Admin added/updated successfully.
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out.
        </div>
      )}
      <div className="card">
        <div className="card-header">
          {formData.id
            ? "Edit Administration Member"
            : "Add Administration Member"}
        </div>
        <div className="card-body">
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
                  name="LinkedIn"
                  className="form-control"
                  required
                  onChange={handleInputChange}
                  value={formData.LinkedIn}
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
              {formData.id
                ? "Update Administration Member"
                : "Add Administration Member"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export component
export default AddEditAdministration;
