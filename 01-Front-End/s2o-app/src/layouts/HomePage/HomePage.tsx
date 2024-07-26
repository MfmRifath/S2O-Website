
import { Administration } from "./component/Administration";
import Advicers from "./component/Advicers";
import DonationPage from "./component/Donation";
import FounderPage from "./component/Founder";
import MessagingPage from "./component/MessagingPage";
import S2OAcademyPage from "./component/S2OAcademy";
import { ServicesPage } from "./component/Service";
import { Vision } from "./component/Vision";
import { Welcome } from "./component/Welcome";




import  Gallery  from "./Gallery";


export const HomePage = () => {
  return (
    <>
      <Welcome />
    <div className="container">
      <FounderPage/>
     <Advicers/>
      <Administration />
      <Vision/>
      <ServicesPage/>
      <S2OAcademyPage/>
      <DonationPage/>
      <Gallery/>
      <MessagingPage/>
    </div>
    </>
  );
};
