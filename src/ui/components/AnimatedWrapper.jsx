"use client"; // Importante para que pueda usar hooks

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedWrapper({ children }) {
  const pathname = usePathname(); // Obtiene la ruta actual

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
