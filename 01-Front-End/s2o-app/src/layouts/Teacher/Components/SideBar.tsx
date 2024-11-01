import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSelectSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  onSelectSection,
}) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <nav>
        <ul>
          <li>
            <a onClick={() => onSelectSection("studentManagement")}>
              Student Management
            </a>
          </li>

          <li>
            <a onClick={() => onSelectSection("marksManagement")}>
              Marks Management
            </a>
          </li>
          <li>
            <a onClick={() => onSelectSection("analyticsReports")}>
              Analytics & Reports
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
