import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-start justify-center px-6 py-16 md:px-12 md:py-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
          ROOMA / Page not found
        </p>
        <p aria-hidden="true" className="mb-6 inline-block bg-accent px-4 py-2 text-[clamp(4rem,15vw,10rem)] font-black leading-none tracking-tighter text-foreground">
          404
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-[1.12] tracking-tighter sm:text-6xl">
          Looks like you took a wrong turn.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The page you are looking for may have moved or no longer exists. Let&apos;s find your way back.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="bg-accent px-6 py-4 font-bold transition-colors hover:bg-foreground hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">
            Back to home ↗
          </Link>
          <Link href="/rooms" className="border border-border bg-white px-6 py-4 font-semibold hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4">
            Explore rooms ↗
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
