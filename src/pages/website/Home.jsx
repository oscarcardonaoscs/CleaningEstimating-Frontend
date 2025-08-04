import { Helmet } from "react-helmet-async";
import HeroSection from "../website/components/HeroSection";
import AboutUs from "../website/components/AboutUs";
import ServingAreas from "../website/components/ServingAreas";
import CleaningServices from "../website/components/CleaningServices";
import SatisfactionGuarantee from "../website/components/SatisfactionGuarantee";
import ContactSection from "../website/components/ContactSection";
import TrustedSection from "./components/TrustedSection";
import { motion } from "framer-motion";

// Animación base para secciones al hacer scroll
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const fadeDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

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
        <title>
          House Cleaning Service in Huntsville, AL | MCJ's Cleaning Service
        </title>
        <meta
          name="description"
          content="Affordable and professional house cleaning services in Huntsville, Alabama. Trusted by happy clients. 100% satisfaction guaranteed with every cleaning."
        />
        <meta
          name="keywords"
          content="house cleaning huntsville al, maid service huntsville, affordable cleaning services, deep cleaning huntsville, move out cleaning"
        />
        <link rel="canonical" href="https://mcjscleaningservice.com/" />
      </Helmet>

      <motion.div
        variants={fadeDown}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <AboutUs />
      </motion.div>
      <motion.div
        id="serving"
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <ServingAreas />
      </motion.div>
      <TrustedSection />
      <motion.div
        id="services"
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CleaningServices />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <SatisfactionGuarantee />
      </motion.div>

      <motion.div
        id="contact"
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ContactSection />
      </motion.div>
    </div>
  );
}
