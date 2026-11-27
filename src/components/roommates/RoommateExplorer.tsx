"use client";

import { useState } from "react";
import Link from "next/link";
import { roommates } from "@/data/roommates";
import { useSavedPreferences } from "@/lib/useSavedPreferences";
import { calculateMatch } from "@/lib/roommateMatching";

export default function RoommateExplorer() {
  const preferences = useSavedPreferences();
  const [showConflicts, setShowConflicts] = useState(false);
  const profiles = roommates.map((roommate) => ({ roommate, match: preferences ? calculateMatch(preferences, roommate.preferences) : null }));
  const visible = profiles.filter(({ match }) => showConflicts || !match || match.score !== null)
    .sort((a, b) => (b.match?.score ?? -1) - (a.match?.score ?? -1));
  const excluded = profiles.filter(({ match }) => match && match.score === null).length;

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">ROOMA / Roommate matching</p>
      <h1 className="text-5xl font-black leading-[1.12] tracking-tighter sm:text-6xl lg:text-8xl">Meet your people.</h1>
      <p className="mb-10 mt-6 max-w-2xl text-lg leading-relaxed text-muted">Discover students in Istanbul who share your lifestyle and find a home that feels right.</p>
      <div className="mb-8 flex flex-col gap-5 border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight">{preferences ? "Your matches are ready." : "Make it personal."}</h2>
          <p className="mt-2 text-sm text-muted">{preferences ? "Based on your saved lifestyle answers in this browser tab." : "Complete and save your preferences to unlock compatibility scores."}</p>
        </div>
        <Link href="/preferences" className="shrink-0 bg-accent px-5 py-3 text-center text-sm font-bold hover:bg-foreground hover:text-white">{preferences ? "Edit preferences" : "Set preferences"} ↗</Link>
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">{visible.length} sample profiles{preferences ? ` · ${excluded} with dealbreakers` : ""}</p>
        {preferences && <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={showConflicts} onChange={(e) => setShowConflicts(e.target.checked)} className="h-4 w-4 accent-foreground" /> Show profiles with dealbreakers</label>}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map(({ roommate, match }) => (
          <article key={roommate.id} className="min-w-0 border border-border bg-white p-5 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center bg-background text-2xl font-black">{roommate.name.split(" ").map((part) => part[0]).join("")}</div>
              <span className={`px-3 py-2 text-sm font-bold ${match?.score != null ? "bg-accent" : "bg-background text-muted"}`}>{match ? match.score === null ? "Dealbreaker" : `${match.score}% match` : "Not scored yet"}</span>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted">Sample student</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">{roommate.name}</h2>
            <p className="mt-2 text-sm text-muted">{roommate.university} · {roommate.department}</p>
            <div className="my-5 flex flex-wrap gap-2 text-sm">
              <span className="border border-border px-3 py-2">{roommate.location}, Istanbul</span>
              <span className="border border-border px-3 py-2">₺{roommate.budget.toLocaleString("tr-TR")} / month</span>
            </div>
            <p className="leading-relaxed text-muted">{roommate.bio}</p>
            {match && <div className="mt-6 border-t border-border pt-5">
              <h3 className="mb-3 font-bold">{match.score === null ? "Why this match is excluded" : "Compatibility breakdown"}</h3>
              {match.score === null ? <ul className="space-y-2 text-sm text-red-700">{match.conflicts.map((conflict) => <li key={conflict}>{conflict}</li>)}</ul> : <div className="space-y-3">{match.breakdown.map((item) => <div key={item.key}><div className="mb-1 flex justify-between gap-2 text-xs"><span>{item.label}</span><span>{item.points} / {item.weight} points</span></div><progress aria-label={item.label} value={item.points} max={item.weight} className="block h-2 w-full accent-foreground" /></div>)}</div>}
            </div>}
            <Link href={`/roommates/${roommate.id}`} className="mt-6 block border border-foreground px-5 py-3 text-center text-sm font-bold transition-colors hover:bg-accent">
              View profile & compare ↗
            </Link>
          </article>
        ))}
      </div>
      {visible.length === 0 && <div className="border border-border bg-white px-6 py-14 text-center"><h2 className="text-3xl font-black">No compatible sample profiles.</h2><p className="mt-3 text-muted">You can review excluded profiles without changing your boundaries.</p><button type="button" onClick={() => setShowConflicts(true)} className="mt-5 bg-accent px-5 py-3 font-bold">Show excluded profiles</button></div>}
      <p className="mt-8 text-xs leading-relaxed text-muted">Demo only — all profiles are fictional. Scores are lifestyle similarity estimates, not guarantees. Budget and location are displayed but do not affect the score. No data is sent to a server.</p>
    </section>
  );
}
