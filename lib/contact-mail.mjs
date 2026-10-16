const deliveryError = "Your message could not be sent. Please try again or email Jeremy directly below.";

export async function deliverContactMessage(formData, { apiKey, from, to, send, logError = console.error }) {
  const rawEmail = formData.get("senderEmail");
  const rawMessage = formData.get("message");
  const senderEmail = typeof rawEmail === "string" ? rawEmail.trim() : "";
  const message = typeof rawMessage === "string" ? rawMessage.trim() : "";

  if (senderEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
    return { error: "Please enter a valid email address." };
  }
  if (!message || message.length > 5000) {
    return { error: "Please enter a message of up to 5,000 characters." };
  }
  if (!apiKey) {
    logError("Contact email unavailable: RESEND_API_KEY is not configured.");
    return { error: deliveryError };
  }

  try {
    const { data, error } = await send({
      from,
      to,
      replyTo: senderEmail,
      subject: "New inquiry from jeremyjakob.org",
      text: `New portfolio inquiry\n\nFrom: ${senderEmail}\n\n${message}`,
    });
    if (error || !data?.id) {
      // Log only the error category, never the visitor's email or message.
      logError("Contact email rejected:", error?.name || "missing_message_id");
      return { error: deliveryError };
    }
    return { success: true };
  } catch {
    logError("Contact email failed: delivery service request did not complete.");
    return { error: deliveryError };
  }
}
