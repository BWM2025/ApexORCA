/**
 * Send one email via Resend API. Plain Node.js — no npx/tsx (works on Big Sur when npx fails).
 * Requires: RESEND_API_KEY and EMAIL_FROM in env.
 * Usage: EMAIL_TO=... EMAIL_SUBJECT=... EMAIL_BODY=... node scripts/send_email_resend.js
 */
const fs = require("fs");
const path = require("path");

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "ApexORCA <noreply@apexorca.io>";
const ERROR_FILE = process.env.RESEND_ERROR_FILE;
const FALLBACK_ERROR_FILE = path.join(__dirname, ".last-resend-error.txt");

function die(msg) {
  const out = msg + "\n";
  try {
    if (ERROR_FILE) fs.writeFileSync(ERROR_FILE, out, "utf8");
    fs.writeFileSync(FALLBACK_ERROR_FILE, out, "utf8");
  } catch (_) {}
  process.stderr.write(out);
  process.exit(1);
}

function getArgs() {
  const to = process.env.EMAIL_TO || process.argv[2];
  const subject = process.env.EMAIL_SUBJECT || process.argv[3];
  const body = process.env.EMAIL_BODY || process.argv[4];
  if (!to || !subject) {
    die("Usage: EMAIL_TO=... EMAIL_SUBJECT=... EMAIL_BODY=... node scripts/send_email_resend.js");
  }
  const html = body || "<p>No body provided.</p>";
  return { to, subject, html };
}

async function main() {
  if (!RESEND_API_KEY) {
    die("RESEND_API_KEY is not set.");
  }
  const { to, subject, html } = getArgs();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [to],
      subject,
      html,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    die(`Resend API error: ${res.status} ${JSON.stringify(data)}`);
  }
  console.log("Sent:", data.id || "ok");
}

main().catch((err) => {
  die("Error: " + String(err));
});
