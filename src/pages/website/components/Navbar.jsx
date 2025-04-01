import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../Logo_MCJ_transparent.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Obtiene la ruta actual

  const scrollToSection = (id) => {
    const scroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false); // Cierra el menú después de hacer clic
    };

    if (location.pathname !== "/") {
      navigate("/"); // Regresa a la página principal
      setTimeout(scroll, 300); // Espera un poco antes de hacer scroll
    } else {
      scroll();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <nav
      className="bg-blue-900 text-black py-4 shadow-md flex items-center"
      style={{
        backgroundImage:
          "url('https://duyn491kcolsw.cloudfront.net/files/0k/0kn/0knbtk.jpg?ph=09e1b66bd0')",
        backgroundPosition: "center center",
        backgroundAttachment: "scroll",
        height: "80px",
      }}
    >
      <div className="container mx-auto flex justify-between items-center px-4 w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="MCJ's Cleaning Service Logo"
            className="w-24 h-24 object-contain"
          />
        </Link>

        {/* Menú para desktop */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-yellow-400"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("serving")}
            className="hover:text-yellow-400"
          >
            Serving Areas
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-yellow-400"
          >
            Our Services
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-yellow-400"
          >
            Contact Us
          </button>
        </div>

        {/* Call to Action */}
        <Link
          to="/estimating"
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500"
        >
          Get a Free Estimate
        </Link>

        {/* Menú móvil (ícono de hamburguesa) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-black focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* 🔹 Fondo bloqueador */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 🔹 Menú móvil deslizante */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-gray-900 text-white flex flex-col items-center py-4 z-50">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-2 right-4 text-white text-2xl"
          >
            <FaTimes />
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="py-3 w-full text-center hover:text-yellow-400 border-b border-gray-600"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection("serving")}
            className="py-3 w-full text-center hover:text-yellow-400 border-b border-gray-600"
          >
            SERVING AREAS
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="py-3 w-full text-center hover:text-yellow-400 border-b border-gray-600"
          >
            OUR SERVICES
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="py-3 w-full text-center hover:text-yellow-400"
          >
            CONTACT US
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
