
import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CreateRoomForm from "@/components/rooms/CreateRoomForm";

export const metadata: Metadata = {
  title: "Create Listing | ROOMA",
  description: "List your student accommodation on ROOMA.",
};

export default function CreateRoomPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-[1000px] px-6 py-16 md:px-12 md:py-24">

        <Link
  href="/dashboard"
  className="mb-8 inline-block text-sm underline"
>
  ← Back to dashboard
</Link>

        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
          ROOMA / Landlord
        </p>

        <h1 className="text-5xl font-black leading-[1.15] tracking-tighter sm:text-6xl lg:text-8xl">
          List your space.
        </h1>

        <p className="mb-12 mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Help students find their next home.
          Create your room listing in a few simple steps.
        </p>

        <CreateRoomForm />

      </main>

      <Footer />
    </>
  );
}
