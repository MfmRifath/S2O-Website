import React, { useState } from "react";


import BookManager from "../components/BookManager";
import ExamPapersPage from "../../S2OAcadmyPage/components/S2O Library/ExamPapers";
import ManageExamPapersPage from "./ManageExamPapers";
import ManageVideoList from "../components/ManageVedioList";
import StudyNotesManagement from "../components/StudyNotesManagements";

export const LibraryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("admin-table");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="container mx-auto max-w-7xl p-6 bg-white shadow-lg rounded-xl">
        <h3 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Library Menagement
        </h3>
        <nav className="border-b border-gray-200">
          <div className="flex flex-wrap justify-center space-x-4">
            {[
              { id: "Book-Manager", label: "Manage Book" },
              { id: "ExamPaper-Manager", label: "Manage ExamPaper" },
              { id: "Video-Manager", label: "Manage Video" },
              { id: "Notes-Manager", label: "Manage Notes" }
              
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`py-2 px-6 text-sm font-semibold rounded-t-md transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="mt-6 p-6 bg-gray-50 shadow-inner rounded-lg">
          {activeTab === "Book-Manager" && <BookManager />}
          {activeTab === "ExamPaper-Manager" && <ManageExamPapersPage />}
          {activeTab === "Video-Manager" && <ManageVideoList/>}
          {activeTab === "Notes-Manager" && <StudyNotesManagement/>}
          
        </div>
      </div>
    </div>
  );
};