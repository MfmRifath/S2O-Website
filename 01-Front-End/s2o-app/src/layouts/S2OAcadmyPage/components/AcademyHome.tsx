import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./../components/AcademyHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar";

export const AcademyHome = () => {
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
    <div className="d-flex flex-column min-vh-100">
      {/* Main Content */}
      <div className="flex-grow-1 d-flex content-section">
        {/* Sidebar */}
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />

        {/* Main page content */}
        <div className="content flex-grow-1">
          <main className="d-flex flex-column align-items-center m-5">
            <div className="ml-2">
              {/* Welcome Section */}
              <div className="text-center mt-4">
                <h2>Welcome to S2O Academy</h2>
                <p className="lead">
                  Your journey to excellence starts here. Explore the best
                  resources, results, and more.
                </p>
              </div>

              {/* Our Teachers Section */}
              <section
                id="teachers"
                className="teacher-details text-center my-4"
              >
                <h2>Our Teachers</h2>
                <Row className="justify-content-center">
                  {teachers.map((teacher, index) => (
                    <Col md={4} key={index} className="mb-4">
                      <Card>
                        <Card.Img variant="top" src={teacher.image} />
                        <Card.Body>
                          <Card.Title>{teacher.name}</Card.Title>
                          <Card.Text>{teacher.subject}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </section>

              {/* Best Results Section */}
              <section id="results" className="best-results text-center my-4">
                <h2>Our Best Results</h2>
                <Row className="justify-content-center">
                  {results.map((result, index) => (
                    <Col md={4} key={index} className="mb-4">
                      <Card>
                        <Card.Img variant="top" src={result.image} />
                        <Card.Body>
                          <Card.Title>{result.name}</Card.Title>
                          <Card.Text>{result.achievement}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </section>

              {/* Contact Us Section */}
              <section id="contact" className="contact-info text-center my-4">
                <h2>Contact Us</h2>
                <p>Address: 123 Academy Street, City, Country</p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AcademyHome;
