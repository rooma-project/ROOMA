import Link from "next/link";
export default function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">

      <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Student housing, reimagined.
      </p>

      <h1 className="text-[clamp(3rem,8vw,9rem)] font-black leading-[0.95] tracking-[-0.07em]">
        find the room.
        <br />
        meet the people.
        <br />
        <span className="text-muted">live the city.</span>
      </h1>

      <p className="mt-10 max-w-lg text-lg leading-relaxed text-muted">
        Find your next home, connect with compatible roommates,
        and make your student experience feel like home.
      </p>

      <Link
  href="/rooms"
  className="mt-8 inline-flex bg-accent px-8 py-4 font-semibold transition-colors hover:bg-foreground hover:text-white"
>
  Explore rooms ↗
</Link>

    </section>
  );
}
