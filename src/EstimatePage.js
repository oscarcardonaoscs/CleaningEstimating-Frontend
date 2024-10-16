import { useNavigate, useLocation } from "react-router-dom";

const EstimatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimate, formData, additionalServices } = location.state || {};

  const additionalServicesList = Object.entries(additionalServices)
    .filter(([key, value]) => value)
    .map(([key]) => {
      switch (key) {
        case "cornersAndBaseboards":
          return "Dust corners and baseboards (20%)";
        case "blinds":
          return "Dust blinds (25%)";
        case "fansAndFixtures":
          return "Dust ceiling fans and light fixtures (10%)";
        case "switchPlates":
          return "Clean switch plates, outlet plates, doors, and door knobs (20%)";
        case "windows":
          return "Clean interior windows & window sills (25%)";
        default:
          return "";
      }
    });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Estimate Summary</h2>
      <div className="mb-4">
        <p>
          <strong>House Size (sq ft):</strong> {formData.size}
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

      {/* Button to re-calculate */}
      <button
        onClick={() =>
          navigate("/", { state: { formData, additionalServices } })
        }
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Re-calculate
      </button>
    </div>
  );
};

export default EstimatePage;
