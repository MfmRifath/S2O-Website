import { useInView } from "react-intersection-observer";
import { Administration } from "./component/Administration";
import Advicers from "./component/Advicers";
import DonationPage from "./component/Donation";
import FounderPage from "./component/Founder";
import S2OAcademyPage from "./component/S2OAcademy";
import { ServicesPage } from "./component/Service";
import { Vision } from "./component/Vision";
import { Welcome } from "./component/Welcome";
import Gallery from "./Gallery";
import './HomePage.css';
import OpenAiAssistant from "../AIAssistent/OpenAiAssistent";
import { useState } from "react";
import OpenAiIntegration from "../AIAssistent/OpenAiAssistent";

export const HomePage = () => {
  // Intersection observers for each section
  const [founderRef, founderInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [advicersRef, advicersInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [adminRef, adminInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [visionRef, visionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [academyRef, academyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [donationRef, donationInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [galleryRef, galleryInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  return (
    <>
      <div className="homepage-container">
        <div className="mx-auto px-4 relative z-10">
          {/* Welcome Section */}
          <Welcome />

          {/* Founder Section */}
          <section
            ref={founderRef}
            className={`py-16 bg-opacity-20 backdrop-blur-lg rounded-xl transform transition-all duration-700 ${
              founderInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <FounderPage />
          </section>
          <hr className="center-elegant my-8" />

          {/* Advicers Section */}
          <section
            ref={advicersRef}
            className={`transform transition-all duration-700 ${
              advicersInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <Advicers />
          </section>
          <hr className="center-elegant my-8" />

          {/* Administration Section */}
          <section
            ref={adminRef}
            className={`transform transition-all duration-700 ${
              adminInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <Administration />
          </section>
          <hr className="center-elegant my-8" />

          {/* Vision Section */}
          <section
            ref={visionRef}
            className={`transform transition-all duration-700 ${
              visionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <Vision />
          </section>
          <hr className="center-elegant my-8" />

          {/* Services Section */}
          <section
            ref={servicesRef}
            className={`transform transition-all duration-700 ${
              servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <ServicesPage />
          </section>
          <hr className="center-elegant my-8" />

          {/* S2O Academy Section */}
          <section
            ref={academyRef}
            className={`transform transition-all duration-700 ${
              academyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <S2OAcademyPage />
          </section>
          <hr className="center-elegant my-8" />

          {/* Donation Section */}
          <section
            ref={donationRef}
            className={`transform transition-all duration-700 ${
              donationInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <DonationPage />
          </section>
          <hr className="center-elegant my-8" />

          {/* Gallery Section */}
          <section
            ref={galleryRef}
            className={`transform transition-all duration-700 ${
              galleryInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <Gallery />
          </section>
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
      </div>
    </>
  );
};