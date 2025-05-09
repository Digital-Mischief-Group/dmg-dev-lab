"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Types
interface AnimatedProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Variants for stagger animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Sequential fade-in effect for form elements
export function AnimatedFormContainer({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedFormItem({ children, delay = 0, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Fade-in animation for headings
export function AnimatedHeading({ children, delay = 0, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Slide-in animation for text
export function AnimatedText({ children, delay = 0.1, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Button animation
export function AnimatedButton({ children, delay = 0.2, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Logo animation
export function AnimatedLogo({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
