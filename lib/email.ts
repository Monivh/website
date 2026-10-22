// Sent over ZeptoMail's HTTPS API rather than SMTP: Render blocks outbound SMTP ports
// (25/465/587), which made every send from the live site time out.
const ZEPTOMAIL_API_URL = "https://api.zeptomail.com/v1.1/email";

function getZeptoToken() {
  // The ZeptoMail "Send Mail token" is the same value used as the SMTP password
  const token = process.env.ZEPTOMAIL_TOKEN || process.env.SMTP_PASS;
  if (!token) {
    throw new Error("Missing ZeptoMail token. Set ZEPTOMAIL_TOKEN (or SMTP_PASS).");
  }
  return token.replace(/^Zoho-enczapikey\s+/i, "").trim();
}

/** Splits `Name <address>` or a bare `address` into ZeptoMail's shape. */
function parseAddress(value: string): { address: string; name?: string } {
  const match = value.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  if (match) return { address: match[2].trim(), name: match[1].trim() || undefined };
  return { address: value.trim() };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const PREVIEW_TEXT = "You're a Monivah founding member. Here's what happens next.";

export async function sendMoonshotConfirmation(to: string, firstName: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://monivah.com";
  const from = parseAddress(process.env.EMAIL_FROM || "Monivah <info@monivah.com>");
  const replyTo = process.env.EMAIL_REPLY_TO;
  const plainName = firstName.replace(/[\r\n]+/g, " ");
  const name = escapeHtml(plainName);

  const text = `Hi ${plainName},

Thanks for scanning at Moonshot. You're now on the Monivah waitlist as a founding member.

What that means:
- You get your invite before we open to everyone in February 2027.
- You'll hear from us only when there's something worth your time. No spam.

A quick reminder of what we're building
Monivah is one app to invest in US stocks and ETFs, Nigerian stocks, T-bills and FGN bonds, with goal-based plans, simple lessons, and a community of investors to learn from. We're launching with licensed partners, and we'll name every one of them before launch.

One question for you
What's the most annoying thing about the investing apps you've used?
Hit reply and tell me. A real person reads every answer, and it shapes what we build.

If you're still at Moonshot, come find me in the lime shirt with any questions you have.

P.J
Growth & Marketing, Monivah
${siteUrl}`;

  const p = (html: string) =>
    `<p style="margin:0 0 16px;font-size:16px;line-height:25px;color:#1e293b;">${html}</p>`;
  const heading = (label: string) =>
    `<p style="margin:28px 0 6px;font-size:16px;line-height:25px;font-weight:700;color:#0f172a;">${label}</p>`;
  const li = (html: string) =>
    `<li style="margin:0 0 8px;font-size:16px;line-height:25px;color:#1e293b;">${html}</li>`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${PREVIEW_TEXT}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:32px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
            <tr>
              <td style="padding-bottom:28px;">
                <img src="${siteUrl}/monivah-logo.png" width="36" height="36" alt="Monivah" style="border-radius:9px;vertical-align:middle;" />
                <span style="font-size:18px;font-weight:700;color:#0f172a;vertical-align:middle;padding-left:8px;">Monivah</span>
              </td>
            </tr>
            <tr>
              <td>
                ${p(`Hi ${name},`)}
                ${p("Thanks for scanning at Moonshot. You're now on the Monivah waitlist as a <strong>founding member</strong>.")}
                ${p("What that means:")}
                <ul style="margin:0 0 16px;padding-left:22px;">
                  ${li("You get your invite before we open to everyone in <strong>February 2027</strong>.")}
                  ${li("You'll hear from us only when there's something worth your time. No spam.")}
                </ul>
                ${heading("A quick reminder of what we're building")}
                ${p("Monivah is one app to invest in US stocks and ETFs, Nigerian stocks, T-bills and FGN bonds, with goal-based plans, simple lessons, and a community of investors to learn from. We're launching with licensed partners, and we'll name every one of them before launch.")}
                ${heading("One question for you")}
                ${p("What's the most annoying thing about the investing apps you've used?<br />Hit reply and tell me. A real person reads every answer, and it shapes what we build.")}
                ${p("If you're still at Moonshot, come find me in the lime shirt with any questions you have.")}
                <p style="margin:28px 0 0;font-size:16px;line-height:25px;color:#1e293b;">
                  P.J<br />
                  <span style="color:#64748b;">Growth &amp; Marketing, Monivah</span>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding-top:36px;margin-top:36px;">
                <div style="height:3px;width:56px;border-radius:2px;background:#22d3ee;background-image:linear-gradient(90deg,#6366f1,#22d3ee,#a3e635);"></div>
                <p style="margin:14px 0 0;font-size:12px;line-height:18px;color:#94a3b8;">
                  You're getting this because you joined the Monivah waitlist at
                  <a href="${siteUrl}/moonshot" style="color:#94a3b8;">${siteUrl.replace(/^https?:\/\//, "")}/moonshot</a>.
                  Reply to this email if you'd like to be removed.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const res = await fetch(ZEPTOMAIL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Zoho-enczapikey ${getZeptoToken()}`,
    },
    body: JSON.stringify({
      from: { address: from.address, name: from.name ?? "Monivah" },
      to: [{ email_address: { address: to, name: plainName } }],
      reply_to: replyTo ? [parseAddress(replyTo)] : undefined,
      subject: `You're in, ${plainName}. Small talk officially skipped.`,
      textbody: text,
      htmlbody: html,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`ZeptoMail API ${res.status}: ${body}`);
  }
  console.log(`Moonshot confirmation email sent to ZeptoMail: ${body}`);
}
