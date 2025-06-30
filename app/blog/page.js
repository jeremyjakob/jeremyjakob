"use client";
import React from "react";
import Preloader from "@/components/preloader";
import Image from "next/image";
import cat from "@/public/images/image.png";

export default function Blog() {
  return (
    <Preloader>
      <div className="flex items-center justify-center mt-20 mb-22 text-3xl font-medium text-gray-500">
        blog under construction...
      </div>
      <div className="flex items-center justify-center mb-70">
        <Image
          src={cat}
          width="400"
          height="200"
          quality="95"
          alt="cat in a construction hat"
        />
      </div>
    </Preloader>
  );
}
