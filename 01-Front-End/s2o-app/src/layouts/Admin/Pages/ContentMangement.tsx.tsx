import React, { useState } from "react";
import { AddEditAdministration } from "../components/AddAdministration";
import { AddEditArticle } from "../components/AddArticle";
import ArticleTable from "../components/ArticleTable";
import ChatList from "../components/ChatTable";
import { AdministrationTable } from "../components/AdminitarionTable";
import { ManageGallery } from "../components/ManageGallary";

export const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("admin-table");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-5">
      <h3>Content Management</h3>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            onClick={() => handleTabClick("add-admin")}
            className={`nav-link ${activeTab === "add-admin" ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === "add-admin"}
          >
            Add/Edit Administration Member
          </button>
          <button
            onClick={() => handleTabClick("admin-table")}
            className={`nav-link ${
              activeTab === "admin-table" ? "active" : ""
            }`}
            type="button"
            role="tab"
            aria-selected={activeTab === "admin-table"}
          >
            Administration Table
          </button>
          <button
            onClick={() => handleTabClick("add-article")}
            className={`nav-link ${
              activeTab === "add-article" ? "active" : ""
            }`}
            type="button"
            role="tab"
            aria-selected={activeTab === "add-article"}
          >
            Add Article
          </button>
          <button
            onClick={() => handleTabClick("article-table")}
            className={`nav-link ${
              activeTab === "article-table" ? "active" : ""
            }`}
            type="button"
            role="tab"
            aria-selected={activeTab === "article-table"}
          >
            Article Table
          </button>
          <button
            onClick={() => handleTabClick("chat-list")}
            className={`nav-link ${activeTab === "chat-list" ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === "chat-list"}
          >
            Chat Table
          </button>
          <button
            onClick={() => handleTabClick("manage-gallery")}
            className={`nav-link ${
              activeTab === "manage-gallery" ? "active" : ""
            }`}
            type="button"
            role="tab"
            aria-selected={activeTab === "manage-gallery"}
          >
            Manage Gallery
          </button>
        </div>
      </nav>
      <div className="tab-content mt-3">
        {activeTab === "add-admin" && <AddEditAdministration />}
        {activeTab === "admin-table" && <AdministrationTable />}
        {activeTab === "add-article" && <AddEditArticle />}
        {activeTab === "article-table" && <ArticleTable />}
        {activeTab === "chat-list" && <ChatList />}
        {activeTab === "manage-gallery" && <ManageGallery />}
      </div>
    </div>
  );
};
