import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
;
import './../components/AcademyHome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './sidebar';

export const AcademyHome = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 40.748817,
    lng: -73.985428
  };

  return (
    <div className='d-flex content-section '>
    <Sidebar />
    <div className='content'>
      <main className="flex-grow-1 d-flex flex-column align-items-center m-5">
        <div className='ml-2'>

      
        <div className="text-center mt-4">
          <h2>Welcome to S2O Academy</h2>
          <p className="lead">Your journey to excellence starts here. Explore the best resources, results, and more.</p>
        </div>

        <section id="teachers" className="teacher-details text-center my-4">
          <h2>Our Teachers</h2>
          <Row className="justify-content-center">
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src={require('./../../../Images/bg.jpg')} />
                <Card.Body>
                  <Card.Title>Teacher Name</Card.Title>
                  <Card.Text>Expert in Mathematics</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src={require('./../../../Images/bg.jpg')} />
                <Card.Body>
                  <Card.Title>Teacher Name</Card.Title>
                  <Card.Text>Expert in Science</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* Add more teachers as needed */}
          </Row>
        </section>

        <section id="results" className="best-results text-center my-4">
          <h2>Our Best Results</h2>
          <Row className="justify-content-center">
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src={require('./../../../Images/bg.jpg')} />
                <Card.Body>
                  <Card.Title>Student Name</Card.Title>
                  <Card.Text>Top scorer in Mathematics</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src={require('./../../../Images/bg.jpg')} />
                <Card.Body>
                  <Card.Title>Student Name</Card.Title>
                  <Card.Text>Top scorer in Science</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* Add more students as needed */}
          </Row>
        </section>

        <section id="contact" className="contact-info text-center my-4">
          <h2>Contact Us</h2>
          <p>Address: 123 Academy Street, City, Country</p>
          <LoadScript googleMapsApiKey="AIzaSyCH_-LuSFIHugDOpQUuz9SmikokvXUjSmg">
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </section>
        </div>
      </main>
      </div>
    </div>
  );
};
