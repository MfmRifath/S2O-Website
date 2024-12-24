import React, { useState } from "react";

import AddEditArticle from "../components/AddArticle";
import ArticleTable from "../components/ArticleTable";
import ChatList from "../components/ChatTable";
import { AdministrationTable } from "../components/AdminitarionTable";
import { ManageGallery } from "../components/ManageGallary";
import AddEditAdministration from "../components/AddAdministration";
import { LibraryManagement } from "./LibraryManager";

export const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("admin-table");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-8 from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="container mx-auto max-w-7xl p-6 bg-white shadow-lg rounded-xl">
        <h3 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Content Management
        </h3>
        <nav className="border-b border-gray-200">
          <div className="flex flex-wrap justify-center space-x-4">
            {[
              { id: "add-admin", label: "Add/Edit Administration Member" },
              { id: "admin-table", label: "Administration Table" },
              { id: "add-article", label: "Add Article" },
              { id: "article-table", label: "Article Table" },
              { id: "chat-list", label: "Chat Table" },
              { id: "manage-gallery", label: "Manage Gallery" },
              { id: "manage-Library", label: "Manage Library" },
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
          {activeTab === "add-admin" && <AddEditAdministration />}
          {activeTab === "admin-table" && <AdministrationTable />}
          {activeTab === "add-article" && <AddEditArticle />}
          {activeTab === "article-table" && <ArticleTable />}
          {activeTab === "chat-list" && <ChatList />}
          {activeTab === "manage-gallery" && <ManageGallery />}
          {activeTab === "manage-Library" && <LibraryManagement />}
        </div>
      </div>
    </div>
  );
};