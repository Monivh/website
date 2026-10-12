"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Shirt } from "lucide-react";
import { THANK_YOU_STORAGE_KEY } from "./MoonshotForm";

function readSignup(): string | null {
  try {
    return sessionStorage.getItem(THANK_YOU_STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseSignup(raw: string | null): { firstName: string; alreadyJoined: boolean } {
  try {
    const data = raw ? JSON.parse(raw) : {};
    return {
      firstName: typeof data.firstName === "string" ? data.firstName : "",
      alreadyJoined: data.alreadyJoined === true,
    };
  } catch {
    return { firstName: "", alreadyJoined: false };
  }
}

const noopSubscribe = () => () => {};

export default function MoonshotThankYou() {
  // Server render has no storage, so it shows the generic greeting until hydration
  const raw = useSyncExternalStore(noopSubscribe, readSignup, () => null);
  const { firstName, alreadyJoined } = parseSignup(raw);
  const name = firstName ? `, ${firstName}` : "";

  return (
    <div className="mt-10 sm:mt-16 max-w-xl mx-auto text-center">
      <div className="animate-bounce-in mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-brand-cyan to-brand-lime grid place-items-center shadow-[0_0_40px_rgba(34,211,238,0.3)]">
        <CheckCircle2 size={40} className="text-slate-950" />
      </div>

      <h1 className="mt-8 text-4xl sm:text-5xl font-extrabold tracking-tight">
        {alreadyJoined ? `You're already in${name}.` : `You're in${name}.`}
        <span className="block pb-1 bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-lime bg-clip-text text-transparent">
          Small talk officially skipped.
        </span>
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-slate-400">
        {alreadyJoined
          ? "This email is already on the waitlist as a founding member. We'll be in touch before launch."
          : "You're now on the Monivah waitlist as a founding member."}
      </p>

      {!alreadyJoined && (
        <p className="mt-6 inline-flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300">
          <Mail size={18} className="mt-0.5 shrink-0 text-brand-cyan" />
          <span>
            We&apos;ve sent you a note from P.J. If it isn&apos;t there in a few minutes,
            check your Promotions or Spam folder.
          </span>
        </p>
      )}

      <div className="mt-10 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-7 text-left">
        <h2 className="font-bold">What happens next</h2>
        <ul className="mt-4 space-y-3 text-[15px] text-slate-300">
          <li className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-cyan" />
            You get your invite before we open to everyone in February 2027.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-cyan" />
            You&apos;ll hear from us only when there&apos;s something worth your time. No spam.
          </li>
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-400">
        <span className="grid place-items-center w-7 h-7 rounded-lg bg-brand-lime text-slate-950">
          <Shirt size={15} />
        </span>
        <span>
          Still at Moonshot? Come find{" "}
          <strong className="font-semibold text-white">P.J.</strong> in the lime shirt.
        </span>
      </div>

      <Link
        href="/"
        className="group mt-10 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-medium hover:bg-white/[0.07] hover:border-white/20 transition-colors"
      >
        Explore monivah.com
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
