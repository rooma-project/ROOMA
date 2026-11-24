
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full border border-border bg-background px-4 py-3 outline-none focus:border-foreground";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    e.currentTarget.reset();

    setMessage(
      "Form validation successful. Authentication integration is coming soon."
    );
  }

  return (
    <section className="mx-auto w-full max-w-xl px-6 py-16 md:py-24">
      <div className="border border-border bg-white p-6 sm:p-10">

        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
          ROOMA / Account
        </p>

        <h1 className="mb-4 text-4xl font-black tracking-tighter md:text-5xl">
          {isRegister
            ? "Your next chapter."
            : "Welcome back."}
        </h1>

        <p className="mb-8 text-muted">
          {isRegister
            ? "Create your ROOMA account."
            : "Sign in to your ROOMA account."}
        </p>

        <form
          onSubmit={handleSubmit}
          method="post"
          className="space-y-5"
        >
          {isRegister && (
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold"
              >
                Full name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                required
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete={
                isRegister
                  ? "new-password"
                  : "current-password"
              }
              minLength={isRegister ? 8 : undefined}
              required
              className={inputClass}
            />

            {isRegister && (
              <p className="mt-2 text-xs text-muted">
                Use at least 8 characters.
              </p>
            )}
          </div>

          {isRegister && (
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-semibold"
              >
                Account type
              </label>

              <select
                id="role"
                defaultValue="student"
                className={inputClass}
              >
                <option value="student">Student</option>
                <option value="landlord">Landlord</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-accent px-6 py-4 font-bold transition-colors hover:bg-foreground hover:text-white"
          >
            {isRegister ? "Create account ↗" : "Sign in ↗"}
          </button>

          {message && (
            <p
              role="status"
              className="border border-border bg-background p-4 text-sm"
            >
              {message}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Demo form — do not enter real credentials.
        </p>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted">
          {isRegister
            ? "Already have an account? "
            : "Don't have an account? "}

          <Link
            href={isRegister ? "/login" : "/register"}
            className="font-bold text-foreground underline"
          >
            {isRegister ? "Sign in" : "Register"}
          </Link>
        </div>

      </div>
    </section>
  );
}
