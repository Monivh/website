"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Globe,
  TrendingUp,
  Brain,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  LineChart,
  Coins,
  BarChart3,
  Lock,
  Fingerprint,
  Building2,
  Layers,
  Repeat,
  Star,
  Quote,
  ChevronDown,
  UserPlus,
  Banknote,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#why", label: "Why Monivah" },
  { href: "#security", label: "Security" },
  { href: "#faq", label: "FAQ" },
];

const steps = [
  {
    icon: <UserPlus />,
    title: "Create Account",
    text: "Sign up in minutes with just your phone number and email.",
  },
  {
    icon: <Fingerprint />,
    title: "Verify Identity",
    text: "Quick KYC checks keep your account secure and compliant.",
  },
  {
    icon: <Banknote />,
    title: "Fund Wallet",
    text: "Top up in local currency via bank transfer, card or mobile money.",
  },
  {
    icon: <Globe />,
    title: "Invest Globally",
    text: "Buy fractional shares of global stocks, ETFs and more.",
  },
  {
    icon: <LineChart />,
    title: "Track Growth",
    text: "Monitor performance with real-time, AI-powered insights.",
  },
];

const features = [
  {
    icon: <Brain />,
    title: "AI Portfolio Intelligence",
    text: "Personalized investment recommendations based on your risk profile, goals and live market conditions.",
  },
  {
    icon: <Globe />,
    title: "Cross-Border Investing",
    text: "Move money seamlessly between local currencies and global markets without the usual friction.",
  },
  {
    icon: <LineChart />,
    title: "Global Stocks & ETFs",
    text: "Build a diversified portfolio with fractional shares from major exchanges around the world.",
  },
  {
    icon: <Coins />,
    title: "Low Fees & Transparency",
    text: "No hidden charges — see exactly what you pay before every transaction, every time.",
  },
  {
    icon: <BarChart3 />,
    title: "Real-Time Tracking",
    text: "Watch your portfolio move with live prices, performance charts and instant alerts.",
  },
  {
    icon: <Lock />,
    title: "Bank-Grade Security",
    text: "Funds held with licensed custodians and protected by end-to-end encryption.",
  },
];

const whyItems = [
  {
    icon: <Brain />,
    title: "AI Portfolio Insights",
    text: "Smart recommendations tailored to your goals.",
  },
  {
    icon: <Repeat />,
    title: "Cross-Border Rails",
    text: "Move between currencies and markets seamlessly.",
  },
  {
    icon: <Users />,
    title: "Social Investing",
    text: "Learn from and follow trusted investors.",
  },
  {
    icon: <Globe />,
    title: "Multi-Market Access",
    text: "Stocks, ETFs and more from a single account.",
  },
  {
    icon: <Layers />,
    title: "Infrastructure Layer",
    text: "Built for individuals, fintechs and partners alike.",
  },
];

const securityItems = [
  {
    icon: <Lock />,
    title: "End-to-End Encryption",
    text: "256-bit encryption protects every transaction and message.",
  },
  {
    icon: <Building2 />,
    title: "Licensed Custodians",
    text: "Assets held with regulated, trusted financial institutions.",
  },
  {
    icon: <Fingerprint />,
    title: "Biometric Authentication",
    text: "Secure logins with Face ID, fingerprint and 2FA.",
  },
  {
    icon: <ShieldCheck />,
    title: "KYC & AML Compliant",
    text: "Built to meet global regulatory standards from day one.",
  },
];

const testimonials = [
  {
    quote:
      "Monivah finally makes global investing simple. I funded my wallet and bought my first ETF in under ten minutes.",
    name: "Adaeze O.",
    role: "Product Designer, Lagos",
  },
  {
    quote:
      "Clean, modern and easy to understand — exactly what cross-border investing has been missing for us.",
    name: "Kwame A.",
    role: "Software Engineer, Accra",
  },
  {
    quote:
      "The AI insights are a game changer. It feels like having a personal advisor in my pocket.",
    name: "Wanjiru M.",
    role: "Entrepreneur, Nairobi",
  },
];

