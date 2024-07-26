import React, { useEffect, useRef, useState } from "react";
import "./Administration.css"; // Import the CSS file
import AdminitrationModal from "../../../Model/AdminitrationModal";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import YearModal from "../../../Model/YearModal";

export const Administration = () => {
  const teamRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedYear, setSelectedYear] = useState<any | null>(null);

  const isInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom >= 0 &&
      rect.left < window.innerWidth &&
      rect.right >= 0
    );
  };

  const handleScroll = () => {
    teamRefs.current.forEach((teamItem) => {
      if (teamItem && isInViewport(teamItem)) {
        teamItem.classList.add("animate-slideInUp");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [administrations, setAdminitration] = useState<AdminitrationModal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [years, setYears] = useState<YearModal[]>([]);

  useEffect(() => {
    const fetchAdministration = async () => {
      setIsLoading(true);
      setHttpError(null);
      const baseUrl: string = `http://localhost:8080/api/administrations/all`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();

        const loadedadministration: AdminitrationModal[] = responseJson.map((administration: any) => ({
          adminId: administration.adminId,
          designation: administration.designation,
          adminName: administration.adminName,
          adminQualification: administration.adminQualification,
          insta: administration.insta,
          LinkedIn: administration.likedIn,
          email: administration.email,
          year: administration.year,
          adminImg: administration.adminImg
        }));

        setAdminitration(loadedadministration);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdministration();
  }, []);

  useEffect(() => {
    const fetchYears = async () => {
      setIsLoading(true);
      setHttpError(null);

      const baseUrl: string = `http://localhost:8080/api/years`;

      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();

        const loadedYears: YearModal[] = responseJson.map((year: any) => ({
          yearId: year.yearId,
          yearValue: year.yearValue
        }));

        // Filter years based on the available administrations
        const filteredYears = loadedYears.filter(year => 
          administrations.some(admin => admin.year.yearValue === year.yearValue)
        );

        setYears(filteredYears);
        setSelectedYear(filteredYears.length > 0 ? filteredYears[0].yearValue : 0);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchYears();
  }, [administrations]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container-xxl py-5">
      <div >
        <div
          id="carouselExampleControls"
          className="carousel carousel-dark slide mt-5 d-none d-lg-block"
          data-bs-interval="false"
        >
          <div className="carousel-inner align">
            {years.map((year, yearIndex) => (
              <div
                className={`carousel-item ${year.yearValue === selectedYear ? "active" : ""}`}
                key={year.yearId}
              >
                <div className="row d-flex justify-content-center align-items-center">
                  <h1 className="mb-3">
                    <b>S2O Administration - {year.yearValue}</b>
                  </h1>
                  <p>
                    Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
                  </p>
                </div>
                <div className="row g-4">
                  {administrations
                    .filter(admin => admin.year.yearValue === year.yearValue)
                    .map((admin, adminIndex) => (
                      <div className="col-lg-3 col-md-6 " key={admin.adminId}>
                        <div
                          className="team-item rounded overflow-hidden shadow-sm"
                          ref={(el) => (teamRefs.current[adminIndex] = el)}
                        >
                          <div className="position-relative">
                            <img
                              className="img-fluid"
                              src={admin.adminImg || require("./../../../Images/logo.jpg")}
                              alt={admin.adminName || "Team Member"}
                              onError={(e) => {
                                e.currentTarget.src = require("./../../../Images/logo.jpg");
                              }}
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
          <button
            className="carousel-control-prev btn1"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
            onClick={() => {
              const currentIndex = years.findIndex(year => year.yearValue === selectedYear);
              const prevIndex = (currentIndex - 1 + years.length) % years.length;
              setSelectedYear(years[prevIndex].yearValue);
            }}
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
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
            onClick={() => {
              const currentIndex = years.findIndex(year => year.yearValue === selectedYear);
              const nextIndex = (currentIndex + 1) % years.length;
              setSelectedYear(years[nextIndex].yearValue);
            }}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/*Mobile*/}
      <div className="d-lg-none mt-3 container">
        {years.map((year) => (
          <div key={year.yearId}>
            <div className="row d-flex justify-content-center align-items-center">
              <h1 className="mb-3">
                <b>S2O Administration - {year.yearValue}</b>
              </h1>
              <p>
                Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
              </p>
            </div>
            <div className="row g-4">
              {administrations
                .filter(admin => admin.year.yearValue === year.yearValue)
                .map((admin, adminIndex) => (
                  <div className="col-lg-3 col-md-6" key={admin.adminId}>
                    <div
                      className="team-item rounded overflow-hidden shadow-sm"
                      ref={(el) => (teamRefs.current[adminIndex] = el)}
                    >
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src={admin.adminImg || require("./../../../Images/logo.jpg")}
                          alt={admin.adminName || "Team Member"}
                          onError={(e) => {
                            e.currentTarget.src = require("./../../../Images/logo.jpg");
                          }}
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
