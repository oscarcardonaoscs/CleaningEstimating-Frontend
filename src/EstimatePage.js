import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Logo_MCJ.png";
import { useState } from "react";

const EstimatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimate, formData, additionalServices } = location.state || {};
  const [loading, setLoading] = useState(false);

  const additionalServicesList = Object.entries(additionalServices)
    .filter(([key, value]) => value)
    .map(([key]) => {
      switch (key) {
        case "cornersAndBaseboards":
          return "Dust corners and baseboards";
        case "blinds":
          return "Dust blinds";
        case "fansAndFixtures":
          return "Dust ceiling fans and light fixtures";
        case "switchPlates":
          return "Clean switch plates, outlet plates, doors, and door knobs";
        case "windows":
          return "Clean interior windows & window sills";
        default:
          return "";
      }
    });

  const handleBookNow = async () => {
    setLoading(true);
    try {
      navigate("/confirmation");
    } catch (error) {
      console.error("Error sending booking request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom-background flex flex-col items-center justify-center p-5">
      {/* Logo */}
      <div className="flex justify-between items-center mb-4">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
      </div>

      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#164e63" }}>
          Estimate Summary
        </h2>
        <div className="mb-4">
          <p>
            <strong>House Size:</strong> {formData.size} sqft
          </p>
        </div>
        <div className="mb-4">
          <p>
            <strong>Cleaning Type:</strong> {formData.cleaningType}
          </p>
          {formData.frequency && (
            <p>
              <strong>Frequency:</strong> {formData.frequency}
            </p>
          )}
          <p>
            <strong>Estimate:</strong> ${estimate.toFixed(2)}
          </p>
        </div>
        {formData.cleaningType === "Regular" &&
          additionalServicesList.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Additional Services:</h3>
              <ul className="list-disc list-inside">
                {additionalServicesList.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          )}

        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              navigate("/", { state: { formData, additionalServices } })
            }
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-12"
          >
            Re-calculate
          </button>
          <button
            onClick={handleBookNow}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            disabled={loading}
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimatePage;
