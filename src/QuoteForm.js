import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Logo_MCJ.png";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    size: "",
    cleaningType: "Regular",
    frequency: "",
    name: "",
    phone: "",
    email: "",
    additionalServices: {
      cornersAndBaseboards: false,
      blinds: false,
      fansAndFixtures: false,
      switchPlates: false,
      windows: false,
    },
  });

  const cleaningDescriptions = {
    Regular: [
      "• Cleaning bathrooms (toilet, shower, sink, floor)",
      "• Dust all surfaces throughout home",
      "• Cleaning the kitchen",
      "• Vacuuming and mopping floors",
      "• Emptying trash bins",
    ],
    Total: [
      "• Cleaning bathrooms (toilet, shower, sink, floor)",
      "• Dust all surfaces throughout home",
      "• Cleaning the kitchen",
      "• Vacuuming and mopping floors",
      "• Emptying trash bins",
      "• Dusting corners, baseboards, blinds, ceiling fans, and window sills",
      "• Cleaning switch plates, outlet plates, and door knobs",
      "• Cleaning interior windows & window sills",
    ],
    Deep: [
      "• Baseboards",
      "• Trim work",
      "• Interior windows & blinds",
      "• Exterior cabinets & drawers",
      "• Light Fixtures",
      "• Doors",
      "• Deep clean all surfaces",
      "• Vacuum and & mop under all furniture",
      "• Vacuum sofas - under cushions, and pillows",
    ],
  };

  const cleaningTitles = {
    Regular: "Regular Cleaning",
    Total: "Total Cleaning",
    Deep: "Deep Cleaning",
  };

  const cleaningObjectives = {
    Regular:
      "Designed to maintain your home in perfect condition through consistent, recurring cleanings, ensuring a fresh and welcoming environment.",
    Total:
      "We meticulously care for every corner of your home, including hard-to-reach areas, leaving it spotless. Ideal for a complete refresh or whenever you desire that total clean feeling!",
    Deep: "A comprehensive one-time cleaning service that targets hard-to-reach places and thoroughly cleans the entire home, ensuring every inch shines.",
  };

  const [errors, setErrors] = useState({
    size: "",
    frequency: "",
    name: "",
    contact: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validation for house size
    if (name === "size") {
      if (!/^\d+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          size: "Please enter a valid integer value",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, size: "" }));
      }
    }

    // Validación para el teléfono
    if (name === "phone") {
      const phoneRegex = /^[\d\s-]{10,15}$/; // Acepta números, espacios y guiones entre 10 y 15 caracteres
      if (!phoneRegex.test(value.replace(/[-\s]/g, ""))) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone:
            "Phone number must be 10 digits, optionally with spaces or dashes",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
      }
    }

    // Validation for frequency
    if (name === "frequency") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          frequency: "Please select a frequency",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, frequency: "" }));
      }
    }

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        additionalServices: {
          ...prevData.additionalServices,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Pre-load data if navigating from the estimate page
  useEffect(() => {
    if (location.state) {
      const { formData, additionalServices } = location.state;
      setFormData((prevData) => ({
        ...prevData,
        ...formData,
        additionalServices: { ...additionalServices },
      }));
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;

    // Validación del nombre
    if (!formData.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }

    // Validación del teléfono
    const phoneRegex = /^[0-9]{10}$|^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}$/;
    const isPhoneValid = formData.phone && phoneRegex.test(formData.phone);

    if (formData.phone && !isPhoneValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone:
          "Phone number must be 10 digits, optionally with spaces or dashes",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }

    // Validación del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = formData.email && emailRegex.test(formData.email);

    if (formData.email && !isEmailValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    // Verificación: al menos uno debe ser válido
    if (!isPhoneValid && !isEmailValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "At least one contact method is required",
        email: "At least one contact method is required",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: isPhoneValid ? "" : prevErrors.phone,
        email: isEmailValid ? "" : prevErrors.email,
      }));
    }

    // Validación del tamaño de la casa
    if (!formData.size) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        size: "House size is required",
      }));
      setShowTooltip(true);
      hasErrors = true;
    } else if (!/^\d+$/.test(formData.size) || Number(formData.size) <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        size: "House size must be a valid integer greater than 0",
      }));
      hasErrors = true;
    } else {
      setShowTooltip(false);
    }

    // Validación de frecuencia para limpiezas Regular y Total
    if (
      (formData.cleaningType === "Regular" ||
        formData.cleaningType === "Total") &&
      !formData.frequency
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        frequency: "Frequency is required for Regular and Total cleaning",
      }));
      hasErrors = true;
    }

    // Si no hay errores, realiza la solicitud al backend
    if (!hasErrors) {
      // Realiza la solicitud POST al backend
      fetch("https://18.117.130.47:8000/calculate-estimate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          size_sqft: formData.size,
          cleaning_type: formData.cleaningType,
          frequency: formData.frequency,
          additional_services: formData.additionalServices,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Redirige a la página de estimado con el resultado del backend
          navigate("/estimate", {
            state: {
              estimate: data.estimate,
              formData,
              additionalServices: formData.additionalServices,
            },
          });

          // Opcionalmente, resetea el formulario
          setFormData({
            size: "",
            cleaningType: "Regular",
            frequency: "",
            name: "",
            phone: "",
            email: "",
            additionalServices: {
              cornersAndBaseboards: false,
              blinds: false,
              fansAndFixtures: false,
              switchPlates: false,
              windows: false,
            },
          });
        })
        .catch((error) => {
          console.error("Error calculating estimate:", error);
        });
    }

    // Log de formData (para depuración)
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-custom-background p-5">
      {/* Encabezado de la página */}
      <header className="bg-custom-background p-4 rounded-md flex justify-between items-center mb-6">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
        <h1 className="text-2xl sm:text-3xl font-bold text-right">
          Cleaning Quote Calculator
        </h1>
      </header>

      {/* Contenedor con responsive grid */}
      <div className="p-5 max-w-4lg w-full mx-auto bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Columna izquierda: Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#164e63" }}
            >
              Contact Information
            </h2>

            {/* Otros controles del formulario */}
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 mt-2 border rounded-md ${
                  errors.name ? "border-red-500" : ""
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-2 mt-2 border rounded-md ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 mt-2 border rounded-md ${
                  errors.contact ? "border-red-500" : ""
                }`}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-2">{errors.contact}</p>
              )}
            </div>

            <h2
              className="text-xl sm:text-2xl font-bold mb-4"
              style={{ color: "#164e63" }}
            >
              Tell Us About Your Home
            </h2>

            {/* House Size */}
            <div className="mb-4">
              <label className="block text-gray-700">House Size (sqft):</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className={`w-full p-2 mt-2 border rounded-md ${
                  errors.size ? "border-red-500" : ""
                }`}
                required
              />
              {showTooltip && (
                <p className="text-red-500 text-sm mt-2">{errors.size}</p>
              )}
            </div>

            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#164e63" }}
            >
              What Type of Cleaning Would You Like?
            </h2>

            {/* Frequency */}
            {(formData.cleaningType === "Regular" ||
              formData.cleaningType === "Total") && (
              <div className="mb-4">
                <label className="block text-gray-700">Frequency:</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className={`w-full p-2 mt-2 border rounded-md ${
                    errors.frequency ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select frequency</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="One-time">One-time</option>
                </select>
                {errors.frequency && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.frequency}
                  </p>
                )}
              </div>
            )}

            {/* Cleaning Type */}
            <div className="mb-4">
              <label className="block text-gray-700">Cleaning Type:</label>
              <select
                name="cleaningType"
                value={formData.cleaningType}
                onChange={handleChange}
                className="w-full p-2 mt-2 border rounded-md"
              >
                <option value="Regular">Regular</option>
                <option value="Total">Total</option>
                <option value="Deep">Deep</option>
              </select>
            </div>

            {/* Cleaning Description (solo para móvil) */}
            <div className="p-4 border-l border-gray-200 sm:hidden">
              <h3
                className="text-xl sm:text-2xl font-bold mb-4"
                style={{ color: "#155e75" }}
              >
                {cleaningTitles[formData.cleaningType]}
              </h3>
              <p className="text-gray-700 mb-2">
                {cleaningObjectives[formData.cleaningType]}
              </p>
              <p className="text-gray-700">
                {cleaningDescriptions[formData.cleaningType].map(
                  (line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  )
                )}
              </p>
            </div>

            {/* Additional Services */}
            {formData.cleaningType === "Regular" && (
              <div className="mb-4">
                <label className="block text-gray-700">
                  Additional Services:
                </label>
                <div>
                  <input
                    type="checkbox"
                    name="cornersAndBaseboards"
                    checked={formData.additionalServices.cornersAndBaseboards}
                    onChange={handleChange}
                    className="transform scale-125"
                  />
                  <label className="ml-2">Dust corners and baseboards</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="blinds"
                    checked={formData.additionalServices.blinds}
                    onChange={handleChange}
                    className="transform scale-125"
                  />
                  <label className="ml-2">Dust blinds</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="fansAndFixtures"
                    checked={formData.additionalServices.fansAndFixtures}
                    onChange={handleChange}
                    className="transform scale-125"
                  />
                  <label className="ml-2">
                    Dust ceiling fans and light fixtures
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="switchPlates"
                    checked={formData.additionalServices.switchPlates}
                    onChange={handleChange}
                    className="transform scale-125"
                  />
                  <label className="ml-2">
                    Clean switch plates, outlet plates, doors, and door knobs
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="windows"
                    checked={formData.additionalServices.windows}
                    onChange={handleChange}
                    className="transform scale-125"
                  />
                  <label className="ml-2">
                    Clean interior windows & window sills
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Get Estimate
            </button>
          </form>

          {/* Columna derecha: Descripción dinámica del tipo de limpieza (solo en Desktop) */}
          <div className="p-4 border-l border-gray-200 hidden sm:block">
            <h3
              className="text-xl sm:text-2xl font-bold mb-4"
              style={{ color: "#155e75" }}
            >
              {cleaningTitles[formData.cleaningType]}
            </h3>
            <p className="text-gray-700 mb-2">
              {cleaningObjectives[formData.cleaningType]}
            </p>
            <p className="text-gray-700">
              {cleaningDescriptions[formData.cleaningType].map(
                (line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
