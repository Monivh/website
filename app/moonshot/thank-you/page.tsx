import type { Metadata } from "next";
import ThankYouContent from "../../../components/MoonshotThankYou";

export const metadata: Metadata = {
  title: "You're in | Monivah",
};

export default function MoonshotThankYouPage() {
  return <ThankYouContent />;
}
