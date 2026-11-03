import { motion } from "framer-motion";
import { getActiveSeason } from "../config/seasonalConfig";

export default function SeasonalBar() {
  const season = getActiveSeason();

  if (!season) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-4 py-3 text-center"
      style={{
        backgroundColor: season.backgroundColor,
        color: season.textColor,
      }}
      role="note"
    >
      <p className="mx-auto max-w-5xl text-sm font-medium md:text-base">
        {season.message}
      </p>
    </motion.div>
  );
}
