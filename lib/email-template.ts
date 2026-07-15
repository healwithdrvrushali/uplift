export function buildEmailTemplate(
  subject: string,
  body: string,
  quote: string,
  appUrl: string
): string {
  const logoUrl = `${appUrl}/logo.png`;

  const paragraphs = body
    .split("\n")
    .filter((p) => p.trim() !== "");

  let bodyHtml = "";
  for (const paragraph of paragraphs) {
    bodyHtml += `<p style="font-family:'Poppins',Arial,sans-serif; font-size:16px; line-height:27px; color:#544762; margin:0 0 18px 0;">${paragraph.trim()}</p>`;
  }

  // Strip leading/trailing quotes from quote to avoid double-quoting
  const cleanQuote = quote.replace(/^[""\u201C\u201D]+|[""\u201C\u201D]+$/g, "").trim();
  const quoteSection = cleanQuote
    ? `<tr><td style="padding: 30px 44px 6px 44px;" class="fluid-padding">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="border-left:3px solid #d9b355; padding: 4px 0 4px 22px;">
        <p style="font-family:'Playfair Display',Georgia,serif; font-style:italic; font-size:20px; line-height:29px; color:#5c2f78; margin:0;">\u201C${cleanQuote}\u201D</p>
        </td></tr></table></td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${subject}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
body, table, td { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
@media only screen and (max-width: 620px) {
.email-container { width: 100% !important; }
.fluid-padding { padding-left: 20px !important; padding-right: 20px !important; }
.headline { font-size: 30px !important; line-height: 38px !important; }
.stat-td { display: block !important; width: 100% !important; padding: 10px 0 !important; text-align: center !important; }
.stat-divider { display: none !important; }
}
</style>
</head>
<body style="margin:0; padding:0; background-color:#f1e9ee; font-family:'Poppins', Arial, sans-serif;">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">${subject}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1e9ee;">
<tr><td align="center" style="padding: 32px 12px;">
<table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#fffdfb; border-radius:18px; overflow:hidden; box-shadow:0 4px 24px rgba(93,46,120,0.08);">

<!-- HERO HEADER -->
<tr><td style="background:linear-gradient(135deg,#f7e3ee 0%,#f3e0ea 25%,#efe2f0 50%,#f5e9ec 75%,#f9ecdf 100%); padding: 40px 30px 34px 30px;" class="fluid-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding-bottom:18px;">
<img src="${logoUrl}" alt="Dr. Vrushali" style="height:60px; width:auto; display:block;" />
</td></tr></table>
<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;"><tr>
<td align="center" style="background-color:rgba(255,255,255,0.55); border:1px solid #d9b976; border-radius:20px; padding:6px 18px;">
<span style="font-family:'Poppins',Arial,sans-serif; font-size:11px; letter-spacing:2px; color:#a9762b; font-weight:600;">✦ DR. VRUSHALI ✦</span>
</td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td align="center" style="padding-top:20px;">
<div class="headline" style="font-family:'Playfair Display', Georgia, serif; font-weight:700; font-size:34px; line-height:42px; color:#3d1b4f;">
${subject}
</div></td></tr></table>
</td></tr>

<!-- BODY -->
<tr><td style="padding: 30px 44px 8px 44px;" class="fluid-padding">
${bodyHtml}
</td></tr>

<!-- QUOTE -->
${quoteSection}

<!-- CTA -->
<tr><td align="center" style="padding: 34px 44px 44px 44px;" class="fluid-padding">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td align="center" style="border-radius:28px; background:linear-gradient(90deg,#d9b355,#c48f2e);">
<a href="https://www.drvrushali.com/vsl" target="_blank" style="display:inline-block; padding:15px 36px; font-family:'Poppins',Arial,sans-serif; font-size:14px; font-weight:600; letter-spacing:0.5px; color:#ffffff; text-decoration:none;">
Book Your Clarity Call →</a>
</td></tr></table></td></tr>

<!-- STATS -->
<tr><td style="background-color:#3d1b4f; padding: 26px 30px;" class="fluid-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td class="stat-td" align="center" width="33%" style="font-family:'Playfair Display',Georgia,serif; color:#e0b356; font-size:20px; font-weight:700;">38000+
<div style="font-family:'Poppins',Arial,sans-serif; font-size:10px; color:#c9b8d4; font-weight:400; letter-spacing:0.5px; margin-top:4px;">LIVES IMPACTED</div></td>
<td class="stat-divider" width="1%" style="border-left:1px solid #5c3d6f;"></td>
<td class="stat-td" align="center" width="33%" style="font-family:'Playfair Display',Georgia,serif; color:#e0b356; font-size:20px; font-weight:700;">200+
<div style="font-family:'Poppins',Arial,sans-serif; font-size:10px; color:#c9b8d4; font-weight:400; letter-spacing:0.5px; margin-top:4px;">BUSINESSES TRANSFORMED</div></td>
<td class="stat-divider" width="1%" style="border-left:1px solid #5c3d6f;"></td>
<td class="stat-td" align="center" width="33%" style="font-family:'Playfair Display',Georgia,serif; color:#e0b356; font-size:20px; font-weight:700;">26+
<div style="font-family:'Poppins',Arial,sans-serif; font-size:10px; color:#c9b8d4; font-weight:400; letter-spacing:0.5px; margin-top:4px;">YEARS OF EXPERIENCE</div></td>
</tr></table></td></tr>

<!-- FOOTER -->
<tr><td align="center" style="padding: 26px 30px 32px 30px; background-color:#fffdfb;">
<p style="font-family:'Poppins',Arial,sans-serif; font-size:12px; color:#9a8ba8; margin:0 0 10px 0;">India's No.1 Happiness Coach · Uplift Your Life</p>
<p style="font-family:'Poppins',Arial,sans-serif; font-size:11px; color:#b6abc2; margin:0;">For any assistance, feel free to contact us on WhatsApp +91 77383 75783</p>
</td></tr>

</table></td></tr></table></body></html>`;
}
