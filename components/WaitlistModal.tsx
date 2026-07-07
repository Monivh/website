"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

type Step = "form" | "submitting" | "success" | "error";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PARTICLES = 30;

function SplashParticles() {
  const particles = Array.from({ length: PARTICLES });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 6 + Math.random() * 14;
        const delay = Math.random() * 0.5;
        const duration = 0.8 + Math.random() * 0.6;
        const colors = [
          "#22d3ee",
          "#a3e635",
          "#6366f1",
          "#2dd4bf",
          "#3b82f6",
        ];
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              backgroundColor: color,
              animation: `splash-particle ${duration}s ${delay}s ease-out forwards`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("form");
        setName("");
        setEmail("");
        setPhone("");
        setErrorMsg("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email");
      return;
    }

    setStep("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("success");
      } else {
        setErrorMsg(data.error || "Something went wrong");
        setStep("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStep("error");
    }
  };

  if (!isOpen && step === "form") return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      <div className="relative w-full max-w-md animate-scale-in">
        <div className="relative rounded-[32px] border border-white/10 bg-slate-900 p-8 shadow-[0_0_80px_rgba(34,211,238,0.15)]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {step === "form" && (
            <FormContent
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              errorMsg={errorMsg}
              onSubmit={handleSubmit}
            />
          )}

          {step === "submitting" && (
            <SubmittingContent />
          )}

          {step === "success" && (
            <SuccessContent onClose={onClose} />
          )}

          {step === "error" && (
            <ErrorContent
              errorMsg={errorMsg}
              onRetry={() => setStep("form")}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function FormContent({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  errorMsg,
  onSubmit,
}: {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-brand-soft border border-white/10 flex items-center justify-center text-brand-cyan">
          <Sparkles size={20} />
        </div>
      </div>

      <h3 className="text-2xl font-bold">Join the Waitlist</h3>
      <p className="mt-2 text-sm text-slate-400">
        Be among the first to invest beyond borders.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 focus:border-brand-cyan/40 transition-all"
          />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "80ms" }}>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 focus:border-brand-cyan/40 transition-all"
          />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "160ms" }}>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+234 800 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 focus:border-brand-cyan/40 transition-all"
          />
        </div>

        {errorMsg && (
          <p className="text-sm text-rose-400 animate-shake">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="animate-slide-up w-full bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950 px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          style={{ animationDelay: "240ms" }}
        >
          Join Now
          <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-4 text-xs text-center text-slate-500">
        No spam — just early access when we launch.
      </p>
    </div>
  );
}

function SubmittingContent() {
  return (
    <div className="flex flex-col items-center py-12">
      <div className="w-16 h-16 rounded-3xl bg-gradient-brand-soft border border-white/10 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="mt-6 text-lg font-semibold">Joining the waitlist...</p>
      <p className="mt-2 text-sm text-slate-400">Just a moment, please.</p>
    </div>
  );
}

function SuccessContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative flex flex-col items-center py-10 text-center overflow-hidden">
      <SplashParticles />
      <div className="relative animate-bounce-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-cyan to-brand-lime flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.3)]">
          <CheckCircle2 size={40} className="text-slate-950" />
        </div>
      </div>
      <h3 className="mt-6 text-2xl font-bold animate-slide-up" style={{ animationDelay: "200ms" }}>
        You&apos;re In! 🎉
      </h3>
      <p className="mt-3 text-slate-400 max-w-xs animate-slide-up" style={{ animationDelay: "300ms" }}>
        Thanks for joining the waitlist. We&apos;ll notify you the moment Monivah goes live.
      </p>
      <button
        onClick={onClose}
        className="mt-8 bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity animate-slide-up"
        style={{ animationDelay: "400ms" }}
      >
        Got it!
      </button>
    </div>
  );
}

function ErrorContent({
  errorMsg,
  onRetry,
  onClose,
}: {
  errorMsg: string;
  onRetry: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <X size={28} className="text-rose-400" />
      </div>
      <h3 className="mt-5 text-xl font-bold">Something went wrong</h3>
      <p className="mt-2 text-sm text-slate-400">{errorMsg}</p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
        <button
          onClick={onClose}
          className="border border-white/10 text-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
