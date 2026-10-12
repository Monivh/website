"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { ArrowRight, Star } from "lucide-react";

const APPS = ["Bamboo", "Risevest", "Trove", "Cowrywise", "Other", "None yet"];
const NONE = "None yet";

// The site has no privacy page yet; point this at it once it exists.
const PRIVACY_POLICY_URL = "#";

type Step = "form" | "submitting";

// Read by the thank-you page; kept out of the URL so names never reach GA
export const THANK_YOU_STORAGE_KEY = "monivah-moonshot-signup";

const inputClass =
  "w-full px-4 py-3.5 text-base rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 focus:border-brand-cyan/40 transition-all";

export default function MoonshotForm({ source }: { source: string }) {
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [apps, setApps] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const toggleApp = (app: string) => {
    setApps((current) => {
      if (current.includes(app)) return current.filter((a) => a !== app);
      // "None yet" can't be combined with an actual app
      if (app === NONE) return [NONE];
      return [...current.filter((a) => a !== NONE), app];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName.trim() || !email.trim()) {
      setErrorMsg("Please add your first name and email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg("Please enter a valid email");
      return;
    }

    setStep("submitting");

    try {
      const res = await fetch("/api/moonshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          whatsapp,
          apps,
          consent,
          source,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        // GA4's recommended lead event; repeat signups are flagged so they can be filtered out
        sendGAEvent("event", "generate_lead", {
          form: "moonshot_waitlist",
          source,
          already_joined: Boolean(data.alreadyJoined),
        });
        try {
          sessionStorage.setItem(
            THANK_YOU_STORAGE_KEY,
            JSON.stringify({
              firstName: firstName.trim(),
              alreadyJoined: Boolean(data.alreadyJoined),
            })
          );
        } catch {
          // Storage blocked: the thank-you page falls back to a generic greeting
        }
        // Stays in "submitting" so the button can't be pressed again mid-navigation
        router.push("/moonshot/thank-you");
      } else {
        setErrorMsg(data.error || "Something went wrong");
        setStep("form");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStep("form");
    }
  };

  return (
    <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6 sm:p-7 shadow-[0_0_80px_rgba(34,211,238,0.08)]">
      <h2 className="text-xl font-bold">Get early access</h2>
      <p className="mt-1 text-sm text-slate-400">Two fields. Takes about 20 seconds.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label htmlFor="firstName" className="block text-sm text-slate-300 mb-2">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Tolu"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-slate-300 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="tolu@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm text-slate-300 mb-2">
            WhatsApp{" "}
            <span className="text-slate-500">(optional, for launch-day updates)</span>
          </label>
          <div className="flex rounded-xl border border-white/10 bg-white/[0.03] focus-within:ring-2 focus-within:ring-brand-cyan/40 focus-within:border-brand-cyan/40 transition-all">
            <span className="grid place-items-center px-3.5 border-r border-white/10 text-slate-300">
              +234
            </span>
            <input
              id="whatsapp"
              type="tel"
              autoComplete="tel-national"
              inputMode="tel"
              placeholder="803 123 4567"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="min-w-0 flex-1 px-4 py-3.5 text-base bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <fieldset>
          <legend className="text-sm text-slate-300 mb-2.5">
            Which apps do you invest with now?{" "}
            <span className="text-slate-500">(optional, tap any)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {APPS.map((app) => {
              const selected = apps.includes(app);
              return (
                <button
                  key={app}
                  type="button"
                  onClick={() => toggleApp(app)}
                  aria-pressed={selected}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all active:scale-95 ${
                    selected
                      ? "border-transparent bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950"
                      : "border-white/15 bg-white/[0.03] text-slate-200 hover:border-white/30"
                  }`}
                >
                  {app}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-400 leading-relaxed">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 shrink-0 accent-brand-cyan"
          />
          <span>
            Monivah can contact me about early access and launch. I can unsubscribe
            anytime. See the{" "}
            <a
              href={PRIVACY_POLICY_URL}
              className="text-brand-cyan underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>

        {errorMsg && (
          <p role="alert" className="text-sm text-rose-400 animate-shake">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={step === "submitting"}
          className="group w-full bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950 px-6 py-4 rounded-xl font-semibold inline-flex items-center justify-center gap-2 shadow-[0_8px_30px_-6px_rgba(34,211,238,0.5)] hover:opacity-95 disabled:opacity-70 transition-all"
        >
          {step === "submitting" ? (
            <>
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Join the Waitlist
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
        <Star size={15} className="text-brand-lime" />
        Founding members get first access at launch
      </p>
    </div>
  );
}

