import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getActiveSeason } from "../config/seasonalConfig";

export default function SeasonalSection() {
  const season = getActiveSeason();

  if (!season?.section) return null;

  const { section } = season;

  return (
    <section
      aria-label="Seasonal Cleaning"
      className="py-16 md:py-24 px-5 md:px-8"
      style={{
        backgroundColor: season.backgroundColor,
      }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Seasonal content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: season.textColor }}
          >
            {section.eyebrow}
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {section.title}
          </h2>

          <div className="w-16 h-1 bg-yellow-400 my-6" />

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            {section.description}
          </p>

          <Link
            to="/estimating"
            className="inline-flex items-center justify-center bg-yellow-400 text-blue-900 px-7 py-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
          >
            Get a Free Estimate
          </Link>
        </motion.div>

        {/* Seasonal image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <img
            src={section.image}
            alt={section.imageAlt}
            loading="lazy"
            className="w-full h-72 md:h-[420px] object-cover rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
