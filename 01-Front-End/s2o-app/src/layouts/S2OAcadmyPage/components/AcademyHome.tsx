import React, { useState } from "react";
import Sidebar from "./sidebar";

const AcademyHome = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Sample data for teachers and results
  const teachers = [
    {
      name: "Teacher Name",
      subject: "Expert in Mathematics",
      image: require("./../../../Images/bg.jpg"),
    },
    {
      name: "Teacher Name",
      subject: "Expert in Science",
      image: require("./../../../Images/bg.jpg"),
    },
  ];

  const results = [
    {
      name: "Student Name",
      achievement: "Top scorer in Mathematics",
      image: require("./../../../Images/bg.jpg"),
    },
    {
      name: "Student Name",
      achievement: "Top scorer in Science",
      image: require("./../../../Images/bg.jpg"),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
              {teachers.map((teacher, index) => (
                <div
                  key={index}
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
              ))}
            </div>
          </section>

          {/* Best Results Section */}
          <section id="results" className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Our Best Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {result.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{result.achievement}</p>
                  </div>
                </div>
              ))}
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