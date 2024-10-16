import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Logo_MCJ.png";

const EstimatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimate, formData, additionalServices } = location.state || {};

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

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Logo */}
      <div className="flex justify-between items-center mb-4">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
      </div>

      <div className="p-5 max-w-lg mx-auto bg-white shadow-md rounded-lg">
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
          {/* Mostrar la frecuencia seleccionada debajo del tipo de limpieza */}
          {formData.frequency && (
            <p>
              <strong>Frequency:</strong> {formData.frequency}
            </p>
          )}
          <p>
            <strong>Estimate:</strong> ${estimate.toFixed(2)}
          </p>
        </div>
        {/* Show additional services only if applicable */}
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
          {/* Button to re-calculate */}
          <button
            onClick={() =>
              navigate("/", { state: { formData, additionalServices } })
            }
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Re-calculate
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimatePage;
