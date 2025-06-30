"use client";

import Images from "@/components/images";
import { motion } from "motion/react";

import Preloader from "@/components/preloader";
export default function Home() {
  return (
    <Preloader>
      <main>
        <motion.div
          className="bg-slate-300 absolute top-[-6rem] -z-20 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <motion.div
          className="bg-gray-300 absolute top-[-1rem] -z-20 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] 
        md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <Images />
      </main>
    </Preloader>
  );
}
