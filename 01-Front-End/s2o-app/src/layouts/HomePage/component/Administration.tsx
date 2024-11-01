import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Administration.css";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

interface Image {
  url: string;
  keyName: string;
}

interface AdminitrationModal {
  id: number;
  designation: string;
  adminName: string;
  adminQualification: string;
  insta: string;
  LinkedIn: string;
  email: string;
  year: number;
  adminImages: Image;
}

export const Administration = () => {
  const teamRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [administrations, setAdministrations] = useState<AdminitrationModal[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  const uniqueYears = Array.from(
    new Set(administrations.map((admin) => admin.year))
  );

  // Check if an element is in the viewport
  const isInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  };

  // Apply animation on scroll
  const handleScroll = () => {
    teamRefs.current.forEach((teamItem) => {
      if (teamItem && isInViewport(teamItem)) {
        teamItem.classList.add("animate-slideInUp");
      }
    });
  };

  // Add scroll event listener for animations
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Set the initial selectedYear to the first year in uniqueYears after data loads
  useEffect(() => {
    if (uniqueYears.length > 0 && selectedYear === null) {
      setSelectedYear(uniqueYears[0]);
    }
  }, [uniqueYears]);

  // Fetch administrations using axios
  useEffect(() => {
    const fetchAdministration = async () => {
      setIsLoading(true);
      setHttpError(null);
      try {
        const response = await axios.get<AdminitrationModal[]>(
          "http://localhost:8080/api/administrations/all"
        );
        setAdministrations(response.data);
      } catch (error) {
        setHttpError(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdministration();
  }, []);

  // Loading and error states
  if (isLoading) return <SpinnerLoading />;
  if (httpError)
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );

  // Carousel navigation handlers
  const handlePreviousYear = () => {
    const currentIndex = uniqueYears.findIndex((year) => year === selectedYear);
    const prevIndex =
      (currentIndex - 1 + uniqueYears.length) % uniqueYears.length;
    setSelectedYear(uniqueYears[prevIndex]);
  };

  const handleNextYear = () => {
    const currentIndex = uniqueYears.findIndex((year) => year === selectedYear);
    const nextIndex = (currentIndex + 1) % uniqueYears.length;
    setSelectedYear(uniqueYears[nextIndex]);
  };

  return (
    <div className="container py-5">
      <div>
        {/* Desktop Carousel */}
        <div
          id="carouselExampleControls"
          className="carousel carousel-dark slide mt-5 d-none d-lg-block"
          data-bs-interval="false"
        >
          <div className="carousel-inner align">
            {uniqueYears.map((year) => (
              <div
                key={year}
                className={`carousel-item ${
                  year === selectedYear ? "active" : ""
                }`}
              >
                <div className="row d-flex justify-content-center align-items-center">
                  <h1 className="mb-3 text-center text-white">
                    <b>S2O Administration - {year}</b>
                  </h1>
                  <p className="text-white">
                    Sample text describing the S2O administration for the
                    selected year.
                  </p>
                </div>
                <div className="row g-4">
                  {administrations
                    .filter((admin) => admin.year === year)
                    .map((admin, adminIndex) => (
                      <div className="col-lg-3 col-md-6" key={admin.id}>
                        <div
                          className="team-item rounded overflow-hidden shadow-sm"
                          ref={(el) => (teamRefs.current[adminIndex] = el)}
                        >
                          <div className="position-relative">
                            <img
                              className="img-fluid"
                              src={
                                admin.adminImages.url ||
                                require("./../../../Images/logo.jpg")
                              }
                              alt={admin.adminName || "Team Member"}
                              onError={(e) =>
                                (e.currentTarget.src = require("./../../../Images/logo.jpg"))
                              }
                            />
                            <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                              <a
                                className="btn1 btn-square btn-outline-dark mx-1"
                                href={`mailto:${admin.email}`}
                              >
                                <i className="fas fa-envelope"></i>
                              </a>
                              <a
                                className="btn1 btn-square btn-outline-dark mx-1"
                                href={admin.LinkedIn}
                              >
                                <i className="fab fa-linkedin"></i>
                              </a>
                              <a
                                className="btn1 btn-square btn-outline-dark mx-1"
                                href={admin.insta}
                              >
                                <i className="fab fa-instagram"></i>
                              </a>
                            </div>
                          </div>
                          <div className="text-center p-4 mt-3 text-white">
                            <h5 className="fw-bold mb-0">{admin.adminName}</h5>
                            <small>{admin.designation}</small>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev btn1"
            type="button"
            onClick={handlePreviousYear}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next btn1"
            type="button"
            onClick={handleNextYear}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="d-lg-none mt-3 container">
        {uniqueYears.map((year) => (
          <div key={year}>
            <h1 className="mb-3">
              <b>S2O Administration - {year}</b>
            </h1>
            <p>
              Sample text describing the S2O administration for the selected
              year.
            </p>
            <div className="row g-4">
              {administrations
                .filter((admin) => admin.year === year)
                .map((admin, adminIndex) => (
                  <div className="col-lg-3 col-md-6" key={admin.id}>
                    <div
                      className="team-item rounded overflow-hidden shadow-sm"
                      ref={(el) => (teamRefs.current[adminIndex] = el)}
                    >
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src={
                            admin.adminImages.url ||
                            require("./../../../Images/logo.jpg")
                          }
                          alt={admin.adminName || "Team Member"}
                          onError={(e) =>
                            (e.currentTarget.src = require("./../../../Images/logo.jpg"))
                          }
                        />
                        <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                          <a
                            className="btn1 btn-square btn-outline-dark mx-1"
                            href={`mailto:${admin.email}`}
                          >
                            <i className="fas fa-envelope"></i>
                          </a>
                          <a
                            className="btn1 btn-square btn-outline-dark mx-1"
                            href={admin.LinkedIn}
                          >
                            <i className="fab fa-linkedin"></i>
                          </a>
                          <a
                            className="btn1 btn-square btn-outline-dark mx-1"
                            href={admin.insta}
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        </div>
                      </div>
                      <div className="text-center p-4 mt-3">
                        <h5 className="fw-bold mb-0">{admin.adminName}</h5>
                        <small>{admin.designation}</small>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
