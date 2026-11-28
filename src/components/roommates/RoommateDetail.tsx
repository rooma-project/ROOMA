"use client";

import Link from "next/link";
import type { Roommate } from "@/data/roommates";
import { preferenceSections, type PreferenceQuestion } from "@/data/roommatePreferences";
import { calculateMatch } from "@/lib/roommateMatching";
import { useSavedPreferences } from "@/lib/useSavedPreferences";
import { formatPrice } from "@/lib/formatPrice";

const labels = {
  cleanliness: "Cleanliness",
  sleep: "Sleep schedule",
  smoking: "Smoking habits",
  social: "Social habits",
  guests: "Guest frequency",
  cooking: "Cooking habits",
  hasPet: "Bringing a pet",
  smokerPolicy: "Accepts roommates who smoke",
  petPolicy: "Accepts roommates with pets",
} satisfies Record<PreferenceQuestion["key"], string>;

function answerLabel(question: PreferenceQuestion, value: string | undefined) {
  if (!value) return "Not answered";
  return question.options.find((option) => option.value === value)?.label ?? "Unknown";
}

export default function RoommateDetail({ roommate }: { roommate: Roommate }) {
  const preferences = useSavedPreferences();
  const match = preferences ? calculateMatch(preferences, roommate.preferences) : null;
  const initials = roommate.name.split(" ").map((part) => part[0]).join("");

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      <Link href="/roommates" className="mb-8 inline-block text-sm font-medium underline">← Back to roommates</Link>
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">ROOMA / Roommate profile</p>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="min-w-0 space-y-6">
          <article className="border border-border bg-white p-6 sm:p-8">
            <div aria-hidden="true" className="flex h-24 w-24 items-center justify-center bg-accent text-4xl font-black">{initials}</div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted">Sample student</p>
            <h1 className="mt-2 break-words text-4xl font-black leading-[1.12] tracking-tighter sm:text-5xl">{roommate.name}</h1>
            <p className="mt-4 text-muted">{roommate.university} · {roommate.department}</p>
            <div className="my-6 space-y-4 border-y border-border py-6">
              <div><p className="text-xs uppercase tracking-wider text-muted">Preferred area</p><p className="mt-1 font-semibold">{roommate.location}, Istanbul</p></div>
              <div><p className="text-xs uppercase tracking-wider text-muted">Monthly budget</p><p className="mt-1 text-3xl font-black">{formatPrice(roommate.budget)}</p></div>
            </div>
            <h2 className="text-2xl font-black tracking-tight">About me.</h2>
            <p className="mt-3 leading-relaxed text-muted">{roommate.bio}</p>
            <Link href={`/messages/roommate-${roommate.id}`} className="mt-6 block w-full bg-accent px-5 py-4 text-center font-bold transition-colors hover:bg-foreground hover:text-white">Send message ↗</Link>
          </article>
          <article className={`border border-border p-6 sm:p-8 ${match?.score != null ? "bg-accent" : "bg-white"}`}>
            <p className="text-xs font-semibold uppercase tracking-widest">Your compatibility</p>
            {!match ? (
              <><h2 className="mt-4 text-3xl font-black tracking-tight">Not scored yet.</h2><p className="mt-3 text-sm text-muted">Save your lifestyle preferences to compare your answers.</p></>
            ) : match.score === null ? (
              <><h2 className="mt-4 text-3xl font-black tracking-tight">Dealbreaker found.</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-red-700">{match.conflicts.map((conflict) => <li key={conflict}>{conflict}</li>)}</ul><p className="mt-4 text-sm text-muted">No compatibility score is calculated when a boundary is violated.</p></>
            ) : (
              <><h2 className="mt-4 text-6xl font-black tracking-tighter">{match.score}%</h2><progress aria-label="Compatibility score" value={match.score} max={100} className="mt-4 block h-3 w-full accent-foreground"/><p className="mt-4 text-sm">Weighted similarity across six lifestyle habits. This is not a guarantee of compatibility.</p></>
            )}
            <Link href="/preferences" className="mt-6 inline-block border border-foreground bg-white px-5 py-3 text-sm font-bold hover:bg-foreground hover:text-white">{preferences ? "Edit preferences" : "Set preferences"} ↗</Link>
          </article>
        </div>
        <div className="min-w-0 space-y-6">
          <div className="border border-border bg-white p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Lifestyle comparison</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">How do you live?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Compare your answers side by side. Identical answers receive full points; adjacent answers receive half points.</p>
          </div>
          {preferenceSections.map((section) => (
            <section key={section.subtitle} className="border border-border bg-white p-5 sm:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">{section.subtitle}</p>
              <h3 className="mb-5 text-2xl font-black tracking-tight">{section.title}</h3>
              <div className="space-y-5">
                {section.questions.map((question) => {
                  const own = preferences?.[question.key];
                  const other = roommate.preferences[question.key];
                  const points = match?.breakdown.find((item) => item.key === question.key);
                  return (
                    <div key={question.key} className="border-t border-border pt-5">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold">{labels[question.key]}</h4>
                        {points && <span className="bg-background px-2 py-1 text-xs font-semibold">{points.points} / {points.weight} points</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="min-w-0 border border-border bg-background p-3"><p className="text-xs font-semibold uppercase tracking-wider text-muted">You</p><p className="mt-2 break-words text-sm font-medium">{answerLabel(question, own)}</p></div>
                        <div className="min-w-0 border border-border bg-background p-3"><p className="text-xs font-semibold uppercase tracking-wider text-muted">{roommate.name}</p><p className="mt-2 break-words text-sm font-medium">{answerLabel(question, other)}</p></div>
                      </div>
                      {points && <progress aria-label={`${labels[question.key]} points`} value={points.points} max={points.weight} className="mt-3 block h-2 w-full accent-foreground" />}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
          <p className="text-xs leading-relaxed text-muted">Demo only — fictional profile and browser-tab preferences. Budget and preferred area are informational; only the six weighted habits affect the score. Pet and smoking boundaries can exclude a match.</p>
        </div>
      </div>
    </section>
  );
}
