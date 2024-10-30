import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaChalkboardTeacher,
  FaStar,
  FaEnvelope,
  FaBook,
  FaChartLine,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./../components/Sidebar.css";

interface SidebarProps {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarVisible,
  toggleSidebar,
}) => {
  const location = useLocation(); // Get the current route location

  return (
    <>
      {/* Sidebar container */}
      <div className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        {/* Toggle button */}
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars className="toggle-icon" />
        </div>

        {/* Logo Section */}
        <div className="logo-container mt-5">
          <img
            src={require("./../../../Images/s2o-academy.jpg")}
            className="sidebar-logo"
            alt="S2O Academy Logo"
          />
          {isSidebarVisible && (
            <h2 className="academy-text">
              <span className="academy-text--primary">S2O</span>
              <span>Academy</span>
            </h2>
          )}
        </div>
        <hr />

        {/* Navigation Links */}
        <Nav className="flex-column">
          <Nav.Link
            href="#home"
            className={location.hash === "#home" ? "active" : ""}
          >
            <FaHome className="icon" />
            {isSidebarVisible && <span className="link-text">Home</span>}
          </Nav.Link>
          <Nav.Link
            href="#teachers"
            className={location.hash === "#teachers" ? "active" : ""}
          >
            <FaChalkboardTeacher className="icon" />
            {isSidebarVisible && (
              <span className="link-text">Our Teachers</span>
            )}
          </Nav.Link>
          <Nav.Link
            href="#results"
            className={location.hash === "#results" ? "active" : ""}
          >
            <FaStar className="icon" />
            {isSidebarVisible && (
              <span className="link-text">Our Best Results</span>
            )}
          </Nav.Link>
          <Nav.Link
            href="#contact"
            className={location.hash === "#contact" ? "active" : ""}
          >
            <FaEnvelope className="icon" />
            {isSidebarVisible && <span className="link-text">Contact Us</span>}
          </Nav.Link>
          <hr />
          <Link
            className={`nav-link ${
              location.pathname === "/S2OLibrary" ? "active" : ""
            }`}
            to="/S2OLibrary"
          >
            <FaBook className="icon" />
            {isSidebarVisible && <span className="link-text">S2O Library</span>}
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/resultPortal" ? "active" : ""
            }`}
            to="/resultPortal"
          >
            <FaChartLine className="icon" />
            {isSidebarVisible && (
              <span className="link-text">Result Portal</span>
            )}
          </Link>
        </Nav>
        <hr />

        {/* User Profile */}
        <div className="user-hover">
          <FaUser className="icon" />
          {isSidebarVisible && <span className="link-text">User Profile</span>}
        </div>
      </div>

      {/* Overlay for when the sidebar is collapsed */}
      {!isSidebarVisible && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
