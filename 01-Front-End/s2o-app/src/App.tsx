import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// Import your layout and page components here
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { FullGallery } from "./layouts/GallaryPage.tsx/FullGallery";
import LoginPage from "./layouts/LoginPage/LoginPage";
import RegistrationForm from "./layouts/RegitrationPage/RegistrationForm";
import { ResultPortal } from "./layouts/S2OAcadmyPage/components/ExamPortal/ResultPortal";
import { ContentManagement } from "./layouts/Admin/Pages/ContentMangement.tsx";
import Article from "./layouts/Article/Article";
import { S2OLibrary } from "./layouts/S2OAcadmyPage/components/S2OLibrary";
import Bookshelf from "./layouts/S2OAcadmyPage/components/S2O Library/BookShelf";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import AdminDashboard from "./layouts/Admin/components/Dashboard";
import TeacherDashboard from "./layouts/Teacher/Pages/Dashboard";
import EventCalendar from "./layouts/EventCalander/EventCalender";
import PrivateRoute from "./PrivateRoute";
import SignUpPage from "./layouts/LoginPage/SignUpPage";
import { S2OAcadamy } from "./layouts/S2OAcadmyPage/S2OAcadamyPage";
import SiteSettings from "./layouts/Admin/Pages/SiteSettings";
import DonationManagement from "./layouts/Admin/Pages/DonationManagement";

import SecuritySettings from "./layouts/Admin/Pages/SecuritySettings";
import Analytics from "./layouts/Admin/Pages/Analytics";
import Reports from "./layouts/Admin/Pages/Reports";
import UserManagement from "./layouts/Admin/Pages/Users";
import ProfilePage from "./layouts/Profile";
import { useState } from "react";
import AddEditAdministration from "./layouts/Admin/components/AddAdministration";
import AddEditArticle from "./layouts/Admin/components/AddArticle";
import ExamPapersPage from "./layouts/S2OAcadmyPage/components/S2O Library/ExamPapers";
import VideoCenter from "./layouts/S2OAcadmyPage/components/S2O Library/VedioCenter";
import OpenAiIntegration from "./layouts/AIAssistent/OpenAiAssistent";
import ShowStudyNotes from "./layouts/S2OAcadmyPage/components/S2O Library/StudyNotes";

function Layout({ children }: { children: React.ReactNode }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 pt-16 pb-8">{children}</main>
      {/* Footer */}

        {/* AI Assistant Button */}
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Open AI Assistant
          </button>
        </div>

        {/* AI Assistant Panel */}
        {/* AI Assistant Button */}
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Open AI Assistant
          </button>
        </div>

        {/* AI Assistant Button */}
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Open AI Assistant
          </button>
        </div>
       {/* AI Assistant Panel */}
       <div
          className={`fixed bottom-5 right-5 z-50 bg-white shadow-lg transform transition-transform duration-300 ${
            isAssistantOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            width: "400px", // Set fixed width
            height: "80vh", // Set fixed height
            borderRadius: "10px", // Rounded corners
            bottom: "10px", // Prevent the panel from being hidden under the bottom edge
          }}
        >
          <button
            onClick={() => setIsAssistantOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <OpenAiIntegration />
        </div>
      <Footer />
    </div>
  );
}

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Navigate to="/home" />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/gallery"
          element={
            <Layout>
              <FullGallery />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegistrationForm />
            </Layout>
          }
        />
        <Route
          path="/s2oAcademy"
          element={
            <Layout>
              <S2OAcadamy />
            </Layout>
          }
        />
        <Route
          path="/resultPortal"
          element={
            <Layout>
              <ResultPortal />
            </Layout>
          }
        />
        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/notes"
          element={
            <PrivateRoute
              element={<ShowStudyNotes />}
              requiredRole={"ROLE_USER"}
            />
          }
        />
        <Route
          path="/content"
          element={
            <PrivateRoute
              element={< ContentManagement/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/siteSettings"
          element={
            <PrivateRoute
              element={< SiteSettings/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/edit-admin/:id"
          element={
            <PrivateRoute
              element={< AddEditAdministration/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/edit-article/:articleId"
          element={
            <PrivateRoute
              element={< AddEditArticle/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/adminDonationManagment"
          element={
            <PrivateRoute
              element={< DonationManagement/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/examPapers"
          element={
            <PrivateRoute
              element={< ExamPapersPage/>}
              requiredRole={"ROLE_USER"}
            />
          }
        />
        <Route
          path="/video"
          element={
            <PrivateRoute
              element={< VideoCenter/>}
              requiredRole={"ROLE_USER"}
            />
          }
        />
        <Route
          path="/adminUsers"
          element={
            <PrivateRoute
              element={< UserManagement/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/securitySettings"
          element={
            <PrivateRoute
              element={< SecuritySettings/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
         <Route
          path="/adminAnalytics"
          element={
            <PrivateRoute
              element={< Analytics/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage/>
            </Layout>
          
          
          }
        />
        <Route
          path="/adminReports"
          element={
            <PrivateRoute
              element={< Reports/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/teacher"
          element={
            <PrivateRoute
              element={<TeacherDashboard />}
              requiredRole={"ROLE_TEACHER"}
            />
          }
        />
        
        <Route
          path="/article"
          element={
            <Layout>
              <Article />
            </Layout>
          }
        />
        <Route
          path="/S2OLibrary"
          element={
            <Layout>
              <S2OLibrary />
            </Layout>
          }
        />
        <Route
          path="/bookShelf"
          element={
            <Layout>
              <Bookshelf />
            </Layout>
          }
        />
        <Route
          path="/eventCalender"
          element={
            <Layout>
              <EventCalendar />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUpPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;