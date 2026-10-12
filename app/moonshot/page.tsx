import type { Metadata } from "next";
import { Globe, ChartLine, Users, QrCode, Shirt } from "lucide-react";
import MoonshotForm from "../../components/MoonshotForm";

export const metadata: Metadata = {
  title: "Monivah | Moonshot 2026",
  description:
    "One app to invest in US and Nigerian markets, learn as you go, and grow alongside other investors. Get early access.",
};

const highlights = [
  {
    icon: <Globe size={16} />,
    text: "US stocks and ETFs, plus NGX equities, T-bills and FGN bonds",
  },
  {
    icon: <ChartLine size={16} />,
    text: "Goal-based and recurring plans for steady growth",
  },
  {
    icon: <Users size={16} />,
    text: "Learn from a community of investors, with no dumb questions",
  },
];

export default async function MoonshotPage({
  searchParams,
}: {
  searchParams: Promise<{ utm_source?: string | string[] }>;
}) {
  // The shirt QR links here with ?utm_source=shirt so GA attributes the campaign too
  const { utm_source } = await searchParams;
  const source = (Array.isArray(utm_source) ? utm_source[0] : utm_source) ?? "direct";
  const fromShirt = source === "shirt";

  return (
    <div className="mt-6 lg:mt-10 grid gap-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8 items-start">
      <section>
        {fromShirt && (
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-3.5 py-1.5 text-sm text-brand-cyan">
            <QrCode size={15} />
            You scanned the lime shirt
          </span>
        )}

        <h1 className="mt-6 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight">
          Small talk skipped.
          <span className="block pb-1 bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-lime bg-clip-text text-transparent">
            Here&apos;s the short version.
          </span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-400 max-w-md">
          Monivah is one app to{" "}
          <strong className="font-semibold text-white">
            invest in US and Nigerian markets
          </strong>
          , learn as you go, and grow alongside other investors. We launch in{" "}
          <strong className="font-semibold text-white">February 2027</strong>.
        </p>
      </section>

      <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
        <MoonshotForm source={source} />
      </div>

      <section>
        <ul className="space-y-3.5">
          {highlights.map((item) => (
            <li key={item.text} className="flex items-start gap-3 text-[15px] text-slate-300">
              <span className="mt-0.5 text-brand-cyan">{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-center gap-3 text-sm text-slate-400">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-brand-lime text-slate-950">
            <Shirt size={15} />
          </span>
          <span>
            Spotted the lime shirt? That&apos;s{" "}
            <strong className="font-semibold text-white">P.J.</strong> Come say hi.
          </span>
        </div>
      </section>
    </div>
  );
}
