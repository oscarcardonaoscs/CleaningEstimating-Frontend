const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-custom-background p-5">
      <header className="bg-custom-background p-1 rounded-md flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Cleaning Quote Calculator
        </h1>
      </header>

      {/* Contenedor principal con flex-grow para empujar el footer hacia abajo cuando sea necesario */}

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
