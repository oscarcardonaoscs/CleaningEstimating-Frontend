import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#00B5D9] p-4 text-white flex justify-between items-center">
      <div className="w-1/3">
        <p>&copy; {new Date().getFullYear()} MCJ's Cleaning Service.</p>
        <p>Created by Oscar Cardona</p>
      </div>

      <div className="w-1/3 flex justify-center">
        <a
          href="https://www.facebook.com/mcjscleaning"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={24} />
        </a>
      </div>
      <div className="w-1/3"></div>
    </footer>
  );
}

export default Footer;
