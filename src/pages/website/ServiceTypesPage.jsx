import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

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

function ServiceCard({ service }) {
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

        <Link
          to={`/services/${service.slug}`}
          className={`inline-block mt-6 text-white px-5 py-3 rounded-lg font-semibold transition ${service.buttonColor}`}
        >
          View Details →
        </Link>
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
                Available for homes in Huntsville and Madison, AL, subject to
                scheduling and service-area availability. Review what is
                included and contact us for a personalized estimate.
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

const serviceSEOMetadata = {
  "regular-cleaning": {
    title: "Regular House Cleaning Huntsville & Madison, AL | MCJ",
    description:
      "Recurring house cleaning in Huntsville and Madison, AL. Regular service covers kitchens, bathrooms, dusting, and floors. Ask MCJ for a free estimate.",
  },
  "total-cleaning": {
    title: "Total House Cleaning Huntsville & Madison, AL | MCJ",
    description:
      "Total Cleaning in Huntsville and Madison, AL adds baseboards, blinds, ceiling fans and interior windows to our Regular service. Get a free estimate.",
  },
  "deep-cleaning": {
    title: "Deep Cleaning Huntsville & Madison, AL | MCJ",
    description:
      "Deep house cleaning in Huntsville and Madison, AL, including detailed bathrooms, kitchens, baseboards, blinds and window areas. Request an estimate.",
  },
  "move-in-out-cleaning": {
    title: "Move-In/Out Cleaning Huntsville & Madison, AL | MCJ",
    description:
      "Move-in and move-out cleaning for empty homes in Huntsville and Madison, AL. Detailed kitchens, bathrooms, cabinets, appliances and floors.",
  },
  "post-construction-cleaning": {
    title: "Post-Construction Cleaning Huntsville & Madison, AL | MCJ",
    description:
      "Post-construction cleaning for homes in Huntsville and Madison, AL after renovation or remodeling. Detailed dust removal and surface cleaning.",
  },
};

export default function ServiceTypesPage() {
  const { serviceSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const selectedService = serviceSlug
    ? services.find((service) => service.slug === serviceSlug)
    : null;

  // Preserve old shared URLs such as /serviceTypes?service=deep-cleaning.
  useEffect(() => {
    if (serviceSlug) return;
    const legacySlug = new URLSearchParams(location.search).get("service");
    if (legacySlug && services.some((service) => service.slug === legacySlug)) {
      navigate(`/services/${legacySlug}`, { replace: true });
    }
  }, [serviceSlug, location.search, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setShowContact(false);
  }, [serviceSlug]);

  const handleBackToServices = () => navigate("/serviceTypes");

  const handleShowContact = () => {
    if (serviceSlug) {
      navigate("/");

      setTimeout(() => {
        const contactSection = document.getElementById("contact");

        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);

      return;
    }

    setShowContact(true);

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  useEffect(() => {
    if (serviceSlug && !selectedService)
      navigate("/serviceTypes", { replace: true });
  }, [serviceSlug, selectedService, navigate]);

  const title = selectedService
    ? serviceSEOMetadata[selectedService.slug].title
    : "Cleaning Services Huntsville & Madison, AL | MCJ";
  const description = selectedService
    ? serviceSEOMetadata[selectedService.slug].description
    : "Explore Regular, Total, Deep, Move-In/Out and Post-Construction cleaning in Huntsville and Madison, AL. Find the right service and request an estimate.";
  const canonical = selectedService
    ? `https://mcjscleaningservice.com/services/${selectedService.slug}`
    : "https://mcjscleaningservice.com/serviceTypes";

  return (
    <main className="bg-white min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:image"
          content="https://mcjscleaningservice.com/assets/regularCleaning.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://mcjscleaningservice.com/assets/regularCleaning.jpg"
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

              <h1 className="text-4xl font-bold text-gray-900 mt-3 font-['Playfair_Display']">
                Our Cleaning Services in Huntsville & Madison, AL
              </h1>

              <p className="text-description mt-3">
                Every home has different needs. Explore professional cleaning
                options for homes in Huntsville and Madison, Alabama.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
              {services.slice(3).map((service) => (
                <ServiceCard key={service.slug} service={service} />
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
