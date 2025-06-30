"use client";

import React from "react";
import Image from "next/image";
import jeremy from "@/public/images/jeremy.png";
import Preloader from "@/components/preloader";

export default function About() {
  return (
    <Preloader>
      <div className="flex justify-center items-center mt-20">
        <Image
          src={jeremy}
          width="400"
          height="200"
          alt="Jeremy"
          quality="95"
          className="h-75 w-75 rounded-full object-cover border-[0.35rem] border-gray-50 shadow-xl"
        />
      </div>
      <div className="flex justify-center items-center text-center text-slate-950 mt-8 mb-80 gap-4">
        Jeremy Jakob is an event photographer.
      </div>
    </Preloader>
  );
}
