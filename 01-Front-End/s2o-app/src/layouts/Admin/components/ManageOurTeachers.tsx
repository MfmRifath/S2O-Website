import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit, FaImage } from "react-icons/fa";

const ManageOurTeacher = () => {
  const [teachers, setTeachers] = useState<{ id: number; name: string; subject: string; teacherQualification: string; imageUrl: string | null }[]>([]);
  const [teacherToEdit, setTeacherToEdit] = useState<{ id: number; name: string; subject: string; teacherQualification: string; imageUrl: string | null } | null>(null);
  const [teacherForm, setTeacherForm] = useState<{
    teacherName: string;
    teacherSubject: string;
    teacherQualification: string;
    image: File | null;
  }>({
    teacherName: "",
    teacherSubject: "",
    teacherQualification: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ourTeachers");
      const formattedTeachers = response.data.map((teacher: any) => ({
        id: teacher.id,
        name: teacher.teacherName,
        subject: teacher.teacherSubject,
        qualifications: teacher.teacherQualifications || 'N/A',
        bio: teacher.bio || 'No bio available',
        imageUrl: teacher.imageUrl || null,
      }));
      setTeachers(formattedTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTeacherForm({
      ...teacherForm,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherForm({
      ...teacherForm,
      image: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleAddTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("teacher", JSON.stringify(teacherForm));
    if (teacherForm.image) {
      formData.append("image", teacherForm.image);
    }

    try {
      await axios.post("http://localhost:8080/api/ourTeachers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchTeachers();
      setTeacherForm({ teacherName: "", teacherSubject: "", teacherQualification: "", image: null });
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleEditTeacher = (teacher: { id: number; name: string; subject: string; teacherQualification: string; imageUrl: string | null }) => {
    setTeacherToEdit(teacher);
    setTeacherForm({
      teacherName: teacher.name,
      teacherSubject: teacher.subject,
      teacherQualification: teacher.teacherQualification,
      image: null,
    });
    setIsEditing(true);
  };

  const handleUpdateTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (teacherToEdit) {
      const formData = new FormData();
      formData.append("teacher", JSON.stringify(teacherForm));
      if (teacherForm.image) {
        formData.append("image", teacherForm.image);
      }

      try {
        await axios.put(`http://localhost:8080/api/ourTeachers/${teacherToEdit.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fetchTeachers();
        setIsEditing(false);
        setTeacherToEdit(null);
        setTeacherForm({ teacherName: "", teacherSubject: "", teacherQualification: "", image: null });
      } catch (error) {
        console.error("Error updating teacher:", error);
      }
    }
  };

  const handleDeleteTeacher = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(`http://localhost:8080/api/ourTeachers/${id}`);
        fetchTeachers();
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Manage Teachers</h1>

      {/* Add or Edit Teacher Form */}
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">{isEditing ? "Edit Teacher" : "Add New Teacher"}</h2>
        <form onSubmit={isEditing ? handleUpdateTeacher : handleAddTeacher} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="teacherName"
              value={teacherForm.teacherName}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Subject</label>
            <input
              type="text"
              name="teacherSubject"
              value={teacherForm.teacherSubject}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Qualifications</label>
            <input
              type="text"
              name="teacherQualification"
              value={teacherForm.teacherQualification}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {teacherForm.image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(teacherForm.image)}
                  alt="Selected Image"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md mt-4 w-full hover:bg-blue-700 transition duration-300"
          >
            {isEditing ? "Update Teacher" : "Add Teacher"}
          </button>
        </form>
      </div>

      {/* Teachers Table */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Teachers</h2>
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b text-left text-gray-600">Name</th>
              <th className="py-3 px-6 border-b text-left text-gray-600">Subject</th>
              <th className="py-3 px-6 border-b text-left text-gray-600">Qualifications</th>
              <th className="py-3 px-6 border-b text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 border-b">{teacher.name}</td>
                  <td className="py-3 px-6 border-b">{teacher.subject}</td>
                  <td className="py-3 px-6 border-b">{teacher.teacherQualification}</td>
                  <td className="py-3 px-6 border-b flex items-center">
                    {teacher.imageUrl && (
                      <img
                        src={teacher.imageUrl}
                        alt="Teacher"
                        className="w-16 h-16 object-cover rounded-full mr-4"
                      />
                    )}
                    <button
                      onClick={() => handleEditTeacher(teacher)}
                      className="text-blue-600 mr-3 hover:text-blue-800 flex items-center"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher.id)}
                      className="text-red-600 hover:text-red-800 flex items-center"
                    >
                      <FaTrashAlt className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-3 px-6 border-b text-center text-gray-600">
                  No teachers available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOurTeacher;