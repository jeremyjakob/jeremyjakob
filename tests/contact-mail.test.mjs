import test from "node:test";
import assert from "node:assert/strict";
import { deliverContactMessage } from "../lib/contact-mail.mjs";

function form(email = "visitor@example.com", message = "A concert inquiry") {
  const data = new FormData();
  data.set("senderEmail", email);
  data.set("message", message);
  return data;
}

function options(send) {
  return {
    apiKey: "test-only-not-a-real-key",
    from: "Portfolio <onboarding@resend.dev>",
    to: "owner@example.com",
    send,
    logError: () => {},
  };
}

test("reports success only after provider acceptance and sets the visitor as reply-to", async () => {
  let sent;
  const result = await deliverContactMessage(form(" visitor@example.com ", " Hello\nthere "), options(async (email) => {
    sent = email;
    return { data: { id: "accepted-message" }, error: null };
  }));
  assert.deepEqual(result, { success: true });
  assert.equal(sent.to, "owner@example.com");
  assert.equal(sent.replyTo, "visitor@example.com");
  assert.ok(sent.text.endsWith("Hello\nthere"));
});

test("provider-returned errors cannot produce false success or expose provider details", async () => {
  const result = await deliverContactMessage(form(), options(async () => ({
    data: null, error: { name: "validation_error", message: "private service details" },
  })));
  assert.ok(result.error);
  assert.equal(result.success, undefined);
  assert.ok(!result.error.includes("private service details"));
});

test("exceptions and missing acceptance IDs produce visible failure", async () => {
  for (const send of [async () => { throw new Error("network failure"); }, async () => ({ data: {}, error: null })]) {
    const result = await deliverContactMessage(form(), options(send));
    assert.ok(result.error);
    assert.equal(result.success, undefined);
  }
});

test("missing credentials do not call the provider", async () => {
  const result = await deliverContactMessage(form(), {
    ...options(() => assert.fail("Must not send without credentials")), apiKey: undefined,
  });
  assert.ok(result.error);
});

test("rejects invalid addresses, whitespace-only messages, oversized values and file inputs", async () => {
  const invalid = [form("invalid"), form("visitor@example.com\nBcc: spam@example.com"), form("visitor@example.com", "  "), form("visitor@example.com", "x".repeat(5001)), form("x".repeat(255) + "@example.com")];
  const fileForm = form();
  fileForm.set("message", new Blob(["not text"]));
  invalid.push(fileForm);
  for (const data of invalid) {
    const result = await deliverContactMessage(data, options(() => assert.fail("Must not send invalid input")));
    assert.ok(result.error);
  }
});
