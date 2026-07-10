import { Helmet } from "react-helmet-async";
import HeroSection from "../website/components/HeroSection";
import AboutUs from "../website/components/AboutUs";
import CustomerReviews from "./components/CustomerReviews";
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
        <title>
          House Cleaning Services in Huntsville, AL | MCJ's Cleaning Service
        </title>

        <meta
          name="description"
          content="MCJ's Cleaning Service offers professional house cleaning services in Huntsville, Madison, Athens, Harvest, Owens Cross Roads, Brownsboro, and nearby North Alabama areas. Regular, total, deep, move-in, move-out, and post-construction cleaning available."
        />

        <meta name="author" content="Oscar Cardona" />

        <link rel="canonical" href="https://mcjscleaningservice.com/" />

        <meta
          property="og:title"
          content="House Cleaning Services in Huntsville, AL | MCJ's Cleaning Service"
        />

        <meta
          property="og:description"
          content="Professional residential cleaning services in Huntsville, Madison, Athens, Harvest, Owens Cross Roads, Brownsboro, and nearby North Alabama areas."
        />

        <meta property="og:url" content="https://mcjscleaningservice.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://mcjscleaningservice.com/assets/regularCleaning.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="House Cleaning Services in Huntsville, AL | MCJ's Cleaning Service"
        />
        <meta
          name="twitter:description"
          content="Professional residential cleaning services in Huntsville, Madison, Athens, Harvest, Owens Cross Roads, Brownsboro, and nearby areas."
        />
        <meta
          name="twitter:image"
          content="https://mcjscleaningservice.com/assets/regularCleaning.jpg"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "MCJ's Cleaning Service",
            url: "https://mcjscleaningservice.com/",
            telephone: "+1-551-227-0373",
            email: "mcjscleaning@gmail.com",
            description:
              "Professional residential cleaning services in Huntsville, Madison, Athens, Harvest, Owens Cross Roads, Brownsboro, and nearby North Alabama areas.",
            areaServed: [
              "Huntsville, AL",
              "Madison, AL",
              "Athens, AL",
              "Harvest, AL",
              "Owens Cross Roads, AL",
              "Brownsboro, AL",
              "Hampton Cove, AL",
            ],
            priceRange: "$$",
            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Regular Cleaning",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Total Cleaning",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Deep Cleaning",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Move-In / Move-Out Cleaning",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Post-Construction Cleaning",
                },
              },
            ],
          })}
        </script>
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
      {/* <motion.div
        id="serving"
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <ServingAreas />
      </motion.div> */}
      <motion.div
        id="services"
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest text-lime-600 font-bold">
              Our Cleaning Services
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Every home has different needs.
            </h2>

            <div className="w-16 h-1 bg-blue-500 mx-auto my-4"></div>

            <p className="text-description max-w-2xl mx-auto">
              Choose the cleaning service that best fits your home, from
              recurring maintenance to deep, move-in/out, and post-construction
              cleaning.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: "Regular Cleaning",
                  description:
                    "Perfect for recurring maintenance and a fresh home.",
                  image: "/assets/regularCleaning.jpg",
                },
                {
                  title: "Total Cleaning",
                  description: "A more detailed service for busy homes.",
                  image: "/assets/totalCleaning.jpg",
                },
                {
                  title: "Deep Cleaning",
                  description: "Our most detailed service for extra attention.",
                  image: "/assets/deepCleaning.webp",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="bg-white rounded-2xl shadow-md overflow-hidden text-left hover:-translate-y-1 hover:shadow-xl transition duration-300"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mt-2">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Move In / Move Out Cleaning",
                  description: "Ideal for empty homes before or after moving.",
                  image: "/assets/moveInOutCleaning.jpg",
                },
                {
                  title: "Post Construction Cleaning",
                  description:
                    "Detailed dust removal after renovations or remodeling.",
                  image: "/assets/postConstructionCleaning.jpg",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="bg-white rounded-2xl shadow-md overflow-hidden text-left hover:-translate-y-1 hover:shadow-xl transition duration-300"
                >
                  <div className="grid grid-cols-3">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover col-span-1"
                    />

                    <div className="p-6 col-span-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/serviceTypes"
              className="inline-block mt-10 bg-yellow-400 text-blue-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
            >
              View All Services →
            </a>
          </div>
        </section>
      </motion.div>
      <div id="reviews">
        <CustomerReviews />
      </div>
      <TrustedSection />

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
