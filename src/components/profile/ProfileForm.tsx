"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "@/lib/toast";

export default function ProfileForm() {
  const [fullName, setFullName] = useState("Alex Morgan");
  const [university, setUniversity] = useState("Example University");
  const [studyField, setStudyField] = useState("Computer Science");
  const [budget, setBudget] = useState("15000");
  const [bio, setBio] = useState(
    "Looking for a comfortable room and friendly roommates.",
  );

  const [message, setMessage] = useState("");

  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const inputClass =
    "w-full border border-border bg-background px-4 py-3 outline-none focus:border-foreground";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setMessage(
    "Demo profile updated. Changes are not saved to a database yet."
  );

  toast.info(
    "Profile validated",
    "Demo only — changes are not saved yet."
  );
}

  return (
    <section className="mx-auto max-w-[1000px] px-6 py-16 md:px-12 md:py-24">
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
        ROOMA / My Account
      </p>

      <h1 className="mb-10 text-5xl font-black tracking-tighter md:text-7xl">
        Your profile.
      </h1>

      {/* Profile header */}
      <div className="mb-8 flex items-center gap-5 border border-border bg-white p-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent text-3xl font-black">
          {initials || "?"}
        </div>

        <div className="min-w-0">
          <h2 className="break-words text-2xl font-black">
            {fullName || "Your name"}
          </h2>

          <p className="mt-2 text-sm text-muted">Student · Demo profile</p>
        </div>
      </div>

      {/* Personal information */}
      <div className="border border-border bg-white p-6 md:p-10">
        <h2 className="mb-8 text-3xl font-black tracking-tight">
          Personal information.
        </h2>

        <form
          onSubmit={handleSubmit}
          onChange={() => setMessage("")}
          method="post"
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold"
              >
                Full name
              </label>

              <input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                maxLength={80}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="university"
                className="mb-2 block text-sm font-semibold"
              >
                University
              </label>

              <input
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="studyField"
                className="mb-2 block text-sm font-semibold"
              >
                Field of study
              </label>

              <input
                id="studyField"
                value={studyField}
                onChange={(e) => setStudyField(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-sm font-semibold"
              >
                Monthly budget (₺)
              </label>

              <input
                id="budget"
                type="number"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="mb-2 block text-sm font-semibold">
              About me
            </label>

            <textarea
              id="bio"
              rows={5}
              maxLength={500}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={inputClass}
            />

            <p className="mt-2 text-right text-xs text-muted">
              {bio.length}/500
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-accent px-8 py-4 font-bold transition-colors hover:bg-foreground hover:text-white md:w-auto"
          >
            Save changes ↗
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

        <p className="mt-8 text-xs text-muted">
          Demo profile — authentication and database integration coming soon.
        </p>
      </div>
    </section>
  );
}
