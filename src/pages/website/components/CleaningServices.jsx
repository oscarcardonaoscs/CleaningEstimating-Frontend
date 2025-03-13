import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ServiceCarousel from ".././ServiceCarousel";

export default function CleaningServices() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-100 py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900">
        Our Cleaning Services
      </h2>
      <div className="w-16 h-1 bg-blue-500 mx-auto my-2"></div>
      <p className="text-description text-gray-700 max-w-2xl mx-auto">
        We offer professional, reliable, and thorough cleaning services designed
        to meet your needs.
      </p>
      {/* Service Carousel */}
      <div className="max-w-4xl mx-auto mt-8">
        <ServiceCarousel />
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8 px-6">
        {[
          {
            title: "Regular & Total Cleaning",
            description:
              "Keep your home consistently spotless with our biweekly or monthly cleaning plans.",
            points: [
              "Dusting, vacuuming, mopping",
              "Kitchen & bathroom cleaning",
              "Reliable and hassle-free service",
            ],
            image: "/assets/regularCleaning.jpg",
          },
          {
            title: "Deep Cleaning",
            description:
              "A top-to-bottom cleaning covering every surface, nook, and cranny.",
            points: [
              "Detailed scrubbing",
              "Baseboards & hard-to-reach areas",
              "Perfect for seasonal refresh",
            ],
            image: "/assets/deepCleaning.webp",
          },
          {
            title: "Move In / Move Out Cleaning",
            description:
              "Moving? Ensure your old or new home is immaculately clean.",
            points: [
              "Inside cabinets & appliances",
              "Deep sanitization",
              "Hassle-free moving experience",
            ],
            image: "/assets/moveInOutCleaning.webp",
          },
        ].map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-gray-800"
          >
            <img
              src={service.image}
              alt={`${service.title}`}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <ul className="mt-3 text-gray-700 text-left">
              {service.points.map((point, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-blue-500">✔</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-6 text-gray-800 font-semibold flex items-center justify-center">
        <img
          src="/assets/comprobado.png"
          alt="Checked Icon"
          className="w-6 h-6 mr-2"
        />
        100% Satisfaction Guarantee
      </p>

      <p className="text-center text-lg">
        <button
          onClick={scrollToContact}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Contact us today!
        </button>{" "}
        for a free estimate!
      </p>
    </section>
  );
}
