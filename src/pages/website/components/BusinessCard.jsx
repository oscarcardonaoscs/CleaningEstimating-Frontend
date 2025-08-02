import logo from "../assets/logo_MCJs.png";
import { FaFacebook } from "react-icons/fa";

export default function BusinessCard() {
  return (
    <div className="business-card max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-teal-50 p-6 text-center">
        <img src={logo} alt="MCJ’s Logo" className="mx-auto w-40" />
      </div>
      <div className="p-6 space-y-2 text-center">
        <h1 className="text-xl font-bold">MCJ’s Cleaning Service, LLC</h1>
        <p className="text-gray-600">Licensed & Insured</p>
        <p className="text-gray-800 uppercase">
          Residential & Commercial Cleaning
        </p>
      </div>
      <ul className="divide-y divide-gray-200">
        {/* Contacto */}
        <li className="flex items-center p-4">
          <img src="/icons/phone.svg" alt="Phone" className="w-8 h-8" />
          <a href="tel:+15512270373" className="ml-3 text-gray-800">
            551 227 0373
          </a>
        </li>
        <li className="flex items-center p-4">
          <img src="/icons/web.svg" alt="Phone" className="w-8 h-8" />
          <a
            href="https://mcjscleaningservice.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gray-800"
          >
            https://mcjscleaningservice.com
          </a>
        </li>
        <li className="flex items-center p-4">
          <FaFacebook className="w-8 h-8 text-[#1877F2]" />
          <a
            href="https://facebook.com/mcjscleaning"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gray-800"
          >
            mcjscleaning
          </a>
        </li>
      </ul>
    </div>
  );
}
