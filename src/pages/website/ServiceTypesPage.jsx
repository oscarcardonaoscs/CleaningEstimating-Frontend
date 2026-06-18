import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ContactSection from "./components/ContactSection";

import {
  FaCalendarCheck,
  FaMagic,
  FaTools,
  FaHome,
  FaHardHat,
} from "react-icons/fa";

const services = [
  {
    slug: "regular-cleaning",
    title: "Regular Cleaning",
    subtitle:
      "Perfect for maintaining a clean and comfortable home on a recurring basis.",
    image: "/assets/regularCleaning.jpg",
    detailImage: "/assets/regularCleaning.jpg",
    buttonColor: "bg-blue-900 hover:bg-blue-800",
    iconColor: "bg-blue-900",
    icon: FaCalendarCheck,
    items: [
      "Kitchen & bathroom cleaning",
      "Dusting all surfaces",
      "Interior microwave cleaning",
      "Vacuuming & mopping floors",
      "Making the bed (master bedroom)",
    ],
    details: [
      {
        title: "Kitchen",
        image: "/assets/regularCleaning.jpg",
        items: [
          "Cleaning countertops, sink, and faucets",
          "Exterior appliance cleaning",
          "Interior microwave cleaning",
          "Stovetop and kitchen surface cleaning",
        ],
      },
      {
        title: "Bathrooms",
        image: "/assets/deepCleaning.webp",
        items: [
          "Cleaning toilets, sinks, showers, bathtubs, and mirrors",
          "Cleaning bathroom surfaces and fixtures",
          "Vacuuming and mopping floors",
        ],
      },
      {
        title: "Entire Home",
        image: "/assets/regularCleaning.jpg",
        items: [
          "Dusting all accessible surfaces",
          "Vacuuming, sweeping, and mopping floors",
          "Making the master bedroom bed",
          "General tidying and trash removal",
        ],
      },
    ],
  },
  {
    slug: "total-cleaning",
    title: "Total Cleaning",
    subtitle:
      "A more detailed service with extra attention to areas often missed during regular cleaning.",
    image: "/assets/totalCleaning.jpg",
    detailImage: "/assets/totalCleaning.jpg",
    buttonColor: "bg-lime-600 hover:bg-lime-700",
    iconColor: "bg-lime-600",
    icon: FaMagic,
    badge: "MOST POPULAR",
    items: [
      "Everything in Regular Cleaning",
      "Baseboards, blinds & window sills",
      "Ceiling fans & interior windows",
      "Switch plates, outlets & door knobs",
      "Making the bed (master bedroom)",
    ],
    details: [
      {
        title: "Kitchen",
        image: "/assets/totalCleaning.jpg",
        items: [
          "Cleaning countertops, sink, and faucets",
          "Exterior appliance cleaning",
          "Interior microwave cleaning",
          "Detailed stovetop and kitchen surface cleaning",
          "Cabinet fronts spot-cleaned",
        ],
      },
      {
        title: "Bathrooms",
        image: "/assets/deepCleaning.webp",
        items: [
          "Detailed cleaning of toilets, sinks, showers, bathtubs, and mirrors",
          "Cleaning bathroom fixtures and surfaces",
          "Vacuuming and mopping floors",
        ],
      },
      {
        title: "Entire Home",
        image: "/assets/regularCleaning.jpg",
        items: [
          "Dusting corners, baseboards, blinds, ceiling fans, and window sills",
          "Cleaning switch plates, outlet covers, and door knobs",
          "Interior window cleaning",
          "Vacuuming, sweeping, and mopping floors",
          "Making the master bedroom bed",
          "General tidying and trash removal",
        ],
      },
    ],
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    subtitle:
      "Our most detailed service, ideal for first-time cleanings or homes needing extra attention.",
    image: "/assets/deepCleaning.webp",
    detailImage: "/assets/deepCleaning.webp",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    iconColor: "bg-yellow-500",
    icon: FaTools,
    items: [
      "Everything in Total Cleaning",
      "Windows, blinds & tracks",
      "Doors, baseboards & trim",
      "Ceiling fans, vents & light fixtures",
      "Cobweb removal & spot-cleaning",
      "Vacuum under furniture & more",
      "Interior microwave",
      "Making the bed (master bedroom)",
    ],
    details: [
      {
        title: "Kitchen",
        image: "/assets/totalCleaning.jpg",
        items: [
          "Deep cleaning of microwave inside and outside",
          "Deep cleaning of countertops, sink, and faucets",
          "Detailed exterior appliance cleaning",
          "Cleaning behind and underneath movable kitchen furniture when accessible",
          "Cabinet fronts detailed cleaned",
        ],
      },
      {
        title: "Bathrooms",
        image: "/assets/deepCleaning.webp",
        items: [
          "Deep cleaning of toilets, sinks, showers, and bathtubs",
          "Cleaning of mirrors and fixtures",
          "Detailed cleaning of bathroom surfaces",
          "Vacuuming and mopping floors",
        ],
      },
      {
        title: "Entire Home",
        image: "/assets/regularCleaning.jpg",
        items: [
          "Cleaning of windows, blinds, sills, and tracks",
          "Cleaning of doors, baseboards, and trim",
          "Cleaning of ceiling fans, vents, and light fixtures",
          "Spot-cleaning of walls with visible marks",
          "Removal of cobwebs",
          "Vacuuming under furniture when accessible",
          "Vacuuming, sweeping, and mopping all floors",
          "Making the master bedroom bed",
        ],
      },
    ],
  },
  {
    slug: "move-in-out-cleaning",
    title: "Move In / Move Out Cleaning",
    subtitle: "Designed for empty homes before moving in or after moving out.",
    image: "/assets/moveInOutCleaning.webp",
    detailImage: "/assets/moveInOutCleaning.webp",
    buttonColor: "bg-blue-900 hover:bg-blue-800",
    iconColor: "bg-blue-900",
    icon: FaHome,
    items: [
      "Deep cleaning of kitchen & bathrooms",
      "Cabinets, windows & baseboards",
      "Floors vacuumed & mopped",
      "Interior microwave",
      "Final touch-up for move readiness",
    ],
    details: [
      {
        title: "Kitchen",
        image: "/assets/totalCleaning.jpg",
        items: [
          "Deep cleaning of refrigerator, oven, and microwave inside and outside",
          "Cleaning inside cabinets and drawers",
          "Cleaning countertops, sink, and faucets",
          "Cleaning behind and underneath appliances when accessible",
        ],
      },
      {
        title: "Bathrooms",
        image: "/assets/deepCleaning.webp",
        items: [
          "Deep cleaning of toilets, sinks, showers, bathtubs, and mirrors",
          "Detailed fixture and surface cleaning",
          "Vacuuming and mopping floors",
        ],
      },
      {
        title: "Entire Home",
        image: "/assets/moveInOutCleaning.webp",
        items: [
          "Cleaning windows, blinds, sills, and tracks",
          "Cleaning doors, baseboards, trim, and reachable walls",
          "Cleaning ceiling fans and light fixtures",
          "Removal of dust, buildup, and cobwebs",
          "Vacuuming, sweeping, and mopping all floors",
          "Final touch-up cleaning for move readiness",
        ],
      },
    ],
  },
  {
    slug: "post-construction-cleaning",
    title: "Post Construction Cleaning",
    subtitle: "Perfect after renovations or remodeling projects.",
    image: "/assets/postConstructionCleaning.jpg",
    detailImage: "/assets/postConstructionCleaning.jpg",
    buttonColor: "bg-lime-600 hover:bg-lime-700",
    iconColor: "bg-lime-600",
    icon: FaHardHat,
    items: [
      "Removal of construction dust",
      "Surface wipe-down & detailing",
      "Windows, sills, baseboards & vents",
      "Floors vacuumed & mopped",
      "Interior microwave",
      "Final detailed cleaning",
    ],
    details: [
      {
        title: "Kitchen",
        image: "/assets/totalCleaning.jpg",
        items: [
          "Cleaning countertops, sink, and faucets",
          "Deep cleaning of microwave inside and outside",
          "Removal of construction dust from surfaces and exterior appliances",
        ],
      },
      {
        title: "Bathrooms",
        image: "/assets/deepCleaning.webp",
        items: [
          "Cleaning toilets, sinks, showers, bathtubs, mirrors, and fixtures",
          "Removal of dust from bathroom surfaces",
          "Vacuuming and mopping floors",
        ],
      },
      {
        title: "Entire Home",
        image: "/assets/postConstructionCleaning.jpg",
        items: [
          "Removal of construction dust throughout the home",
          "Cleaning windows, sills, blinds, baseboards, and trim",
          "Cleaning ceiling fans, vents, and light fixtures",
          "Removal of stickers, debris, and cobwebs when possible",
          "Vacuuming, sweeping, and mopping all floors",
          "Final detailed cleaning",
        ],
      },
    ],
  },
];

