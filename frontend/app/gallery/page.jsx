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
      className="h-screen flex items-center justify-center text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl md:text-6xl font-semibold">
          <span className="text-accent">Coming</span> Soon
        </h1>

        <p className="text-lg text-muted-foreground max-w-md">
          We’re currently working on this section to bring you something great.
        </p>
      </div>
    </motion.section>
  );
};

export default Gallery;
