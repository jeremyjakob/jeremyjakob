"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <motion.div
        className="flex justify-center font-medium items-center text-center text-slate-900 mt-8 gap-4"
        initial={{ y: -100, x: "0%", opacity: 0 }}
        animate={{ y: 0, x: "0%", opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Link href="/" className="text-4xl font-bold">
          JJ.
        </Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </motion.div>
    </header>
  );
}
