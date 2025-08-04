import {
  FaUserCheck,
  FaCalendarAlt,
  FaMobileAlt,
  FaStar,
} from "react-icons/fa";

export default function TrustedSection() {
  return (
    <section className="bg-[#F5FEFF] py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Iconos y títulos */}
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <FaUserCheck size={40} className="mx-auto text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">Experienced Cleaners</h3>
          </div>
          <div>
            <FaCalendarAlt size={40} className="mx-auto text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">Flexible Scheduling</h3>
          </div>
          <div>
            <FaMobileAlt size={40} className="mx-auto text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">Online Booking</h3>
          </div>
          <div>
            <FaStar size={40} className="mx-auto text-blue-600" />
            <h3 className="text-lg font-semibold mt-2">
              Satisfaction Guaranteed
            </h3>
          </div>
        </div>

        {/* Texto descriptivo */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted for Quality, Chosen for Reliability
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            We believe a clean home is a happy home. At MCJ's Cleaning Service,
            we deliver professional, detail-oriented cleaning tailored to your
            needs. With a strong commitment to customer satisfaction, we make it
            easy to enjoy a fresh, healthy space—without the stress. Whether you
            need a quick refresh or a deep clean, you can count on us to get the
            job done right.
          </p>
        </div>
      </div>
    </section>
  );
}
