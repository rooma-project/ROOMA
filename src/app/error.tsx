"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-start justify-center px-6 py-16 md:px-12 md:py-24">
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
        ROOMA / Unexpected error
      </p>
      <div aria-hidden="true" className="mb-8 flex h-20 w-20 items-center justify-center bg-accent text-5xl font-black text-foreground">
        !
      </div>
      <h1 className="text-4xl font-black leading-[1.12] tracking-tighter sm:text-6xl">
        Something went wrong.
      </h1>
      <p role="alert" className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        We couldn&apos;t load this page. Try again, or return to the home page to keep exploring.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => reset()} className="bg-accent px-6 py-4 font-bold transition-colors hover:bg-foreground hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">
          Try again ↗
        </button>
        <Link href="/" className="border border-border bg-white px-6 py-4 font-semibold hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4">
          Back to home
        </Link>
      </div>
    </main>
  );
}
