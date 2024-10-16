import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuoteResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimatedCost, formData } = location.state;

  const handleRecalculate = () => {
    navigate("/");
  };

  const handleSchedule = () => {
    alert("Scheduling the cleaning service!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Estimated Cost</h2>
      <p className="text-lg">House Size: {formData.size} sqft</p>
      <p className="text-lg">
        Cleaning Type: {formData.cleaningType} ({formData.frequency})
      </p>
      <p className="text-xl font-semibold mt-4">
        Estimated Price: ${estimatedCost.toFixed(2)}
      </p>

      <div className="mt-6">
        <button
          onClick={handleSchedule}
          className="bg-green-500 text-white p-2 rounded-md mr-2 hover:bg-green-600"
        >
          Schedule
        </button>
        <button
          onClick={handleRecalculate}
          className="bg-yellow-500 text-white p-2 rounded-md mr-2 hover:bg-yellow-600"
        >
          Re-calculate
        </button>
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default QuoteResult;
