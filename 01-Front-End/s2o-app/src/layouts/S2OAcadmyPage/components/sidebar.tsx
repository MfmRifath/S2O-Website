import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaChalkboardTeacher, FaStar, FaEnvelope, FaBook, FaChartLine, FaUser, FaBars } from 'react-icons/fa';
import './../components/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
      <div className={`sidebar ${isSidebarVisible ? '' : 'hidden'} `}>
      
        <div className='logo-container mt-5'>
          <img src={require('./../../../Images/s2o-academy.jpg')} className='sidebar-logo' alt="S2O Academy Logo"/>
          <h2 className='academy-text'><span className='academy-text--primary'>S2O</span><span>Academy</span></h2>
        </div>
        <hr/>
        <Nav className="flex-column">
          <Nav.Link href="#home">
            <FaHome className="icon" /> <span className="link-text">Home</span>
          </Nav.Link>
          <Nav.Link href="#teachers">
            <FaChalkboardTeacher className="icon" /> <span className="link-text">Our Teachers</span>
          </Nav.Link>
          <Nav.Link href="#results">
            <FaStar className="icon" /> <span className="link-text">Our Best Results</span>
          </Nav.Link>
          <Nav.Link href="#contact">
            <FaEnvelope className="icon" /> <span className="link-text">Contact Us</span>
          </Nav.Link>
          <hr/>
          <Link className='nav-link' to='/S2OLibrary'>
            <FaBook className="icon" /> <span className="link-text">S2O Library</span>
          </Link>
          <Link className='nav-link' to='/resultPortal'>
            <FaChartLine className="icon" /> <span className="link-text">Result Portal</span>
          </Link>
          
        </Nav>
        <hr/>
        <div className="user-hover">
          <FaUser className="icon" /> <span className="link-text">User Profile</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
