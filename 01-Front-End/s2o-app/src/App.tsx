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
import AddEditAdministration from "./layouts/Admin/components/AddAdministration";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import AdminDashboard from "./layouts/Admin/components/Dashboard";
import TeacherDashboard from "./layouts/Teacher/Pages/Dashboard";
import EventCalendar from "./layouts/EventCalander/EventCalender";
import PrivateRoute from "./PrivateRoute";
import SignUpPage from "./layouts/LoginPage/SignUpPage";
import { S2OAcadamy } from "./layouts/S2OAcadmyPage/S2OAcadamyPage";
import SiteSettings from "./layouts/Admin/Pages/SiteSettings";
import DonationManagement from "./layouts/Admin/Pages/DonationManagement";
import Users from "./layouts/Admin/Pages/Users";
import SecuritySettings from "./layouts/Admin/Pages/SecuritySettings";
import Analytics from "./layouts/Admin/Pages/Analytics";
import Reports from "./layouts/Admin/Pages/Reports";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 pt-16 pb-8">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
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
          path="/adminDonationManagment"
          element={
            <PrivateRoute
              element={< DonationManagement/>}
              requiredRole={"ROLE_ADMIN"}
            />
          }
        />
        <Route
          path="/adminUsers"
          element={
            <PrivateRoute
              element={< Users/>}
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