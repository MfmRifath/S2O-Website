import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import axios from "axios"; // Import axios for making HTTP requests

interface Teacher {
  id: number;
  name: string;
  subject: string;
  image?: string;  // Optional image field
}

const AcademyHome: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]); // State to store the teachers' data

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Fetch teachers from the API
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ourTeachers");
      const teacherData = response.data.map((teacher: any) => ({
        id: teacher.id,
        name: teacher.teacherName,
        subject: teacher.teacherSubject,
        image: teacher.imageUrl || "./default-image.jpg", // Fallback to default image if none
      }));
      setTeachers(teacherData); // Set the teacher data to state
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Use useEffect to fetch teachers when the component mounts
  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="flex flex-col mt-20 min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex">
        {isSidebarVisible && <Sidebar />}
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 mt-10">
          {/* Welcome Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Welcome to <span className="text-yellow-500">S2O Academy</span>
            </h1>
            <p className="text-gray-600 text-lg mt-6">
              Your journey to excellence starts here. Explore the best resources, results, and more.
            </p>
          </section>

          {/* Our Teachers Section */}
          <section id="teachers" className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Our Teachers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
                  >
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {teacher.name}
                      </h3>
                      <p className="text-gray-600 mt-2">{teacher.subject}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No teachers available at the moment.</p>
              )}
            </div>
          </section>

          {/* Best Results Section */}
          <section id="results" className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Our Best Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder for dynamic results */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">Result 1</h3>
                <p className="text-gray-600 mt-2">Details about the first result...</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">Result 2</h3>
                <p className="text-gray-600 mt-2">Details about the second result...</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">Result 3</h3>
                <p className="text-gray-600 mt-2">Details about the third result...</p>
              </div>
            </div>
          </section>

          {/* Contact Us Section */}
          <section id="contact" className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Contact Us
            </h2>
            <p className="text-gray-600">
              <span className="font-semibold">Address:</span> 123 Academy Street, City, Country
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span> +123-456-7890
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> info@s2oacademy.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AcademyHome;