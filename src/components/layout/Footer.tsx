
import Link from "next/link";

const exploreLinks = [
  { label: "Explore rooms", href: "/rooms" },
  { label: "Explore Istanbul", href: "/map" },
  { label: "Find a roommate", href: "/roommates" },
  { label: "Lifestyle preferences", href: "/preferences" },
  { label: "How it works", href: "/#how-it-works" },
];

const accountLinks = [
  { label: "Sign in", href: "/login" },
  { label: "Create an account", href: "/register" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">

          <div>
            <Link
              href="/"
              className="text-6xl font-black tracking-tighter"
            >
              rooma<span className="text-accent">.</span>
            </Link>

            <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/70">
              Find the room. Meet the people.
              Live the city.
            </p>

            <p className="mt-6 text-sm text-white/50">
              Made for student life. Starting in Istanbul.
            </p>
          </div>

          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent">
              Explore
            </h2>

            <nav
              aria-label="Explore footer navigation"
              className="flex flex-col items-start gap-4"
            >
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent">
              Account
            </h2>

            <nav
              aria-label="Account footer navigation"
              className="flex flex-col items-start gap-4"
            >
              {accountLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-white/50">
            © 2026 ROOMA. All rights reserved.
          </p>

          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Istanbul, Türkiye
          </p>

        </div>
      </div>
    </footer>
  );
}
