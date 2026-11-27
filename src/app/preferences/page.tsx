import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreferencesForm from "@/components/roommates/PreferencesForm";

export const metadata: Metadata = {
  title: "Roommate Preferences | ROOMA",
  description: "Tell ROOMA about your lifestyle and roommate preferences.",
};

export default function PreferencesPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1000px] px-6 py-16 md:px-12 md:py-24">
        <Link href="/" className="mb-8 inline-block text-sm font-medium underline">← Back to home</Link>
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">ROOMA / Roommate matching</p>
        <h1 className="text-5xl font-black leading-[1.12] tracking-tighter sm:text-6xl lg:text-7xl">Find your people.</h1>
        <p className="mb-10 mt-6 max-w-xl text-lg leading-relaxed text-muted">Tell us a little about how you live. Your answers will help ROOMA suggest roommates with compatible lifestyles.</p>
        <PreferencesForm />
      </main>
      <Footer />
    </>
  );
}
