"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Explore rooms", href: "/rooms" },
  { label: "Map view", href: "/map" },
  { label: "Find a roommate", href: "/roommates" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Favorites", href: "/favorites" },
  { label: "Messages", href: "/messages" },
];

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    return !href.includes("#") &&
      (pathname === href || pathname.startsWith(`${href}/`));
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header
      className="relative z-20 border-b border-border bg-background"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          closeMenu();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-5 px-6 md:px-12">
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="ROOMA home"
          className={`shrink-0 text-4xl font-black tracking-tighter ${focusClass}`}
        >
          rooma<span className="text-foreground">.</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`whitespace-nowrap text-sm font-semibold transition-colors hover:text-foreground ${focusClass} ${
                isActive(href) ? "text-foreground underline decoration-2 underline-offset-8" : "text-muted"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <Link href="/login" className={`whitespace-nowrap text-sm font-semibold hover:underline ${focusClass}`}>
            Sign in
          </Link>
          <Link href="/register" className={`whitespace-nowrap bg-accent px-5 py-3 text-sm font-bold transition-colors hover:bg-foreground hover:text-white ${focusClass}`}>
            Get started ↗
          </Link>
        </div>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={isOpen}
          aria-controls="rooma-mobile-menu"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
          className={`flex min-h-11 shrink-0 items-center gap-2 border border-border px-3 text-sm font-bold xl:hidden ${focusClass}`}
        >
          {isOpen ? "Close" : "Menu"}
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav
        id="rooma-mobile-menu"
        aria-label="Mobile navigation"
        className={`${isOpen ? "block" : "hidden"} max-h-[70dvh] overflow-y-auto border-t border-border bg-background px-6 pb-6 pt-3 md:px-12 xl:hidden`}
      >
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMenu}
            aria-current={isActive(href) ? "page" : undefined}
            className={`block border-b border-border px-2 py-4 text-base font-semibold hover:bg-white ${focusClass} ${isActive(href) ? "text-foreground underline underline-offset-4" : "text-muted"}`}
          >
            {label}
          </Link>
        ))}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link href="/login" onClick={closeMenu} className={`border border-border px-5 py-3 text-center font-semibold ${focusClass}`}>
            Sign in
          </Link>
          <Link href="/register" onClick={closeMenu} className={`bg-accent px-5 py-3 text-center font-bold hover:bg-foreground hover:text-white ${focusClass}`}>
            Get started ↗
          </Link>
        </div>
      </nav>
    </header>
  );
}