const faqs = [
  {
    question: "Is Monivah regulated?",
    answer:
      "Monivah is being built in partnership with licensed custodians and brokers, and is designed to meet KYC/AML requirements across the markets we operate in.",
  },
  {
    question: "What markets can I invest in?",
    answer:
      "At launch you'll be able to access major US stocks and ETFs, with UK, EU and emerging-market exchanges following shortly after.",
  },
  {
    question: "What's the minimum investment?",
    answer:
      "You'll be able to start investing with fractional shares from as little as a few dollars — no large minimums required.",
  },
  {
    question: "How do I fund my account?",
    answer:
      "Top up your Monivah wallet using bank transfer, debit card or mobile money in your local currency.",
  },
  {
    question: "When will Monivah launch?",
    answer:
      "We're in active development. Join the waitlist to get early access and be the first to know when we go live.",
  },
];

const portfolio = [
  { name: "Apple", ticker: "AAPL", change: "+4.2%", positive: true },
  { name: "Nvidia", ticker: "NVDA", change: "+6.8%", positive: true },
  { name: "Amazon", ticker: "AMZN", change: "+2.1%", positive: true },
  { name: "Tesla", ticker: "TSLA", change: "-1.4%", positive: false },
];

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "Why Monivah", href: "#why" },
    { label: "Security", href: "#security" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-[#020617] text-white overflow-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#020617]/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_24px_rgba(34,211,238,0.35)]">
              <Image
                src="/monivah-logo.png"
                alt="Monivah logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-xl tracking-tight">Monivah</span>
          </a>

          <div className="hidden md:flex gap-8 text-sm text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950 px-5 py-3 rounded-xl font-semibold items-center gap-2 hover:opacity-90 transition-opacity">
              Join Waitlist
            </button>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden p-2 rounded-lg border border-white/10 text-slate-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#020617]/95 px-6 py-6 flex flex-col gap-4 text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button className="bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950 px-5 py-3 rounded-xl font-semibold">
              Join Waitlist
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-brand-indigo/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-brand-cyan/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 w-[28rem] h-[28rem] bg-brand-lime/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-sm">
              <Sparkles size={16} />
              Global Investing, Built For Africa
            </span>

            <h1 className="mt-8 text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
              Invest Beyond
              <span className="text-gradient-brand block">Borders</span>
            </h1>

            <p className="mt-8 text-xl text-slate-400 max-w-xl leading-relaxed">
              Monivah is the financial bridge between Africa and global
              wealth. Buy global stocks, ETFs and emerging-market
              opportunities, manage a multi-currency wallet, and let AI guide
              every decision — all from your phone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button className="bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Join the Waitlist
                <ArrowRight size={18} />
              </button>

              <a
                href="#how"
                className="border border-slate-700 px-8 py-4 rounded-xl text-center hover:bg-white/5 transition-colors"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-brand-cyan" />
                10,000+ on the waitlist
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-cyan" />
                Bank-grade encryption
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-cyan" />
                KYC & AML ready
              </div>
            </div>
          </div>

          {/* PHONE MOCKUP */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-[100px] rounded-full" />

            <div className="relative w-[340px] rounded-[40px] border border-white/10 bg-slate-900/80 backdrop-blur p-6 shadow-[0_0_120px_rgba(34,211,238,0.25)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-slate-400">
                    Portfolio Value
                  </div>

                  <div className="text-5xl font-bold mt-2">$12,456</div>

                  <div className="text-brand-lime mt-2 flex items-center gap-1 text-sm font-medium">
                    <TrendingUp size={16} />
                    +$1,234 (11.2%) Today
                  </div>
                </div>

                <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10 shrink-0">
                  <Image
                    src="/monivah-logo.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="h-40 mt-8 rounded-2xl bg-gradient-to-r from-brand-indigo/20 via-brand-cyan/20 to-brand-lime/20 border border-white/5 flex items-end p-4 gap-2">
                {[40, 65, 50, 80, 60, 95, 75].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-brand-cyan to-brand-lime"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 w-fit">
                <Brain size={14} className="text-brand-cyan" />
                AI Insight: Diversify into EM ETFs
              </div>

              <div className="mt-6 space-y-4">
                {portfolio.map((stock) => (
                  <div
                    key={stock.ticker}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-xs text-slate-500">
                        {stock.ticker}
                      </div>
                    </div>
                    <span
                      className={
                        stock.positive ? "text-brand-lime" : "text-rose-400"
                      }
                    >
                      {stock.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <TrustCard
            icon={<ShieldCheck />}
            title="Bank-Level Security"
            text="256-bit encryption and licensed custodians safeguard every transaction."
          />

          <TrustCard
            icon={<CheckCircle2 />}
            title="KYC Compliant"
            text="Regulatory-aligned onboarding built for African and global markets."
          />

          <TrustCard
            icon={<Globe />}
            title="Global Markets"
            text="Access US, UK, EU and emerging-market exchanges from one account."
          />

          <TrustCard
            icon={<TrendingUp />}
            title="Real-Time Investing"
            text="Live pricing, instant execution and transparent settlement."
          />
        </div>
      </section>

      {/* STATS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold">
              The Opportunity Is Massive —{" "}
              <span className="text-gradient-brand">
                And Mostly Untapped
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              Africa&apos;s middle class is growing faster than its access to
              global investment tools. Monivah closes that gap.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Stat value="$100T+" text="Global Market Opportunity" />
            <Stat value="600M+" text="African Mobile Users" />
            <Stat value="<5%" text="Currently Investing Abroad" />
            <Stat value="500M+" text="Target Users By 2035" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold">
              How Monivah Works
            </h2>
            <p className="mt-4 text-slate-400">
              From sign-up to your first global investment in minutes — no
              paperwork, no hidden steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mt-16">
            {steps.map((step, index) => (
              <StepCard key={step.title} index={index + 1} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold">
              One Platform.
              <span className="text-gradient-brand block">
                Endless Possibilities.
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              Everything you need to build global wealth, designed around how
              Africa invests, saves and grows money.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY MONIVAH */}
      <section id="why" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold">Why Monivah?</h2>
            <p className="mt-4 text-slate-400">
              We&apos;re not just another trading app — we&apos;re building
              the infrastructure layer for how Africa connects to global
              wealth.
            </p>
          </div>

          <div className="relative rounded-[40px] border border-white/10 bg-slate-900/60 p-10 lg:p-16 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-brand opacity-20 blur-[100px] rounded-full" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-sm">
                  <Layers size={16} />
                  The Infrastructure Layer
                </span>

                <h3 className="mt-6 text-3xl font-bold">
                  Built To Be The Foundation For Cross-Border Wealth
                </h3>

                <p className="mt-4 text-slate-400 leading-relaxed">
                  Monivah combines AI-driven insights, social investing and
                  reliable cross-border rails into a single platform — so
                  individuals, fintechs and partners can plug into global
                  markets without building it themselves.
                </p>

                <button className="mt-8 bg-gradient-to-r from-brand-cyan to-brand-lime text-slate-950 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                  Join the Waitlist
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {whyItems.map((item, index) => (
                  <WhyCard
                    key={item.title}
                    {...item}
                    spanFull={index === whyItems.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-sm">
                <ShieldCheck size={16} />
                Security First
              </span>

              <h2 className="mt-6 text-4xl sm:text-5xl font-bold">
                Your Money & Data,{" "}
                <span className="text-gradient-brand">
                  Protected By Design
                </span>
              </h2>

              <p className="mt-4 text-slate-400 leading-relaxed">
                We partner with licensed custodians and apply the same
                security standards used by global financial institutions —
                so you can invest with confidence, every step of the way.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {securityItems.map((item) => (
                <FeatureCard key={item.title} {...item} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Loved By Future Investors
            </h2>
            <p className="mt-4 text-slate-400">
              Join thousands already on the waitlist, eager to invest beyond
              borders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-slate-950">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-400">
              Everything you need to know before you join the waitlist.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                isOpen={openFaq === index}
                onToggle={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-[40px] p-12 lg:p-16 bg-gradient-brand text-slate-950 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/20 rounded-full blur-3xl" />

            <div className="relative max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                The Future of Investing Starts Here.
              </h2>

              <p className="mt-4 text-slate-900/70 text-lg">
                Be among the first to access Monivah when we launch. No spam
                — just an invite when it matters most.
              </p>

              <form className="mt-8 flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-xl text-slate-950 bg-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950/20"
                />

                <button
                  type="submit"
                  className="bg-slate-950 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  Join Waitlist
                </button>
              </form>

              <p className="mt-4 text-sm text-slate-900/60">
                Join 10,000+ future investors already on the list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <a href="#" className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10">
                  <Image
                    src="/monivah-logo.png"
                    alt="Monivah logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-xl">Monivah</span>
              </a>

              <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
                The financial bridge between Africa and global wealth —
                invest beyond borders, from your phone.
              </p>

              <div className="mt-6 flex gap-3">
                <SocialLink label="X (Twitter)" href="#">
                  <XLogoIcon />
                </SocialLink>
                <SocialLink label="LinkedIn" href="#">
                  <LinkedInIcon />
                </SocialLink>
                <SocialLink label="Instagram" href="#">
                  <InstagramIcon />
                </SocialLink>
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <FooterColumn key={title} title={title} links={links} />
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <span>© {new Date().getFullYear()} Monivah. All rights reserved.</span>
            <span>Building the future of African investing.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({ value, text }: { value: string; text: string }) {
  return (
    <div className="bg-slate-900/60 rounded-3xl p-8 text-center border border-white/5 hover:border-white/10 transition-colors">
      <h3 className="text-4xl sm:text-5xl font-bold text-gradient-brand">
        {value}
      </h3>
      <p className="mt-4 text-slate-400">{text}</p>
    </div>
  );
}

function TrustCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function StepCard({
  index,
  icon,
  title,
  text,
}: {
  index: number;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-white/5 hover:border-brand-cyan/30 transition-colors">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-cyan to-brand-lime flex items-center justify-center text-slate-950 font-bold">
        {index}
      </div>

      <div className="mt-5 text-brand-cyan">{icon}</div>

      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{text}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  compact = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`bg-slate-900 rounded-3xl border border-white/5 hover:border-brand-cyan/30 hover:-translate-y-1 transition-all ${
        compact ? "p-6" : "p-8"
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-gradient-brand-soft border border-white/10 flex items-center justify-center text-brand-cyan">
        {icon}
      </div>
      <h3 className={`font-bold ${compact ? "mt-4 text-lg" : "mt-6 text-xl"}`}>
        {title}
      </h3>
      <p className="mt-3 text-slate-400">{text}</p>
    </div>
  );
}

function WhyCard({
  icon,
  title,
  text,
  spanFull = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  spanFull?: boolean;
}) {
  return (
    <div
      className={`bg-slate-950/60 rounded-2xl p-6 border border-white/5 ${
        spanFull ? "sm:col-span-2" : ""
      }`}
    >
      <div className="text-brand-lime">{icon}</div>
      <h4 className="mt-4 font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-slate-400">{text}</p>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-white/5">
      <Quote className="text-brand-cyan" size={28} />
      <p className="mt-4 text-slate-300 leading-relaxed">{quote}</p>

      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-indigo via-brand-cyan to-brand-lime flex items-center justify-center text-sm font-bold text-slate-950">
          {initials}
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-slate-500">{role}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-1 text-brand-lime">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
    </div>
  );
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-semibold">{faq.question}</span>
        <ChevronDown
          className={`shrink-0 text-brand-cyan transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 text-slate-400 leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-slate-400">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/30 transition-colors"
    >
      {children}
    </a>
  );
}

function XLogoIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.39 8.44L22.77 22h-6.78l-5.31-6.94L4.6 22H1.34l7.9-9.03L1.5 2h6.95l4.8 6.34L18.244 2Zm-1.19 18.17h1.87L7.04 3.72H5.03l12.02 16.45Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
