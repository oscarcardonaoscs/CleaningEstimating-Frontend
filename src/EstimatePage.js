import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Logo_MCJ.png";
import { useState } from "react";

const EstimatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { estimate, formData, additionalServices } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "Alabama",
    zip: "",
  });

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

  const handleBookNow = () => {
    setShowAddressForm(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFinalBooking = async () => {
    setLoading(true);
    try {
      // Aquí enviarás la información de addressData al backend para generar el correo
      await fetch("http://localhost:8000/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          addressData,
          estimate,
        }),
      });

      navigate("/confirmation");
    } catch (error) {
      console.error("Error sending booking request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {" "}
      {/* Centra el contenido */}
      <div
        className="container"
        style={{
          minHeight: "100vh",
          paddingTop: "20px",
          backgroundColor: "#E3FEFF",
        }}
      >
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

          {showAddressForm && (
            <>
              <hr className="my-6 border-gray-300" />
              <div className="mt-6">
                <h3 className="text-lg font-semibold">
                  Service will be provided at your location
                </h3>
                <div className="flex flex-col mt-4 space-y-4">
                  <input
                    type="text"
                    name="address1"
                    value={addressData.address1}
                    onChange={handleAddressChange}
                    placeholder="Address 1"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="address2"
                    value={addressData.address2}
                    onChange={handleAddressChange}
                    placeholder="Address 2 (optional)"
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    value={addressData.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value="Alabama"
                    readOnly
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={addressData.zip}
                    onChange={handleAddressChange}
                    placeholder="Postal/Zip"
                    className="border p-2 rounded"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleFinalBooking}
                    className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                    disabled={loading}
                  >
                    BOOK
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimatePage;
