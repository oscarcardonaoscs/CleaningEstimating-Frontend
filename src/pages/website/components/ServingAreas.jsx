export default function ServingAreas() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white text-gray-800 py-16 text-center">
      <h2 className="text-3xl font-bold">Serving Areas</h2>
      <div className="w-16 h-1 bg-blue-500 mx-auto my-2"></div>

      <p className="text-description max-w-2xl mx-auto mt-4 px-6">
        MCJ's Cleaning Service proudly serves numerous cities and communities in Alabama:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-6">
        {[
          { name: "Huntsville", img: "/assets/rocketCity.webp", zoom: "cover" },
          { name: "Madison", img: "/assets/MadisonCity.webp", zoom: "cover" },
          { name: "Owens Cross Roads", img: "/assets/OwensCrossRoadsCity.webp", zoom: "99%" },
          { name: "Athens", img: "/assets/AthensCity.png", zoom: "85%" },
        ].map((city) => (
          <div
            key={city.name}
            className="relative bg-blue-100 text-white py-4 rounded-lg shadow-md overflow-hidden h-32 md:h-40 flex items-center justify-center group"
          >
            {/* Imagen de fondo con animación */}
            <div
              className="absolute inset-0 transition-transform duration-300 ease-in-out transform group-hover:scale-[1.4]"
              style={{
                backgroundImage: `url(${city.img})`,
                backgroundSize: city.zoom,
                backgroundPosition: "center",
              }}
            ></div>

            {/* Fondo Oscuro para Mejorar la Lectura */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Texto Encima */}
            <span className="relative font-semibold text-lg md:text-xl text-center">
              {city.name}
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-center text-lg mt-6">
        Not sure if we service your area?{" "}
        <button
          onClick={scrollToContact}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Contact us today!
        </button>
      </p>
    </section>
  );
}
