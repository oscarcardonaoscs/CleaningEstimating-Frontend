import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaCheck, FaStar, FaComment } from "react-icons/fa";
import BASE_URL from "./config.js";

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

  // Verificar si estimateData está disponible
  if (!estimate) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>
            No se encontraron datos de estimación. Por favor, vuelve a calcular.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Extraer los datos de la respuesta del backend
  const {
    estimated_price,
    cleaning_type,
    recommendations,
    upgrade_to_total_fee,
  } = estimate;

  const handleFinalBooking = async () => {
    setLoading(true);
    console.log(
      "Sending booking request:",
      JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        house_size: Number(formData.size),
        cleaning_type: formData.cleaningType,
        frequency: formData.frequency,
        estimate: parseFloat(estimated_price),
        recommendations: recommendations || [],
        address1: addressData.address1,
        address2: addressData.address2,
        city: addressData.city,
        postal_zip: addressData.zip,
        upgrade_to_total_fee: upgrade_to_total_fee,
      })
    );
    try {
      // Aquí enviarás la información de addressData al backend para generar el correo
      await fetch(`${BASE_URL}/schedule-booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          house_size: Number(formData.size),
          cleaning_type: formData.cleaningType,
          frequency: formData.frequency,
          estimate: parseFloat(estimated_price),
          recommendations: recommendations || [],
          address1: addressData.address1,
          address2: addressData.address2,
          city: addressData.city,
          postal_zip: addressData.zip,
          upgrade_to_total_fee: upgrade_to_total_fee,
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
    <div className="min-h-screen bg-custom-background p-5">
      <header className="bg-custom-background p-1 rounded-md flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Cleaning Quote Calculator
        </h1>
      </header>

      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#164e63" }}>
          Estimate Summary
        </h2>
        <div className="mb-4">
          <p>
            <strong>House Size:</strong> {formData.size} sqft
          </p>
        </div>

        {/* Mostrar el precio del Deep Cleaning si el tipo es "Deep" */}
        {cleaning_type === "Deep" && (
          <div className="mb-4">
            <p>
              <strong>Deep Cleaning:</strong> $
              {estimated_price?.toFixed(2) || "N/A"}
            </p>
          </div>
        )}

        {/* Mostrar el precio de la primera limpieza si no es "Deep" */}
        {cleaning_type !== "Deep" && (
          <div className="mb-4">
            <p>
              <strong>{cleaning_type} First-time Cleaning:</strong> $
              {estimated_price?.toFixed(2) || "N/A"}
            </p>
          </div>
        )}

        {/* Mostrar recomendaciones si existen */}
        {recommendations && recommendations.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-4">
              {cleaning_type === "Deep"
                ? "After Deep Cleaning, these are our cleaning plans:"
                : "Recommended Cleaning Plans:"}
            </h3>
            <ul className="space-y-4">
              {recommendations.map((rec, index) => (
                <li key={index} className="border p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {rec.type === "Total" ? (
                        <FaStar className="text-yellow-500 mr-2 w-5 h-5" />
                      ) : (
                        <FaCheck className="text-green-500 mr-2 w-5 h-5" />
                      )}
                      <strong>
                        {rec.type} Cleaning ({rec.frequency}) — $
                        {rec.estimate.toFixed(2)} per visit
                      </strong>
                    </div>
                  </div>
                  <p className="text-gray-600">{rec.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Nota adicional */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <FaComment className="text-blue-500 mr-2 w-5 h-5" />{" "}
            {cleaning_type &&
            (cleaning_type === "Regular" || cleaning_type === "Deep") ? (
              <p className="text-sm text-gray-600">
                For an additional ${upgrade_to_total_fee ?? 0}, you can request
                a <strong>Total Cleaning</strong> whenever you need it.
              </p>
            ) : cleaning_type === "Total" ? (
              <p className="text-sm text-gray-600">
                The <strong>Regular</strong> and <strong>Total</strong> cleaning
                services can be alternated according to your needs.
              </p>
            ) : null}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between mt-6 ">
          <button
            onClick={() =>
              navigate("/estimating", {
                state: { formData, additionalServices },
              })
            }
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Re-calculate
          </button>
          <button
            onClick={() => setShowAddressForm(true)}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-0"
            disabled={loading}
          >
            I’m Interested
          </button>
        </div>

        {/* Formulario de dirección */}
        {showAddressForm && (
          <>
            <hr className="my-6 border-gray-300" />
            <div className="mt-6">
              <h3 className="text-lg font-semibold">
                Where Would You Like the Service?
              </h3>
              <div className="flex flex-col mt-4 space-y-4">
                <input
                  type="text"
                  name="address1"
                  value={addressData.address1}
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      address1: e.target.value,
                    })
                  }
                  placeholder="Address 1"
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="address2"
                  value={addressData.address2}
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      address2: e.target.value,
                    })
                  }
                  placeholder="Address 2 (optional)"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="city"
                  value={addressData.city}
                  onChange={(e) =>
                    setAddressData({ ...addressData, city: e.target.value })
                  }
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
                  onChange={(e) =>
                    setAddressData({ ...addressData, zip: e.target.value })
                  }
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
                  Send My Inquiry
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EstimatePage;
