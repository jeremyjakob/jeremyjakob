"use server";

import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/email-form";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // Simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "Jeremyjakob31@gmail.com",
      subject: "Message from contact form",
      replyTo: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