function ServiceCard({ service, onViewDetails }) {
  const Icon = service.icon;

  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden text-left relative transition hover:-translate-y-1 hover:shadow-xl duration-300">
      {service.badge && (
        <div className="absolute top-4 left-4 z-20 bg-lime-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {service.badge}
        </div>
      )}

      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-52 object-cover"
        />

        <div
          className={`absolute -bottom-7 left-6 w-14 h-14 rounded-full ${service.iconColor} border-4 border-white shadow-md flex items-center justify-center`}
        >
          <Icon className="text-white text-2xl" />
        </div>
      </div>

      <div className="p-6 pt-12">
        <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>

        <p className="text-gray-600 mt-3 leading-relaxed">{service.subtitle}</p>

        <ul className="mt-5 space-y-2">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-700">
              <span className="text-lime-600 font-bold mt-[1px]">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => onViewDetails(service)}
          className={`mt-6 text-white px-5 py-3 rounded-lg font-semibold transition ${service.buttonColor}`}
        >
          View Details →
        </button>
      </div>
    </article>
  );
}

function ServiceDetailView({ service, onBack, onContact }) {
  const Icon = service.icon;

  return (
    <section className="bg-white">
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.detailImage}
            alt={service.title}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-75"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <button
            type="button"
            onClick={onBack}
            className="mb-8 inline-flex items-center text-white hover:text-yellow-400 font-semibold transition"
          >
            ← Back to Services
          </button>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div
              className={`w-20 h-20 rounded-full ${service.iconColor} text-white border-4 border-white shadow-md flex items-center justify-center`}
            >
              <Icon className="text-3xl" />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {service.title}
              </h1>

              <p className="text-yellow-400 text-xl font-semibold mt-3">
                {service.subtitle}
              </p>

              <p className="text-white/90 mt-4 max-w-2xl">
                Review what is included in this cleaning service and contact us
                if you would like help choosing the best option for your home.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="space-y-10">
          {service.details.map((section) => (
            <div
              key={section.title}
              className="grid lg:grid-cols-3 gap-8 items-center border-b border-gray-200 pb-10 last:border-b-0"
            >
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-lg bg-lime-600 text-white flex items-center justify-center shadow-md">
                    <Icon className="text-2xl" />
                  </div>

                  <h2 className="text-2xl font-bold text-lime-700">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-lime-600 font-bold mt-[1px]">
                        ✔
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <img
                  src={section.image}
                  alt={`${section.title} cleaning`}
                  className="w-full h-56 object-cover rounded-xl shadow-md"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#E3FEFF] rounded-2xl shadow-md p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Ready for a cleaner home?
            </h2>

            <p className="text-description mt-2">
              Send us your information and we’ll contact you with the next
              steps.
            </p>
          </div>

          <button
            type="button"
            onClick={onContact}
            className="bg-yellow-400 text-blue-900 px-6 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            I'm Interested →
          </button>
        </div>
      </div>
    </section>
  );
}

export default function ServiceTypesPage() {
  const [showContact, setShowContact] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceSlug = params.get("service");

    if (serviceSlug) {
      const service = services.find((item) => item.slug === serviceSlug);

      if (service) {
        setSelectedService(service);

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
      }
    }
  }, []);

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowContact(false);

    window.history.pushState(null, "", `/serviceTypes?service=${service.slug}`);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleBackToServices = () => {
    setSelectedService(null);

    window.history.pushState(null, "", "/serviceTypes");

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleShowContact = () => {
    setShowContact(true);
    setSelectedService(null);

    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <main className="bg-white min-h-screen">
      <Helmet>
        <title>
          Cleaning Services in Huntsville, AL | MCJ's Cleaning Service
        </title>

        <meta
          name="description"
          content="Explore our Regular, Total, Deep, Move In/Out, and Post Construction cleaning services in Huntsville and surrounding areas."
        />

        <link
          rel="canonical"
          href="https://mcjscleaningservice.com/serviceTypes"
        />
      </Helmet>

      {selectedService ? (
        <ServiceDetailView
          service={selectedService}
          onBack={handleBackToServices}
          onContact={handleShowContact}
        />
      ) : (
        <>
          <section className="py-16 px-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-lime-600 font-bold">
                Our Cleaning Services
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mt-3 font-['Playfair_Display']">
                Every home has different needs.
              </h2>

              <p className="text-description mt-3">
                Choose the service that best fits your home.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
              {services.slice(0, 3).map((service) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
              {services.slice(3).map((service) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </section>

          <section className="px-6 pb-16">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Not sure which service you need?
                </h2>

                <p className="text-description mt-2">
                  Send us your information and we’ll contact you to help choose
                  the best cleaning option for your home.
                </p>
              </div>

              <button
                type="button"
                onClick={handleShowContact}
                className="bg-yellow-400 text-blue-900 px-6 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Contact Us →
              </button>
            </div>
          </section>
        </>
      )}

      {showContact && (
        <div id="contact">
          <ContactSection />
        </div>
      )}
    </main>
  );
}
