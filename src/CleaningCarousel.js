import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";

const CleaningCarousel = ({ onSelectCleaningType }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const cleaningServices = [
    {
      type: "Regular Cleaning",
      description:
        "Includes basic cleaning like bathrooms, kitchens, and floors.",
    },
    {
      type: "Total Cleaning",
      description: "Adds dusting of corners, blinds, and interior windows.",
    },
    {
      type: "Deep Cleaning",
      description:
        "Comprehensive cleaning, including furniture and light fixtures.",
    },
  ];

  return (
    <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
      <Slider {...settings}>
        {cleaningServices.map((service, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              {service.type}
            </h3>
            <p style={{ fontSize: "1rem", color: "#555" }}>
              {service.description}
            </p>
            <button
              onClick={() => onSelectCleaningType(service.type)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Select
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CleaningCarousel;
