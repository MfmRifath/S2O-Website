import React, { useState } from "react";
import Header from "./Components/Header";

import AnalyticsReports from "./Components/AnalysePanal";
import MarksManagement from "./Components/MarksPanal";
import "./TeachersDashboard.css";
import Sidebar from "./Components/SideBar";
import StudentManagement from "./Components/StudentPanal";

const TeacherDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("studentManagement"); // Track active section

  // Function to handle sidebar item selection
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="teacher-dashboard">
      <Header />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSelectSection={handleSectionChange} // Pass function to Sidebar
      />
      <div className={`main-content ${isSidebarOpen ? "open" : "collapsed"}`}>
        {activeSection === "studentManagement" && (
          <div className="card">
            <h2>Student Management</h2>
            <StudentManagement />
          </div>
        )}
        {activeSection === "marksManagement" && (
          <div className="card">
            <h2>Marks Management</h2>
            <MarksManagement />
          </div>
        )}
        {activeSection === "analyticsReports" && (
          <div className="card">
            <h2>Analytics & Reports</h2>
            <AnalyticsReports />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
