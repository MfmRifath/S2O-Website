import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { ClipLoader } from "react-spinners";

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

const AddEditAdministration: React.FC = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch administration data for editing
  useEffect(() => {
    const fetchAdministration = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await axios.get<AdministrationModal>(
            `http://localhost:8080/api/administrations/${id}`
          );
          console.log("API Response:", response.data);
          setFormData(response.data);

          if (response.data.adminImages?.url) {
            const imageFile = await fetch(response.data.adminImages.url)
              .then((res) => res.blob())
              .then(
                (blob) =>
                  new File([blob], response.data.adminImages?.keyName || "image", {
                    type: blob.type,
                  })
              );
            setSelectedImage(imageFile);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setHttpError("Failed to fetch administration data.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAdministration();
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

    const data = new FormData();
    data.append("administration", JSON.stringify(formData));
    if (selectedImage) {
      data.append("image", selectedImage);
    }

    try {
      setIsLoading(true);
      const response = await axios({
        method: id ? "put" : "post",
        url,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(`Admin ${id ? "updated" : "added"} successfully!`);
        resetFormFields();
      } else {
        throw new Error("Failed to save administration member.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setHttpError("An error occurred while saving admin data.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    },
  });

  return (
    <motion.div
      className="container mx-auto max-w-3xl p-8 bg-gradient-to-br from-green-50 via-white to-gray-100 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {successMessage && (
        <motion.div
          className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-xl shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {successMessage}
        </motion.div>
      )}
      {httpError && (
        <motion.div
          className="mb-6 p-4 bg-red-100 text-red-800 border border-red-300 rounded-xl shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {httpError}
        </motion.div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {id ? "Edit Administration Member" : "Add Administration Member"}
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center my-10">
          <ClipLoader size={50} color="#4caf50" loading={isLoading} />
        </div>
      ) : (
        <motion.form
          onSubmit={submitAdminMember}
          className="space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Designation", name: "designation" },
              { label: "Name", name: "adminName" },
              { label: "Qualification", name: "adminQualification" },
              { label: "Instagram Link", name: "insta" },
              { label: "LinkedIn Link", name: "linkedIn" },
              { label: "Email", name: "email", type: "email" },
              { label: "Year", name: "year", type: "number" },
            ].map((field) => (
              <motion.div
                key={field.name}
                className="flex flex-col"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="text-lg font-semibold text-gray-600 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  className="px-4 py-3 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                  value={(formData as any)[field.name]}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="text-lg font-semibold text-gray-600 mb-2">
                Upload Image
              </label>
              <div
                {...getRootProps()}
                className={`p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
                  isDragActive
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input {...getInputProps()} />
                {selectedImage ? (
                  <p className="text-sm text-gray-600 font-medium">
                    {selectedImage.name}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    Drag & drop an image here, or click to select one
                  </p>
                )}
              </div>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="mt-6 rounded-lg shadow-md w-40 h-40 object-cover mx-auto"
                />
              )}
            </motion.div>
          </div>
          <motion.button
            type="submit"
            className={`mt-8 w-full md:w-auto px-8 py-4 text-white font-bold rounded-lg bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 shadow-lg transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-1"
            }`}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader size={20} color="#fff" />
            ) : id ? (
              "Update Member"
            ) : (
              "Add Member"
            )}
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
};

export default AddEditAdministration;