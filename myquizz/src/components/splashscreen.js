// components/SplashScreen.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "./logo";
import "./SplashScreen.css";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/manage");
    }, 4000); // 4 seconds splash

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="splash-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Animated Logo with Glow */}
      <motion.div
        className="logo-wrapper"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: [0.8, 1, 1.05, 1],
          opacity: 1,
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <Logo />
      </motion.div>

      {/* App Name with Gradient Animation */}
      <motion.h1
        className="app-title"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        GAIN KNOWLEDGE
      </motion.h1>

      {/* Tagline with Floating Effect */}
      <motion.p
        className="app-tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{
          delay: 1.2,
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        Connecting people with opportunities through modern design & innovation.
      </motion.p>

      {/* Loading Dots */}
      <div className="loading-dots">
        {["●", "●", "●"].map((dot, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.2, y: 0 }}
            animate={{ opacity: 1, y: -6 }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              delay: i * 0.25,
              repeatType: "reverse",
            }}
          >
            {dot}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
