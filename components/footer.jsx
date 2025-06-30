import React from "react";
import Link from "next/link";

import { FaBluesky, FaTiktok } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

export default function Footer() {
  return (
    <>
      <div className="flex items-center justify-center text-2xl text-slate-950">
        <a
          href="https://bsky.app/profile/jeremyjakob.org"
          target="_blank"
          className="mr-4"
        >
          <FaBluesky />
        </a>
        <a
          href="https://www.tiktok.com/@jeremyjakob?_t=ZP-8x9rAoEcsSE&_r=1"
          target="_blank"
          className="mr-4"
        >
          <IoLogoInstagram />
        </a>
        <a
          href="https://www.tiktok.com/@jeremyjakob?_t=ZP-8x9rAoEcsSE&_r=1"
          target="_blank"
        >
          <FaTiktok />
        </a>
      </div>
      <div className="mt-3 mb-1 flex justify-center text-slate-950 items-center">
        &copy; 2025 Jeremy Jakob - All rights reserved.
      </div>
      <div className="text-xs flex justify-center text-slate-800 items-center mb-5">
        made with ♥ by emmanuela f.m.
      </div>
    </>
  );
}
