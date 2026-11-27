"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Explore rooms", href: "/rooms" },
  { label: "Map view", href: "/map" },
  { label: "Find a roommate", href: "/roommates" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Sign in", href: "/login" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-background">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-4xl font-black tracking-tighter"
        >
          rooma<span className="text-muted">.</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop action */}
        <Link
          href="/register"
          className="hidden bg-accent px-5 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-white lg:block"
        >
          Get started ↗
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-12 w-12 items-center justify-center border border-border lg:hidden"
        >
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6L18 18M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6H21M3 12H21M3 18H21" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="border-t border-border px-6 pb-6 lg:hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="block border-b border-border py-5 text-lg font-semibold"
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/#how-it-works"
          onClick={() => setIsOpen(false)}
          className="mt-6 block bg-accent px-5 py-4 text-center font-semibold"
        >
          Get started ↗
        </Link>
      </div>
    </header>
  );
}
