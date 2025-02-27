import HeroSection from "../website/components/HeroSection";
import AboutUs from "../website/components/AboutUs";
import ServingAreas from "../website/components/ServingAreas";
import CleaningServices from "../website/components/CleaningServices";
import SatisfactionGuarantee from "../website/components/SatisfactionGuarantee";
import ContactSection from "../website/components/ContactSection";



export default function Home() {
    return (
      <div className="relative w-full min-h-screen">
        <HeroSection />
        <div id="about">
          <AboutUs />
        </div>
        <div id="serving">
          <ServingAreas />
        </div>
        <div id="services">
          <CleaningServices />
        </div>
        <SatisfactionGuarantee />
        <div id="contact">
          <ContactSection />
        </div>
      </div>
    );
  }
  