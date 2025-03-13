import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Componente para los íconos de verificación y error
const Icon = ({ type }) => {
  if (type === "check") {
    return (
      <svg
        className="w-3 h-3 text-green-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 12"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5.917 5.724 10.5 15 1.5"
        />
      </svg>
    );
  } else if (type === "cross") {
    return (
      <svg
        className="w-3 h-3 text-red-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    );
  }
  return null;
};

// Componente para las filas de la tabla
const ServiceRow = ({ service, status }) => {
  return (
    <div className="grid grid-cols-2 px-3 py-2 text-sm text-gray-700 border-b border-gray-200 gap-x-3 dark:border-gray-700">
      <div className="text-gray-700 dark:text-gray-400 text-left">
        {service}
      </div>
      <div className="flex justify-center">
        <Icon type={status ? "check" : "cross"} />
      </div>
    </div>
  );
};

// Componente para cada slide del carrusel
const ServiceSlide = ({ services, title }) => {
  return (
    <div className="w-full">
      <div className="overflow-hidden">
        <div className="grid grid-cols-2 p-4 text-sm font-bold text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white text-center">
          <div>Service</div>
          <div>{title}</div>
        </div>
        {services.map((service, index) => (
          <ServiceRow
            key={index}
            service={service.service}
            status={service.status}
          />
        ))}
      </div>
    </div>
  );
};

const ServiceCarousel = () => {
  const services = [
    {
      service: "Cleaning bathrooms (toilet, shower, sink, floor)",
      regular: true,
      total: true,
      deep: true,
    },
    { service: "Dusting all surfaces", regular: true, total: true, deep: true },
    { service: "Cleaning the kitchen", regular: true, total: true, deep: true },
    {
      service: "Vacuuming & mopping floors",
      regular: true,
      total: true,
      deep: true,
    },
    {
      service:
        "Dusting corners, baseboards, blinds, ceilings fans and window sills",
      regular: false,
      total: true,
      deep: true,
    },
    {
      service: "Clean switch plates, outlet plates, and door knobs",
      regular: false,
      total: true,
      deep: true,
    },
    {
      service: "Clean interior windows",
      regular: false,
      total: true,
      deep: true,
    },
    {
      service: "Deep clean all surfaces",
      regular: false,
      total: false,
      deep: true,
    },
    {
      service: "Vacuum & mop UNDER ALL furniture",
      regular: false,
      total: false,
      deep: true,
    },
    {
      service: "Vacuum sofas - under cushions, and pillows",
      regular: false,
      total: false,
      deep: true,
    },
    {
      service: "Clean light fixtures, blinds, and vents",
      regular: false,
      total: false,
      deep: true,
    },
    {
      service: "Cleaning small stains on walls, doors, and baseboards",
      regular: false,
      total: false,
      deep: true,
    },
  ];

  // Dividir los servicios en tres grupos para los slides
  const regularServices = services.map((s) => ({
    service: s.service,
    status: s.regular,
  }));
  const totalServices = services.map((s) => ({
    service: s.service,
    status: s.total,
  }));
  const deepServices = services.map((s) => ({
    service: s.service,
    status: s.deep,
  }));

  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={4000}
      transitionTime={800}
      showStatus={false}
    >
      <ServiceSlide services={regularServices} title="Regular Cleaning" />
      <ServiceSlide services={totalServices} title="Total Cleaning" />
      <ServiceSlide services={deepServices} title="Deep Cleaning" />
    </Carousel>
  );
};

export default ServiceCarousel;
