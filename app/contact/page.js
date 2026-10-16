"use client";

import { useState } from "react";
import { sendEmail } from "@/api/sendEmail";
import SubmitBtn from "@/components/submit";

export default function Contact() {
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  async function submitMessage(formData) {
    setStatus(null);
    try {
      const result = await sendEmail(formData);
      if (!result.success) {
        setStatus({ error: true, text: result.error || "Your message could not be sent. Please email Jeremy directly below." });
        return;
      }
      setSenderEmail("");
      setMessage("");
      setStatus({ error: false, text: "Thank you. Your message has been sent to Jeremy." });
    } catch {
      setStatus({ error: true, text: "Your message could not be sent. Please try again or email Jeremy directly below." });
    }
  }

  return (
    <main className="mx-auto mt-20 mb-24 w-full max-w-lg px-6 sm:mt-32">
      <h1 className="text-center text-3xl font-medium leading-tight text-slate-950">
        Let’s talk about your next project.
      </h1>
      <p className="mt-5 text-center leading-relaxed text-gray-700">
        Send a note about what you have in mind.
      </p>
      <form className="mt-10 flex flex-col" action={submitMessage}>
        <label htmlFor="senderEmail" className="mb-2 text-sm font-medium text-slate-950">Your email</label>
        <input
          id="senderEmail"
          className="h-14 w-full rounded-lg border border-gray-300 bg-gray-50 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          name="senderEmail"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={senderEmail}
          onChange={(event) => setSenderEmail(event.target.value)}
        />
        <label htmlFor="message" className="mt-6 mb-2 text-sm font-medium text-slate-950">Your message</label>
        <textarea
          id="message"
          className="min-h-48 w-full rounded-lg border border-gray-300 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          name="message"
          required
          maxLength={5000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div aria-live="polite" aria-atomic="true" className="mt-4 text-sm leading-relaxed">
          {status && <p className={status.error ? "text-red-800" : "text-green-800"}>{status.text}</p>}
        </div>
        <div className="mt-5 flex justify-center"><SubmitBtn /></div>
      </form>
      <p className="mt-8 text-center text-sm leading-relaxed text-gray-700">
        Prefer email? <a className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4" href="mailto:Jeremyjakob31@gmail.com">Jeremyjakob31@gmail.com</a>
      </p>
    </main>
  );
}
