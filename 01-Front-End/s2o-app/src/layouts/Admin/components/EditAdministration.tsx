import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Image {
  url: string;
  keyName: string;
}

interface AdministrationModal {
  adminId: number;
  designation: string;
  adminName: string;
  adminQualification: string;
  insta: string;
  linkedIn: string;
  email: string;
  year: number;
  adminImg?: Image;
}

export const EditAdministration: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("Received Admin ID from URL:", id); // Debugging: Check if id is retrieved correctly

  const [designation, setDesignation] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminQualification, setAdminQualification] = useState("");
  const [insta, setInsta] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  useEffect(() => {
    if (!id) {
      setHttpError("No administration ID provided in URL.");
      return;
    }

    const fetchAdmin = async () => {
      setIsLoading(true);
      setHttpError(null);

      try {
        const response = await fetch(
          `http://localhost:8080/api/administrations/${id}`
        );
        if (!response.ok) throw new Error("Something went wrong!");

        const admin = await response.json();
        setDesignation(admin.designation || "");
        setAdminName(admin.adminName || "");
        setAdminQualification(admin.adminQualification || "");
        setInsta(admin.insta || "");
        setLinkedIn(admin.linkedIn || "");
        setEmail(admin.email || "");
        setYear(admin.year || null);
      } catch (error: any) {
        setHttpError(error.message);
      }
      setIsLoading(false);
    };

    fetchAdmin();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file || null);
  };

  const validateFields = () => {
    return (
      designation &&
      adminName &&
      adminQualification &&
      insta &&
      linkedIn &&
      email &&
      year !== null
    );
  };

  const submitAdminMember = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      setDisplayWarning(true);
      return;
    }

    const formData = new FormData();
    formData.append(
      "administration",
      JSON.stringify({
        designation,
        adminName,
        adminQualification,
        insta,
        linkedIn,
        email,
        year,
      })
    );

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/administrations/edit/admin-member/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Failed to update admin member: ${responseText}`);
      }

      setDisplaySuccess(true);
      setDisplayWarning(false);

      // Hide success message after a short period
      setTimeout(() => setDisplaySuccess(false), 3000);
    } catch (error: any) {
      console.error("Error submitting admin member:", error);
      setHttpError(error.message);
      setDisplaySuccess(false);
      setDisplayWarning(true);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Admin updated successfully.
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
        <div className="card-header">Edit Administration Member</div>
        <div className="card-body">
          {isLoading && <p>Loading...</p>}
          {!isLoading && !httpError && (
            <form onSubmit={submitAdminMember}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setDesignation(e.target.value)}
                    value={designation}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setAdminName(e.target.value)}
                    value={adminName}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setAdminQualification(e.target.value)}
                    value={adminQualification}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Instagram Link</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setInsta(e.target.value)}
                    value={insta}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">LinkedIn Link</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setLinkedIn(e.target.value)}
                    value={linkedIn}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Year</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={(e) => setYear(parseInt(e.target.value) || 0)}
                    value={year || ""}
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
                Update Administration Member
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditAdministration;
