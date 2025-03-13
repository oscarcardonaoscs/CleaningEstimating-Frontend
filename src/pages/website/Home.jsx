import { Helmet } from "react-helmet-async";
import HeroSection from "../website/components/HeroSection";
import AboutUs from "../website/components/AboutUs";
import ServingAreas from "../website/components/ServingAreas";
import CleaningServices from "../website/components/CleaningServices";
import SatisfactionGuarantee from "../website/components/SatisfactionGuarantee";
import ContactSection from "../website/components/ContactSection";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <Helmet>
        <meta
          name="description"
          content="MCJ's Cleaning Service offers professional cleaning services for homes, with satisfaction guaranteed. Book your cleaning today!"
        />
        <meta
          name="keywords"
          content="cleaning, house cleaning, professional cleaning, satisfaction guarantee, MCJ's Cleaning Service, cleaning services, housekeeper, maid service, home cleaning, deep cleaning, Madison, Huntsville, Athens, Hampton Cove, Owens Cross Roads, Brownsboro, Alabama, local, regular cleaning, total cleaning"
        />
        <meta name="author" content="Oscar Cardona" />
        <meta property="og:title" content="MCJ's Cleaning Service" />
        <meta
          property="og:description"
          content="Professional home cleaning services with guaranteed satisfaction. Book your cleaning now."
        />
        <meta property="og:image" content="url-to-image.jpg" />{" "}
        {/* Aquí agregas la URL de una imagen representativa */}
        <meta property="og:url" content="https://mcjscleaningservice.com" />
        <link rel="icon" href="/favicon.ico" />
        <title>MCJ's Cleaning Service</title>
      </Helmet>
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
