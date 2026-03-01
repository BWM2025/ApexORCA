// lib/email.ts — Purchase confirmation + download links via Resend
// © 2026 ApexORCA.io. Set RESEND_API_KEY and EMAIL_FROM in env to enable.

import { Resend } from "resend";
import { getDownloadLinks } from "@/lib/downloads";

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.EMAIL_FROM || "ApexORCA <noreply@apexorca.io>";
const baseUrl = process.env.NEXT_PUBLIC_URL || "https://apexorca.io";

export function isEmailConfigured(): boolean {
  return Boolean(resendApiKey && fromAddress);
}

export async function sendPurchaseEmail(params: {
  to: string;
  productId: string;
  productName?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!resendApiKey) {
    return { ok: false, error: "RESEND_API_KEY not set" };
  }
  if (!fromAddress) {
    return { ok: false, error: "EMAIL_FROM not set" };
  }

  const links = getDownloadLinks(params.productId);
  const listHtml =
    links.length > 0
      ? links
          .map(
            (l) =>
              `<li><a href="${baseUrl}${l.href}">${l.label}</a></li>`
          )
          .join("")
      : "<li>Visit your success page for links.</li>";
  const subject = `Your ApexORCA purchase — ${params.productName || params.productId}`;
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; max-width: 600px;">
  <h2>Thank you for your purchase</h2>
  <p>Your download links:</p>
  <ul>${listHtml}</ul>
  <p>You can also access them anytime at: <a href="${baseUrl}/success">${baseUrl}/success</a></p>
  <p>— ApexORCA</p>
</body>
</html>`;

  try {
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [params.to],
      subject,
      html,
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: String(error.message) };
    }
    console.log("[email] Sent purchase confirmation to", params.to, data?.id);
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] Send failed:", msg);
    return { ok: false, error: msg };
  }
}
