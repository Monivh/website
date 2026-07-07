import { NextRequest } from "next/server";
import { appendWaitlistRow, findWaitlistEmail } from "../../../lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return Response.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const alreadyExists = await findWaitlistEmail(email);
    if (alreadyExists) {
      return Response.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    await appendWaitlistRow({ name, email, phone });

    return Response.json(
      { success: true, message: "You're on the waitlist!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Waitlist submission failed:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
