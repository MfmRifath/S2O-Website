import React from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa"; // Icons for notifications and logout

const Header: React.FC = () => {
  return (
    <header className="header2">
      <div className="header-title">
        <h1>Teacher Dashboard</h1>
      </div>
      <div className="header-actions">
        <span className="teacher-info">Logged in as: [Teacher's Name]</span>
        <FaBell className="icon notification-icon" title="Notifications" />
        <FaSignOutAlt className="icon logout-icon" title="Logout" />
      </div>
    </header>
  );
};

export default Header;
