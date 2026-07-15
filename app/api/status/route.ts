import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Dr. Vrushali Email Campaign",
    version: "2.0",
    smtp_configured: !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ),
    timestamp: new Date().toISOString(),
    features: {
      daily_limit: 300,
      sending_method: "SMTP via Nodemailer",
      template: "Branded HTML (Playfair Display + Poppins)",
      progression: "Q1 → Q2 → Q3 → Q4 (row-wise)",
      deduplication: "Per subject per recipient",
      cooldown: "1 week between subjects",
    },
  });
}
