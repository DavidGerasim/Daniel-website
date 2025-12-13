"use client";
import { motion } from "framer-motion";

const Gallery = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
    >
      gallery
    </motion.section>
  );
};

export default Gallery;
