"use client";

import { useState } from "react";
import Image from "next/image";
import concert from "@/public/images/jj2.jpg";
import styles from "./page.module.css";
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
    <main className={styles.contact}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Jeremy Jakob / Contact</p>
        <h1>Let’s make<br />something<span aria-hidden="true">.</span></h1>
        <p className={styles.description}>Concerts, events, or something a little different.<br />Tell me what you have in mind.</p>
      </header>
      <div className={styles.layout}>
        <figure className={styles.photograph}>
          <Image
            src={concert}
            alt="A musician singing into a microphone and playing guitar under stage lights, photographed in black and white."
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1128px) calc((100vw - 160px) / 2), 484px"
            quality={85}
            priority
            className={styles.image}
          />
          <figcaption><span>Concert photography</span><span>Jeremy Jakob</span></figcaption>
        </figure>
        <section className={styles.formSection} aria-labelledby="form-heading">
          <div className={styles.formHeading}>
            <h2 id="form-heading">Start a conversation</h2>
            <p>A few details are a good place to start.</p>
          </div>
          <form className={styles.form} action={submitMessage}>
            <label htmlFor="senderEmail">Your email</label>
            <input
              id="senderEmail"
              name="senderEmail"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              maxLength={254}
              value={senderEmail}
              onChange={(event) => setSenderEmail(event.target.value)}
            />
            <label htmlFor="message" className={styles.messageLabel}>What do you have in mind?</label>
            <p id="message-hint" className={styles.hint}>A show, a date, a place, an idea. Whatever you know so far.</p>
            <textarea
              id="message"
              name="message"
              aria-describedby="message-hint"
              required
              maxLength={5000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <div aria-live="polite" aria-atomic="true" className={styles.status}>
              {status && <p className={status.error ? styles.error : styles.success}>{status.text}</p>}
            </div>
            <SubmitBtn />
          </form>
          <div className={styles.directEmail}>
            <p>Prefer to write directly?</p>
            <a href="mailto:jeremyjakob31@gmail.com">jeremyjakob31@gmail.com <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </div>
    </main>
  );
}
