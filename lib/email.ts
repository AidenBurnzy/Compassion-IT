import { Resend } from "resend";

type ContactEmailArgs = {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  message?: string;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:13px;font-family:Arial,Helvetica,sans-serif;white-space:nowrap;vertical-align:top;width:110px;">${label}</td>
      <td style="padding:8px 0;color:#111827;font-size:14px;font-family:Arial,Helvetica,sans-serif;vertical-align:top;">${value}</td>
    </tr>`;
}

function buildHtml({ name, email, phone, topic, message }: ContactEmailArgs) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone ?? "");
  const safeTopic = escapeHtml(topic ?? "");
  const safeMessage = escapeHtml(message ?? "");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">

        <tr>
          <td style="background:#0f0f0f;padding:28px 32px;border-bottom:3px solid #dc143c;">
            <p style="margin:0;color:#f2a5b3;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">CompassionIT Consulting</p>
            <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:600;font-family:Arial,Helvetica,sans-serif;">New Contact Form Submission</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 0;">
            <table cellpadding="0" cellspacing="0" width="100%">
              ${row("Name", safeName)}
              ${row("Email", `<a href="mailto:${safeEmail}" style="color:#dc143c;text-decoration:none;">${safeEmail}</a>`)}
              ${phone ? row("Phone", `<a href="tel:${safePhone}" style="color:#dc143c;text-decoration:none;">${safePhone}</a>`) : ""}
              ${topic ? row("Topic", safeTopic) : ""}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0;">
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 20px;">
            <p style="margin:0 0 12px;font-size:13px;color:#6b7280;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:1px;">Details</p>
            <p style="margin:0;font-size:15px;color:#111827;line-height:1.7;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;">${safeMessage || "(no message provided)"}</p>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 32px;">
            <a href="mailto:${safeEmail}?subject=Re%3A%20Your%20CompassionIT%20Inquiry"
               style="display:inline-block;background:#dc143c;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:4px;font-size:14px;font-family:Arial,sans-serif;">
              Reply to ${safeName}
            </a>
          </td>
        </tr>

        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;color:#9ca3af;font-family:Arial,sans-serif;">Submitted via compassionitconsulting.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendContactNotification(args: ContactEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const toRaw = process.env.EMAIL_TO;

  if (!apiKey || !from || !toRaw) {
    console.warn("Email env vars not configured — skipping notification.");
    return;
  }

  const to = toRaw.split(",").map((e) => e.trim()).filter(Boolean);
  const resend = new Resend(apiKey);
  const { name, email, phone, topic, message } = args;

  const plainText = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    topic ? `Topic: ${topic}` : "",
    message ? `\nMessage:\n${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `New CompassionIT Inquiry: ${name}`,
    html: buildHtml(args),
    text: plainText,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
