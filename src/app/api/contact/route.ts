import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

export const runtime = "nodejs";

const CONTACT_EMAIL = "contact@yogeshbuilds.in";
const FROM_PORTFOLIO = "Portfolio <hello@yogeshbuilds.in>";
const FROM_YOGESH = "Yogesh <hello@yogeshbuilds.in>";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  projectType?: string;
}

interface DeliveryResults {
  notification: boolean;
  autoReply: boolean;
  whatsapp: boolean;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toIstTimestamp(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return `${formatter.format(date)} IST`;
}

function toWhatsAppAddress(value: string): string {
  return value.startsWith("whatsapp:") ? value : `whatsapp:${value}`;
}

async function sendNotificationEmail(
  resend: Resend | null,
  payload: ContactPayload,
  timestamp: string,
): Promise<boolean> {
  if (!resend) {
    return false;
  }

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");
  const replyMailto = `mailto:${payload.email}?subject=${encodeURIComponent(
    `Re: your message via yogeshbuilds.in`,
  )}`;

  try {
    await resend.emails.send({
      from: FROM_PORTFOLIO,
      to: CONTACT_EMAIL,
      subject: `New message from ${payload.name} via yogeshbuilds.in`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="margin-bottom: 12px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Timestamp:</strong> ${escapeHtml(timestamp)}</p>
          <p><strong>Message:</strong><br />${safeMessage}</p>
          <p style="margin-top: 20px;">
            <a href="${replyMailto}" style="display:inline-block;padding:10px 16px;background:#2A6B4F;color:#fff;text-decoration:none;border-radius:4px;">
              Reply to ${safeName}
            </a>
          </p>
        </div>
      `,
      text: `New portfolio message\n\nName: ${payload.name}\nEmail: ${payload.email}\nTimestamp: ${timestamp}\n\nMessage:\n${payload.message}\n\nReply: ${payload.email}`,
      replyTo: payload.email,
    });
    return true;
  } catch (error) {
    console.error("Notification email failed:", error);
    return false;
  }
}

async function sendAutoReply(
  resend: Resend | null,
  payload: ContactPayload,
): Promise<boolean> {
  if (!resend) {
    return false;
  }

  const safeName = escapeHtml(payload.name);

  try {
    await resend.emails.send({
      from: FROM_YOGESH,
      to: payload.email,
      replyTo: CONTACT_EMAIL,
      subject: "Got your message! I'll be in touch soon.",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.65;">
          <p>Hey ${safeName}, thanks for reaching out - really appreciate it!</p>
          <p>I've received your message and will get back to you personally within 24 hours.</p>
          <p>Talk soon, Yogesh</p>
        </div>
      `,
      text: `Hey ${payload.name}, thanks for reaching out - really appreciate it!\nI've received your message and will get back to you personally within 24 hours.\nTalk soon, Yogesh`,
    });
    return true;
  } catch (error) {
    console.error("Auto-reply email failed:", error);
    return false;
  }
}

async function sendWhatsAppNotification(
  payload: ContactPayload,
  timestampIst: string,
): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.WHATSAPP_NUMBER ?? "+917448624928";

  if (!accountSid || !authToken || !from || !to) {
    console.error("[TWILIO] Missing required Twilio environment variables.");
    return false;
  }

  try {
    const client = twilio(accountSid, authToken);
    await client.messages.create({
      from: toWhatsAppAddress(from),
      to: toWhatsAppAddress(to),
      body: `📬 New message on yogeshbuilds.in

👤 Name: ${payload.name}
📧 Email: ${payload.email}
💬 Message: ${payload.message}

⏰ ${timestampIst}`,
    });
    return true;
  } catch (error) {
    console.error("[TWILIO] WhatsApp notification failed:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<ContactPayload>;
    const name = (payload.name ?? "").trim();
    const email = (payload.email ?? "").trim();
    const message = (payload.message ?? "").trim();
    const projectType = (payload.projectType ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    const resend = process.env.RESEND_API_KEY
      ? new Resend(process.env.RESEND_API_KEY)
      : null;
    const now = new Date();
    const timestamp = now.toISOString();
    const timestampIst = toIstTimestamp(now);
    const cleanPayload: ContactPayload = { name, email, message, projectType };

    const [notificationResult, autoReplyResult, whatsappResult] = await Promise.all([
      sendNotificationEmail(resend, cleanPayload, timestamp),
      sendAutoReply(resend, cleanPayload),
      sendWhatsAppNotification(cleanPayload, timestampIst),
    ]);

    const results: DeliveryResults = {
      notification: notificationResult,
      autoReply: autoReplyResult,
      whatsapp: whatsappResult,
    };

    const successCount = Object.values(results).filter(Boolean).length;

    if (successCount === 0) {
      return NextResponse.json(
        { ok: false, error: "Failed to process your submission. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      partial: successCount < 3,
      results,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong while submitting your message." },
      { status: 500 },
    );
  }
}
