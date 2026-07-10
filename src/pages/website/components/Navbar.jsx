import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Logo_MCJ's_2025.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const scroll = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setIsMenuOpen(false);
    };

    if (location.pathname !== "/") {
      navigate("/");

      // Espera a que el Home se renderice antes de hacer scroll
      setTimeout(scroll, 300);
    } else {
      scroll();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className="text-black py-4 shadow-md flex items-center"
      style={{
        backgroundColor: "#E3FEFF",
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

        {/* Menú desktop */}
        <div className="hidden md:flex space-x-6 business-card text-lg">
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-yellow-400 transition"
          >
            About Us
          </button>

          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-yellow-400 transition"
          >
            Our Services
          </button>

          <button
            onClick={() => scrollToSection("reviews")}
            className="hover:text-yellow-400 transition"
          >
            Reviews
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-yellow-400 transition"
          >
            Contact Us
          </button>
        </div>

        {/* Call to Action */}
        <Link
          to="/estimating"
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
        >
          Get a Free Estimate
        </Link>

        {/* Menú móvil */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-black focus:outline-none"
            aria-label="Open menu"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Fondo bloqueador */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menú móvil deslizante */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-gray-900 text-white flex flex-col items-center py-4 z-50">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-2 right-4 text-white text-2xl"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="py-3 w-full text-center hover:text-yellow-400 border-b border-gray-600"
          >
            ABOUT US
          </button>

          <button
            onClick={() => scrollToSection("services")}
            className="py-3 w-full text-center hover:text-yellow-400 border-b border-gray-600"
          >
            OUR SERVICES
          </button>

          <button
            onClick={() => scrollToSection("reviews")}
            className="py-3 w-full text-center hover:text-yellow-400 border-b border-gray-600"
          >
            REVIEWS
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
