import React, { useEffect, useState } from 'react';
// Import API functions
import { SubjectDTO } from '../types/SubjectDTO';
import axios from 'axios';
const API_URL = 'http://localhost:8080/api/subjects'; // Update this URL to match your backend
const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newSubject, setNewSubject] = useState<SubjectDTO>({
    id: 0,
    name: '',
    stream: '',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const getAllSubjects = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  };
  const createSubject = async (subject: SubjectDTO) => {
    try {
      const response = await axios.post(API_URL, subject);
      return response.data;
    } catch (error) {
      console.error('Error creating subject:', error);
      throw error;
    }
  };
  const updateSubject = async (id: number, subject: SubjectDTO) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, subject);
      return response.data;
    } catch (error) {
      console.error('Error updating subject:', error);
      throw error;
    }
  };
  const deleteSubject = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting subject:', error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getAllSubjects();
        setSubjects(data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleCreateOrUpdateSubject = async () => {
    if (!newSubject.name || !newSubject.stream) {
      alert('Please fill all fields!');
      return;
    }

    try {
      if (editMode) {
        const updated = await updateSubject(newSubject.id, newSubject);
        setSubjects(subjects.map((subject) => (subject.id === updated.id ? updated : subject)));
        setEditMode(false);
      } else {
        const created = await createSubject(newSubject);
        setSubjects([...subjects, created]);
      }

      setNewSubject({ id: 0, name: '', stream: '' });
    } catch (error) {
      alert('Failed to save subject!');
    }
  };

  const handleEditSubject = (subject: SubjectDTO) => {
    setNewSubject(subject);
    setEditMode(true);
  };

  const handleDeleteSubject = async (id: number) => {
    try {
      await deleteSubject(id);
      setSubjects(subjects.filter((subject) => subject.id !== id));
    } catch (error) {
      alert('Failed to delete subject!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Subject Management</h1>

      {/* Add/Edit Subject Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">{editMode ? 'Edit Subject' : 'Add New Subject'}</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Stream"
            value={newSubject.stream}
            onChange={(e) => setNewSubject({ ...newSubject, stream: e.target.value })}
            className="border rounded-lg p-2"
          />
          <button
            onClick={handleCreateOrUpdateSubject}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            {editMode ? 'Update Subject' : 'Add Subject'}
          </button>
        </div>
      </div>

      {/* Subjects List */}
      <h2 className="text-lg font-semibold mb-2">Subjects List</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Stream</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{subject.id}</td>
              <td className="border border-gray-300 px-4 py-2">{subject.name}</td>
              <td className="border border-gray-300 px-4 py-2">{subject.stream}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleEditSubject(subject)}
                  className="bg-yellow-500 text-white rounded-lg px-4 py-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSubject(subject.id)}
                  className="bg-red-500 text-white rounded-lg px-4 py-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectManagement;