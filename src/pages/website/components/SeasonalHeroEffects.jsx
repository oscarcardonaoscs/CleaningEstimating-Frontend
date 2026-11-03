import { motion, useReducedMotion } from "framer-motion";

// 🍂 Hojas para Thanksgiving
const autumnLeaves = [
  { left: "5%", delay: 0, duration: 15, drift: 80, icon: "🍂", size: 24 },
  { left: "17%", delay: 5, duration: 19, drift: -65, icon: "🍁", size: 20 },
  { left: "31%", delay: 9, duration: 17, drift: 75, icon: "🍂", size: 26 },
  { left: "47%", delay: 3, duration: 21, drift: -80, icon: "🍁", size: 22 },
  { left: "62%", delay: 12, duration: 18, drift: 65, icon: "🍂", size: 24 },
  { left: "76%", delay: 7, duration: 20, drift: -70, icon: "🍁", size: 20 },
  { left: "90%", delay: 14, duration: 16, drift: -90, icon: "🍂", size: 25 },
];

// ❄️ Copos de nieve para Christmas
const snowflakes = [
  { left: "4%", delay: 0, duration: 17, drift: 35, size: 15 },
  { left: "12%", delay: 5, duration: 21, drift: -25, size: 11 },
  { left: "23%", delay: 9, duration: 18, drift: 45, size: 18 },
  { left: "34%", delay: 2, duration: 24, drift: -35, size: 12 },
  { left: "45%", delay: 13, duration: 20, drift: 30, size: 16 },
  { left: "56%", delay: 7, duration: 23, drift: -45, size: 11 },
  { left: "67%", delay: 11, duration: 19, drift: 35, size: 17 },
  { left: "78%", delay: 4, duration: 22, drift: -30, size: 13 },
  { left: "87%", delay: 15, duration: 18, drift: 40, size: 15 },
  { left: "95%", delay: 8, duration: 25, drift: -35, size: 12 },
];

export default function SeasonalHeroEffects({ seasonId }) {
  const reduceMotion = useReducedMotion();

  // Respetar configuración de accesibilidad
  if (reduceMotion || !seasonId) return null;

  const isThanksgiving = ["thanksgiving", "thanksgiving-day"].includes(
    seasonId,
  );

  const isChristmas = seasonId === "christmas";

  if (!isThanksgiving && !isChristmas) return null;

  const particles = isThanksgiving ? autumnLeaves : snowflakes;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[5] overflow-hidden pointer-events-none"
    >
      {particles.map((particle, index) => (
        <motion.span
          key={`${seasonId}-${index}`}
          className="absolute top-0 select-none"
          style={{
            left: particle.left,
            fontSize: `${particle.size}px`,
            lineHeight: 1,
            opacity: 0,
            willChange: "transform",
            textShadow: isChristmas ? "0 0 6px rgba(255,255,255,0.35)" : "none",
          }}
          initial={{
            y: "-10vh",
            x: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, particle.drift / 2, particle.drift],
            rotate: isThanksgiving ? [0, 160, 360] : [0, 20, -20],
            opacity: isThanksgiving ? [0, 0.75, 0.75, 0] : [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.2, 0.8, 1],
          }}
        >
          {isThanksgiving ? particle.icon : "❄"}
        </motion.span>
      ))}
    </div>
  );
}
