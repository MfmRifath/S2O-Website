import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { FullGallery } from "./layouts/GallaryPage.tsx/FullGallery";
import LoginPage from "./layouts/LoginPage/LoginPage";
import RegistrationForm from "./layouts/RegitrationPage/RegistrationForm";
import { S2OAcadamy } from "./layouts/S2OAcadmyPage/S2OAcadamyPage";
import { ResultPortal } from "./layouts/S2OAcadmyPage/components/ExamPortal/ResultPortal";
import Dashboard from "./layouts/Admin/components/Dashboard";
import TeacherHome from "./layouts/Teacher/TeacherDashBoard";
import MarksManagement from "./layouts/Teacher/Pages/MarksManagement";
import PerformanceTracking from "./layouts/Teacher/Pages/PerformanceTracking";
import { ContentManagement } from "./layouts/Admin/Pages/ContentMangement.tsx";
import Article from "./layouts/Article/Article";
import { S2OLibrary } from "./layouts/S2OAcadmyPage/components/S2OLibrary";
import Bookshelf from "./layouts/S2OAcadmyPage/components/S2O Library/BookShelf";
import EventCalendar from "./layouts/EventCalander/EventCalander";
import AddEditAdministration from "./layouts/Admin/components/AddAdministration";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import StudentDataComponent from "./layouts/Teacher/Pages/StudentManagment";

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
        <Route
          path="/admin"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/edit-admin/:id"
          element={
            <Layout>
              <AddEditAdministration />
            </Layout>
          }
        />
        <Route
          path="/Teacher"
          element={
            <Layout>
              <TeacherHome />
            </Layout>
          }
        />
        <Route
          path="/students"
          element={
            <Layout>
              <StudentDataComponent/>
            </Layout>
          }
        />
        <Route
          path="/marks"
          element={
            <Layout>
              <MarksManagement />
            </Layout>
          }
        />
        <Route
          path="/performance"
          element={
            <Layout>
              <PerformanceTracking />
            </Layout>
          }
        />
        <Route
          path="/content"
          element={
            <Layout>
              <ContentManagement />
            </Layout>
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
          path="/eventCalaender"
          element={
            <Layout>
              <EventCalendar />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;