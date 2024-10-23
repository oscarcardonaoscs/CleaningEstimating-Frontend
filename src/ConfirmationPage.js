import React from "react";
import logo from "./Logo_MCJ.png";

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-custom-background flex flex-col items-center justify-center p-5">
      {/* Encabezado fuera del cuadro blanco */}
      <div className="flex items-center justify-start mb-6">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
      </div>

      {/* Cuadro blanco con el mensaje de confirmación */}
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#164e63" }}>
          Thank you for your Booking request!
        </h2>
        <p className="mb-4">
          We have received your service request. We will contact you shortly
          with the available times to schedule your service.
        </p>
        <p className="mb-6">
          If you have any questions, feel free to contact us.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
