import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddEditAdministration } from '../components/AddAdministration';
import { AdministrationTable } from '../components/AdminitarionTable';
import { AddEditArticle } from '../components/AddArticle';
import ArticleTable from '../components/ArticleTable';
import ChatList from '../components/ChatTable';


export const ContentManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('admin-table');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="container mt-5">
            <h3>Content Management</h3>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button 
                        onClick={() => handleTabClick('add-admin')} 
                        className={`nav-link ${activeTab === 'add-admin' ? 'active' : ''}`} 
                        id="nav-add-admin-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="nav-add-admin"
                        aria-selected={activeTab === 'add-admin'}
                    >
                        Add/Edit Administration Member
                    </button>
                    <button 
                        onClick={() => handleTabClick('admin-table')} 
                        className={`nav-link ${activeTab === 'admin-table' ? 'active' : ''}`} 
                        id="nav-admin-table-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="nav-admin-table"
                        aria-selected={activeTab === 'admin-table'}
                    >
                        Administration Table
                    </button>
                    <button 
                        onClick={() => handleTabClick('add-article')} 
                        className={`nav-link ${activeTab === 'add-article' ? 'active' : ''}`} 
                        id="nav-add-article-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="nav-add-article"
                        aria-selected={activeTab === 'add-article'}
                    >
                        Add Article
                    </button>
                    <button 
                        onClick={() => handleTabClick('article-table')} 
                        className={`nav-link ${activeTab === 'article-table' ? 'active' : ''}`} 
                        id="nav-article-table-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="nav-article-table"
                        aria-selected={activeTab === 'article-table'}
                    >
                        Article Table
                    </button>
                    <button 
                        onClick={() => handleTabClick('chat-list')} 
                        className={`nav-link ${activeTab === 'chat-list' ? 'active' : ''}`} 
                        id="nav-chat-list-tab" 
                        type="button" 
                        role="tab" 
                        aria-controls="nav-chat-list"
                        aria-selected={activeTab === 'chat-list'}
                    >
                        Chat Table
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {activeTab === 'add-admin' && <AddEditAdministration />}
                {activeTab === 'admin-table' && <AdministrationTable />}
                {activeTab === 'add-article' && <AddEditArticle />}
                {activeTab === 'article-table' && <ArticleTable/>}
                {activeTab === 'chat-list' && <ChatList/>}
            </div>
        </div>
    );
};
