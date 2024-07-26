
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { FullGallery } from "./layouts/GallaryPage.tsx/FullGallery";
import LoginPage from "./layouts/LoginPage/LoginPage";
import RegistrationForm from "./layouts/RegitrationPage/RegistrationForm";
import { S2OAcadamy } from "./layouts/S2OAcadmyPage/S2OAcadamyPage";
import { ResultPortal } from "./layouts/S2OAcadmyPage/components/ExamPortal/ResultPortal";
import { StudentTable } from "./layouts/Teachers/StudentMangement/StudentTable";
import Dashboard from "./layouts/Admin/components/Dashboard";
import Home from "./layouts/Admin/Pages/Home";
import Reports from "./layouts/Admin/Pages/Reports";
import Users from "./layouts/Admin/Pages/Users";
import Analytics from "./layouts/Admin/Pages/Analytics";
import Donation from "./layouts/Donation/DonationForm";
import DonationSuccess from "./layouts/Donation/DonationSuccess";
import DonationNotify from "./layouts/Donation/DonationNotify";
import DonationCancel from "./layouts/Donation/DonationCancel";
import DonationManagement from "./layouts/Admin/Pages/DonationManagement";
import SiteSettings from "./layouts/Admin/Pages/SiteSettings";
import SecuritySettings from "./layouts/Admin/Pages/SecuritySettings";
import { MarksTable } from "./layouts/Teachers/MarksAnlysis/MarksTable";
import { ContentManagement } from "./layouts/Admin/Pages/ContentMangement.tsx";
import { AddEditAdministration } from "./layouts/Admin/components/AddAdministration";
import { EditAdministration } from "./layouts/Admin/components/EditAdministration";
import { Article } from "./layouts/Article/Article";
import ChatWithAdmin from "./layouts/ChatWithAdmin/ChatWithAdmin";
import { S2OLibrary } from "./layouts/S2OAcadmyPage/components/S2OLibrary";
import BookManager from "./layouts/Teachers/Book/BookCrudManagment";
import Bookshelf from "./layouts/S2OAcadmyPage/components/S2O Library/BookShelf";







function App() {
  return (
    <Router>
      <div >
      <Navbar />
      <div >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/gallery">
          <FullGallery/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path='/Register'>
            <RegistrationForm/>
          </Route>
          <Route path='/s2oAcademy'>
            <S2OAcadamy/>
          </Route>
          <Route path='/resultPortal'>
            <ResultPortal/>
          </Route>
          <Route path='/table'>
            <StudentTable/> 
          </Route>
          <Route path='/marksTable'>
            <MarksTable/>
          </Route>
          <Route path='/admin'>
            <Dashboard/>
          </Route>
          <Route path='/adminHome'>
            <Home/>
          </Route>
          <Route path='/adminReports'>
            <Reports/>
          </Route>
          <Route path='/adminUsers'>
            <Users/>
          </Route>
          <Route path='/adminAnalytics'>
            <Analytics/>
          </Route>
          <Route path='/siteSettings'>
            <SiteSettings/>
          </Route>
          <Route path='/securitySettings'>
            <SecuritySettings/>
          </Route>
          <Route path='/adminDonation'>
            <Donation/>
          </Route>
          <Route path='/donationSuccess'>
            <DonationSuccess/>
          </Route>
          <Route path='/donationCancel'>
            <DonationCancel/>
          </Route>
          <Route path='/donationNotify'>
            <DonationNotify/>
          </Route>
          <Route path='/adminDonationManagment'>
            <DonationManagement/>
          </Route>
          <Route path='/content'>
          <ContentManagement/>
          </Route>
          <Route path='/edit-admin/:id'>
           <EditAdministration/>
          </Route>
          <Route path='/article'>
            <Article/>
          </Route>
          <Route path='/chat'>
            <ChatWithAdmin/>
          </Route>
          <Route path='/S2OLibrary'>
            <S2OLibrary/>
          </Route>
          <Route path='/bookManager'>
            <BookManager/>
          </Route>
          <Route path="/bookShelf">
            <Bookshelf/>
          </Route>
          </Switch>
      </div>
      <Footer />
      </div>
      
    </Router>
  );
}

export default App;
