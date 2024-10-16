import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
        formData.frequency
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
  const calculateEstimate = (size, cleaningType, frequency) => {
    const sqft = Number(size);
    let factor = 0;

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

    return sqft * factor;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
    >
      {/* Customer Name */}
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

      {/* House Size */}
      <div className="mb-4">
        <label className="block text-gray-700">House Size (sq ft):</label>
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
            <p className="text-red-500 text-sm mt-2">{errors.frequency}</p>
          )}
        </div>
      )}

      {/* Additional Services */}
      {formData.cleaningType === "Regular" && (
        <div className="mb-4">
          <label className="block text-gray-700">Additional Services:</label>
          <div>
            <input
              type="checkbox"
              name="cornersAndBaseboards"
              checked={formData.additionalServices.cornersAndBaseboards}
              onChange={handleChange}
            />
            <label className="ml-2">Dust corners and baseboards (20%)</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="blinds"
              checked={formData.additionalServices.blinds}
              onChange={handleChange}
            />
            <label className="ml-2">Dust blinds (25%)</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="fansAndFixtures"
              checked={formData.additionalServices.fansAndFixtures}
              onChange={handleChange}
            />
            <label className="ml-2">
              Dust ceiling fans and light fixtures (10%)
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="switchPlates"
              checked={formData.additionalServices.switchPlates}
              onChange={handleChange}
            />
            <label className="ml-2">
              Clean switch plates, outlet plates, doors, and door knobs (20%)
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="windows"
              checked={formData.additionalServices.windows}
              onChange={handleChange}
            />
            <label className="ml-2">
              Clean interior windows & window sills (25%)
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
  );
};

export default QuoteForm;
