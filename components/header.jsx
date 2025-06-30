"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
};

export default function Header() {
  return (
    <AnimatePresence mode="wait">
      <motion.nav
        className="flex justify-center font-medium items-center text-center text-slate-900 mt-8 gap-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={navbarVariants}
        transition={{ duration: 0.7 }}
      >
        <Link
          href="/"
          onClick={(e) => handleLinkClick(e, "/")}
          className="text-4xl font-bold"
        >
          JJ.
        </Link>
        <Link href="/about" onClick={(e) => handleLinkClick(e, "/about")}>
          About
        </Link>
        <Link href="/blog" onClick={(e) => handleLinkClick(e, "/blog")}>
          Blog
        </Link>
        <Link href="/contact" onClick={(e) => handleLinkClick(e, "/contact")}>
          Contact
        </Link>
      </motion.nav>
    </AnimatePresence>
  );
}
