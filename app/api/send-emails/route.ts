import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildEmailTemplate } from "@/lib/email-template";

interface EmailPayload {
  api_secret: string;
  recipients: string[];
  subject: string;
  body: string;
  quote: string;
  quarter: string;
  batch_info: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload: EmailPayload = await request.json();

    // Verify API secret
    const apiSecret = process.env.API_SECRET;
    if (!apiSecret || payload.api_secret !== apiSecret) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Validate payload
    if (
      !payload.recipients ||
      !Array.isArray(payload.recipients) ||
      payload.recipients.length === 0
    ) {
      return NextResponse.json(
        { status: "error", message: "No recipients provided" },
        { status: 400 }
      );
    }

    if (!payload.subject || !payload.body) {
      return NextResponse.json(
        { status: "error", message: "Subject and body are required" },
        { status: 400 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build HTML template
    const appUrl = process.env.APP_URL || "https://www.drvrushali.com";
    const htmlBody = buildEmailTemplate(
      payload.subject,
      payload.body,
      payload.quote || "",
      appUrl
    );

    // Send emails
    const sentEmails: string[] = [];
    const failedEmails: { email: string; error: string }[] = [];

    for (const recipient of payload.recipients) {
      try {
        await transporter.sendMail({
          from: `"Dr. Vrushali" <${process.env.SMTP_USER}>`,
          to: recipient,
          subject: payload.subject,
          html: htmlBody,
        });
        sentEmails.push(recipient);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        failedEmails.push({ email: recipient, error: errorMessage });
      }
    }

    return NextResponse.json({
      status: "success",
      sent_count: sentEmails.length,
      failed_count: failedEmails.length,
      sent_emails: sentEmails,
      failed_emails: failedEmails,
      quarter: payload.quarter,
      batch_info: payload.batch_info,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "email-sender",
    timestamp: new Date().toISOString(),
  });
}