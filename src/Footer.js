import { FaFacebook, FaGoogle } from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#00B5D9] p-4 text-white flex justify-between items-center">
      <div className="w-1/3">
        <p>&copy; {new Date().getFullYear()} MCJ's Cleaning Service.</p>
        <p>Created by Oscar Cardona</p>
      </div>

      <div className="w-1/3 flex justify-center items-center gap-6">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/mcjscleaning"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="MCJ's Cleaning Service on Facebook"
          title="Facebook"
          className="transition-transform duration-200 hover:scale-110"
        >
          <FaFacebook size={24} />
        </a>

        {/* Google Business Profile */}
        <a
          href="https://www.google.com/maps/place/MCJ's+Cleaning+Service/@34.7079478,-86.8867823,11z/data=!3m1!4b1!4m6!3m5!1s0x8770d0dbc5f7d1c1:0x3c59563c0f3f4b04!8m2!3d34.7077765!4d-86.721975!16s%2Fg%2F11zgflydmh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="MCJ's Cleaning Service on Google"
          title="Google Business Profile"
          className="transition-transform duration-200 hover:scale-110"
        >
          <FaGoogle size={24} />
        </a>

        {/* Nextdoor */}
        <a
          href="https://nextdoor.com/page/mcjs-cleaning-service-huntsville-al"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="MCJ's Cleaning Service on Nextdoor"
          title="Nextdoor"
          className="transition-transform duration-200 hover:scale-110"
        >
          <img
            src="/icons/nextdoor-logo.jpeg"
            alt="Nextdoor"
            className="w-7 h-7 object-cover rounded"
          />
        </a>
      </div>

      <div className="w-1/3 flex justify-end">
        <Link
          to="/privacy-policy"
          className="text-sm text-white hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
