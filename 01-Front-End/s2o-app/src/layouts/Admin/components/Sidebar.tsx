import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sidebar2 d-flex flex-column p-3">
      <Link
        to="/adminUsers"
        className={`nav-link1 ${location.pathname === '/adminUsers' ? 'active' : ''}`}
      >
        <i className="fas fa-users me-2"></i> Users Management
      </Link>
      <Link
        to="/adminReports"
        className={`nav-link1 ${location.pathname === '/adminReports' ? 'active' : ''}`}
      >
        <i className="fas fa-file-alt me-2"></i> Reports
      </Link>
      <Link
        to="/adminAnalytics"
        className={`nav-link1 ${location.pathname === '/adminAnalytics' ? 'active' : ''}`}
      >
        <i className="fas fa-chart-line me-2"></i> Analytics
      </Link>
      <div className="nav-item dropdown">
        <a
          className={`nav-link1 dropdown-toggle ${location.pathname.startsWith('/adminSettings') ? 'active' : ''}`}
          href="#"
          id="settingsDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-cog me-2"></i> Settings
        </a>
        <ul className="dropdown-menu sidebar-dropdown" aria-labelledby="settingsDropdown">
          <li>
            <Link
              to="/siteSettings"
              className={`dropdown-item ${location.pathname === '/adminSettings/site' ? 'active' : ''}`}
            >
              Site Settings
            </Link>
          </li>
          <li>
            <Link
              to="/securitySettings"
              className={`dropdown-item ${location.pathname === '/adminSettings/security' ? 'active' : ''}`}
            >
              Security Settings
            </Link>
          </li>
        </ul>
      </div>
      <Link
        to="/adminDonationManagment"
        className={`nav-link1 ${location.pathname === '/adminDonationManagment' ? 'active' : ''}`}
      >
        <i className="fas fa-donate me-2"></i> Donation Management
      </Link>
      <Link
        to="/content"
        className={`nav-link1 ${location.pathname === '/content' ? 'active' : ''}`}
      >
        <i className="fas fa-donate me-2"></i> Website Management
      </Link>
    </nav>
  );
};

export default Sidebar;
