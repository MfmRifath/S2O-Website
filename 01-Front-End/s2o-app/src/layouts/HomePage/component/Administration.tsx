import React, { useEffect, useState } from "react";
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
  LinkedIn: string;
  email: string;
  year: number;
  adminImage: Image | null; // Allow for null values
}

export const Administration = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [administrations, setAdministrations] = useState<AdministrationModal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  const uniqueYears = Array.from(new Set(administrations.map((admin) => admin.year)));

  useEffect(() => {
    if (uniqueYears.length > 0 && selectedYear === null) {
      setSelectedYear(uniqueYears[0]);
    }
  }, [uniqueYears]);

  useEffect(() => {
    const fetchAdministration = async () => {
      setIsLoading(true);
      setHttpError(null);
      try {
        const response = await axios.get<AdministrationModal[]>(
          "http://localhost:8080/api/administrations/all"
        );
        setAdministrations(response.data);
      } catch (error) {
        setHttpError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdministration();
  }, []);

  if (isLoading)
    return <div className="spinner mx-auto mt-6 text-center">Loading...</div>;

  if (httpError)
    return (
      <div className="container m-5 text-center">
        <p>{httpError}</p>
      </div>
    );

  return (
    <div className="py-4 bg-gradient-to-br from-blue-50 to-teal-100 min-h-screen flex flex-col">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">S2O Administration</h1>
        <p className="text-gray-600 mt-2 text-xs">Meet our exceptional leaders who drive our vision forward.</p>
      </div>

      {/* Year Navigation */}
      <div className="flex justify-center items-center mb-6 space-x-2">
        <button
          className="p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-full shadow-lg transition-all"
          onClick={() => {
            const currentIndex = uniqueYears.findIndex((year) => year === selectedYear);
            const prevIndex = (currentIndex - 1 + uniqueYears.length) % uniqueYears.length;
            setSelectedYear(uniqueYears[prevIndex]);
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <span className="text-lg font-semibold text-gray-800">{selectedYear}</span>
        <button
          className="p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-full shadow-lg transition-all"
          onClick={() => {
            const currentIndex = uniqueYears.findIndex((year) => year === selectedYear);
            const nextIndex = (currentIndex + 1) % uniqueYears.length;
            setSelectedYear(uniqueYears[nextIndex]);
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-12 flex-grow">
        {administrations
          .filter((admin) => admin.year === selectedYear)
          .map((admin) => (
            <div
              key={admin.id}
              className="relative group bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-md p-4 lg:p-6 transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              {/* Decorative Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-blue-300 to-blue-200 opacity-10 rounded-2xl z-0"></div>

              {/* Image and Name in Same Row */}
              <div className="relative z-10 flex items-center justify-start space-x-3">
                {/* Profile Image */}
                <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                  <img
                    src={admin.adminImage?.url || require("./../../../Images/logo.jpg")}
                    alt={admin.adminName || "Team Member"}
                    onError={(e) => (e.currentTarget.src = require("./../../../Images/logo.jpg"))}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name and Designation */}
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-semibold text-gray-800">{admin.adminName}</h3>
                  <p className="text-gray-500 text-xs">{admin.adminQualification}</p>
                  <hr className="my-2 border-gray-300" />
                  <p className="text-gray-500 text-xs">{admin.designation}</p>
                </div>
              </div>

              {/* Social Media Buttons Below Name and Designation */}
              <div className="mt-2 flex justify-center space-x-2">
                <a
                  className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full shadow-md transition-all hover:shadow-lg hover:scale-110 focus:ring-4 focus:ring-blue-400 text-xs"
                  href={`mailto:${admin.email}`}
                  aria-label="Email"
                >
                  <i className="fas fa-envelope group-hover:rotate-12 transition-transform"></i>
                </a>
                <a
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-md transition-all hover:shadow-lg hover:scale-110 focus:ring-4 focus:ring-purple-400 text-xs"
                  href={admin.LinkedIn}
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin group-hover:rotate-12 transition-transform"></i>
                </a>
                <a
                  className="p-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full shadow-md transition-all hover:shadow-lg hover:scale-110 focus:ring-4 focus:ring-orange-400 text-xs"
                  href={admin.insta}
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram group-hover:rotate-12 transition-transform"></i>
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};