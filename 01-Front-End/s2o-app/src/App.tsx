import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { FullGallery } from "./layouts/GallaryPage.tsx/FullGallery";
import LoginPage from "./layouts/LoginPage/LoginPage";
import RegistrationForm from "./layouts/RegitrationPage/RegistrationForm";
import { S2OAcadamy } from "./layouts/S2OAcadmyPage/S2OAcadamyPage";
import { ResultPortal } from "./layouts/S2OAcadmyPage/components/ExamPortal/ResultPortal";
import Dashboard from "./layouts/Admin/components/Dashboard";
import TeacherHome from "./layouts/Teacher/TeacherDashBoard";
import StudentManagement from "./layouts/Teacher/Pages/StudentManagment";
import MarksManagement from "./layouts/Teacher/Pages/MarksManagement";
import PerformanceTracking from "./layouts/Teacher/Pages/PerformanceTracking";
import { ContentManagement } from "./layouts/Admin/Pages/ContentMangement.tsx";
import Article from "./layouts/Article/Article";
import { S2OLibrary } from "./layouts/S2OAcadmyPage/components/S2OLibrary";
import Bookshelf from "./layouts/S2OAcadmyPage/components/S2O Library/BookShelf";
import EventCalendar from "./layouts/EventCalander/EventCalander";
import AddEditAdministration from "./layouts/Admin/components/AddAdministration";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/gallery" element={<FullGallery />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/s2oAcademy" element={<S2OAcadamy />} />
        <Route path="/resultPortal" element={<ResultPortal />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/edit-admin/:id" element={<AddEditAdministration />} />
        <Route path="/Teacher" element={<TeacherHome />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/marks" element={<MarksManagement />} />
        <Route path="/performance" element={<PerformanceTracking/>} />
        <Route path="/content" element={<ContentManagement  />}/>
        <Route path="/article" element={<Article  />}/>
        <Route path="/S2OLibrary" element={<S2OLibrary  />}/>
        <Route path="/bookShelf" element={<Bookshelf />}/>
        <Route path="/eventCalaender" element={<EventCalendar/>}/>
        
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;