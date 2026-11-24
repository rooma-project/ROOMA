import Link from "next/link";
export default function Navbar() {
  return (
    <header className="w-full border-b border-border">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">

        {/* Logo */}
        <Link
  href="/"
  className="text-4xl font-black tracking-tighter"
>
  rooma<span className="text-muted">.</span>
</Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#rooms" className="hover:opacity-60">
            Explore rooms
          </a>

          <a href="#matching" className="hover:opacity-60">
            Find a roommate
          </a>

          <a href="#how-it-works" className="hover:opacity-60">
            How it works
          </a>
        </div>

        {/* Action */}
        <a
          href="#how-it-works"
          className="bg-accent px-5 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-white"
        >
          Get started ↗
        </a>

      </nav>
    </header>
  );
}
