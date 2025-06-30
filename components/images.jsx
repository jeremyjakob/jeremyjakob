import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { gallery } from "@/lib/data";

export default function Images() {
  // each column takes 1st/2nd halves of gallery
  const firstHalf = gallery.slice(0, Math.ceil(gallery.length / 2));
  const secondHalf = gallery.slice(Math.ceil(gallery.length / 2));

  return (
    <div className="row justify-center mt-10">
      <motion.div
        className="column mr-4 ml-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
        }}
      >
        {firstHalf.map((item, index) => (
          <Image
            key={index}
            src={item.imageUrl}
            alt={item.description}
            width="400"
            height="200"
            quality="95"
            className="rounded-lg hover:scale-102 transition mb-4"
          />
        ))}
      </motion.div>

      <motion.div
        className="column justify-center items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
        }}
      >
        {secondHalf.map((item, index) => (
          <Image
            key={index}
            src={item.imageUrl}
            alt={item.description}
            quality="95"
            width="400"
            height="200"
            className="rounded-lg hover:scale-102 transition mb-4"
          />
        ))}
      </motion.div>
    </div>
  );
}
