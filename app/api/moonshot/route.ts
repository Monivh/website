import { NextRequest, after } from "next/server";
import { appendMoonshotRow, findMoonshotEmail } from "../../../lib/google-sheets";
import { sendMoonshotConfirmation } from "../../../lib/email";

const ALLOWED_APPS = ["Bamboo", "Risevest", "Trove", "Cowrywise", "Other", "None yet"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? "").trim().slice(0, 80);
    const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
    const whatsappDigits = String(body.whatsapp ?? "").replace(/\D/g, "").replace(/^0/, "");
    const apps: string[] = Array.isArray(body.apps)
      ? body.apps.filter((app: unknown) => ALLOWED_APPS.includes(String(app)))
      : [];
    const consent = body.consent === true;
    const source = String(body.source ?? "").slice(0, 40);

    if (!firstName || !email) {
      return Response.json(
        { error: "First name and email are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Please enter a valid email" }, { status: 400 });
    }

    if (whatsappDigits && (whatsappDigits.length < 10 || whatsappDigits.length > 13)) {
      return Response.json(
        { error: "Please enter a valid WhatsApp number" },
        { status: 400 }
      );
    }

    // Re-scans at the booth are common; treat a repeat as success without a second email.
    if (await findMoonshotEmail(email)) {
      return Response.json({ success: true, alreadyJoined: true });
    }

    await appendMoonshotRow({
      firstName,
      email,
      whatsapp: whatsappDigits ? `+234${whatsappDigits.replace(/^234/, "")}` : "",
      apps,
      consent,
      source,
    });

    after(async () => {
      try {
        await sendMoonshotConfirmation(email, firstName);
      } catch (err) {
        console.error("Moonshot confirmation email failed:", err);
      }
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Moonshot submission failed:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
