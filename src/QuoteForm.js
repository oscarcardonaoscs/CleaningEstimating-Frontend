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

    // Validate name
    if (!formData.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }

    // Validate contact (phone or email)
    if (!formData.phone && !formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "Phone or Email is required",
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, contact: "" }));
    }

    // Validate house size
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

    // Validate frequency for Regular and Total cleaning
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

    // If no errors, calculate the estimate
    if (!hasErrors) {
      const estimate = calculateEstimate(
        formData.size,
        formData.cleaningType,
        formData.frequency,
        formData.additionalServices
      );

      // Redirect to the estimate page with the form data
      navigate("/estimate", {
        state: {
          estimate,
          formData,
          additionalServices: formData.additionalServices,
        },
      });

      // Optionally reset form data
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
    }
    // Log form data (for debugging purposes)
    console.log(formData);
  };

  // Function to calculate the estimate
  const calculateEstimate = (
    size,
    cleaningType,
    frequency,
    additionalServices
  ) => {
    const sqft = Number(size);
    let factor = 0;
    let factorTotal = 0;

    if (cleaningType === "Regular") {
      switch (frequency) {
        case "Weekly":
          factor = 0.03;
          break;
        case "Bi-weekly":
          factor = 0.04;
          break;
        case "Monthly":
          factor = 0.05;
          break;
        case "One-time":
          factor = 0.06;
          break;
        default:
          break;
      }
      factorTotal = factor + 0.02;
    } else if (cleaningType === "Total") {
      switch (frequency) {
        case "Weekly":
          factor = 0.05;
          break;
        case "Bi-weekly":
          factor = 0.06;
          break;
        case "Monthly":
          factor = 0.07;
          break;
        case "One-time":
          factor = 0.08;
          break;
        default:
          break;
      }
    } else if (cleaningType === "Deep") {
      factor = 0.2;
    }

    let estimate = sqft * factor;
    console.log("Regular estimate: " + estimate);
    console.log("Total estimate: " + sqft * factorTotal);
    if (cleaningType === "Regular") {
      if (additionalServices.cornersAndBaseboards) {
        estimate += (sqft * factorTotal - sqft * factor) * 0.2;
      }
      if (additionalServices.blinds) {
        estimate += (sqft * factorTotal - sqft * factor) * 0.25;
      }
      if (additionalServices.fansAndFixtures) {
        estimate += (sqft * factorTotal - sqft * factor) * 0.1;
      }
      if (additionalServices.switchPlates) {
        estimate += (sqft * factorTotal - sqft * factor) * 0.2;
      }
      if (additionalServices.windows) {
        estimate += (sqft * factorTotal - sqft * factor) * 0.25;
      }
    }

    console.log("Final estimate: " + estimate);

    return estimate;
  };

  return (
    <div className="min-h-screen bg-custom-background p-5">
      {/* Encabezado de la página */}
      <header className="bg-custom-background p-4 rounded-md flex justify-between items-center mb-6">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
        <h1 className="text-2xl sm:text-3xl font-bold text-right">
          ESTIMATE CALCULATOR
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
                  errors.contact ? "border-red-500" : ""
                }`}
              />
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
              <h2 className="text-lg font-medium text-gray-800">
                Cleaning Description
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Obtener descripción dinámica
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
            <h2 className="text-lg font-medium text-gray-800">
              Cleaning Description
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Obtener descripción dinámica
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
