"use client";

import React from "react";
import { sendEmail } from "@/api/sendEmail";
import SubmitBtn from "@/components/submit";
import toast from "react-hot-toast";
import image2 from "@/public/images/jj2.jpg";
import image3 from "@/public/images/jj3.jpg";
import Image from "next/image";

export default function Contact() {
  return (
    <section className="">
      <div className="flex items-center justify-center font-medium text-3xl mt-40">
        <p>{`Let's talk about your next project!`}</p>
      </div>
      <p className="flex items-center justify-center text-gray-700 mt-5">
        Please reach out through this form:
      </p>

      <form
        className="mt-10 flex flex-col items-center"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);
          if (error) {
            toast.error(error);
            return;
          }
          toast.success("Email sent successfully");
        }}
      >
        <input
          className="h-15 w-100 p-4 rounded-lg border border-gray-400/[0.3] bg-gray-50"
          name="senderEmail"
          type="email"
          required
          maxLength={100}
          placeholder="Your email"
        />
        <textarea
          className="h-50 w-100 my-3 rounded-lg border border-gray-400/[0.3] p-4 mb-5"
          name="message"
          required
          maxLength={5000}
          placeholder="Your message"
        />
        <div className="flex items-center justify-center mb-34">
          <SubmitBtn />
        </div>
      </form>
    </section>
  );
}
