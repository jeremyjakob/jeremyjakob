"use server";

import { Resend } from "resend";
import { deliverContactMessage } from "@/lib/contact-mail.mjs";

export async function sendEmail(formData) {
  const apiKey = process.env.RESEND_API_KEY;
  return deliverContactMessage(formData, {
    apiKey,
    from: process.env.CONTACT_FROM_EMAIL || "Jeremy Jakob Portfolio <onboarding@resend.dev>",
    to: "Jeremyjakob31@gmail.com",
    send: (email) => new Resend(apiKey).emails.send(email),
  });
}
