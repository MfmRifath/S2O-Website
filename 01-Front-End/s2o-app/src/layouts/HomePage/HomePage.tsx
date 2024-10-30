import { Administration } from "./component/Administration";
import Advicers from "./component/Advicers";
import DonationPage from "./component/Donation";
import FounderPage from "./component/Founder";
import S2OAcademyPage from "./component/S2OAcademy";
import { ServicesPage } from "./component/Service";
import { Vision } from "./component/Vision";
import { Welcome } from "./component/Welcome";
import Gallery from "./Gallery";

export const HomePage = () => {
  return (
    <>
      <Welcome />
      <div className="container">
        <FounderPage />
        <hr className="center-elegant" /> {/* Official and refined hr */}
        <Advicers />
        <hr className="center-elegant" />
        <Administration />
        <hr className="center-elegant" />
        <Vision />
        <hr className="center-elegant" />
        <ServicesPage />
        <hr className="center-elegant" />
        <S2OAcademyPage />
        <hr className="center-elegant" />
        <DonationPage />
        <hr className="center-elegant" />
        <Gallery />
      </div>
    </>
  );
};
