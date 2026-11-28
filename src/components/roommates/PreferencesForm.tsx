"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import type { FormEvent } from "react";
import {
  emptyPreferences,
  isCompletePreferences,
  preferenceQuestions,
  preferenceSections,
  preferenceStorageKey,
  type PreferenceDraft,
  type PreferenceKey,
} from "@/data/roommatePreferences";

export default function PreferencesForm() {
  const [answers, setAnswers] = useState<PreferenceDraft>({ ...emptyPreferences });
  const [notice, setNotice] = useState<{ text: string; error: boolean } | null>(null);
  const answered = preferenceQuestions.filter((question) =>
    question.options.some((option) => option.value === answers[question.key])
  ).length;
  const total = preferenceQuestions.length;

  function updateAnswer(key: PreferenceKey, value: string) {
    setAnswers((previous) => ({ ...previous, [key]: value }));
    setNotice(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isCompletePreferences(answers)) {
      setNotice({ text: "Please answer every question.", error: true });
      return;
    }
    try {
      sessionStorage.setItem(preferenceStorageKey, JSON.stringify(answers));
      setNotice({ text: "Preferences saved for this browser tab. No data has been sent to a database.", error: false });
      toast.success("Preferences saved", "Saved in this browser tab only.");
    } catch {
      setNotice({ text: "Your browser could not save the demo preferences. Your answers are still in the form.", error: true });
      toast.error("Could not save preferences", "Your answers are still in the form.");
    }
  }

  function loadSaved() {
    try {
      const raw = sessionStorage.getItem(preferenceStorageKey);
      const saved: unknown = raw ? JSON.parse(raw) : null;
      if (!isCompletePreferences(saved)) {
        setNotice({ text: "No complete saved preferences found in this tab.", error: true });
        return;
      }
      setAnswers(saved);
      setNotice({ text: "Saved demo preferences loaded.", error: false });
    } catch {
      setNotice({ text: "Could not load saved preferences.", error: true });
    }
  }

  function clearAnswers() {
    setAnswers({ ...emptyPreferences });
    try {
      sessionStorage.removeItem(preferenceStorageKey);
      setNotice({ text: "Your demo preferences have been cleared.", error: false });
    } catch {
      setNotice({ text: "Form cleared, but browser storage could not be accessed.", error: true });
    }
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-6">
      <div className="border border-border bg-white p-5 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">Your progress</p>
          <p className="text-sm text-muted" aria-live="polite">{answered} / {total} answered</p>
        </div>
        <progress value={answered} max={total} aria-label="Questionnaire progress" className="block h-3 w-full accent-foreground" />
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          <button type="button" onClick={loadSaved} className="text-sm font-medium underline">Load saved answers</button>
          <button type="button" onClick={clearAnswers} className="text-sm font-medium text-muted underline">Clear answers</button>
        </div>
      </div>

      {preferenceSections.map((section) => (
        <section key={section.subtitle} className="border border-border bg-white p-5 sm:p-8 md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">{section.subtitle}</p>
          <h2 className="mb-8 text-3xl font-black tracking-tight sm:text-4xl">{section.title}</h2>
          <div className="space-y-8">
            {section.questions.map((question) => (
              <fieldset key={question.key} className="min-w-0">
                <legend className="mb-3 text-base font-semibold">{question.label}</legend>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {question.options.map((option) => (
                    <label key={option.value} className={`flex cursor-pointer items-center gap-3 border p-4 text-sm font-medium transition-colors ${answers[question.key] === option.value ? "border-foreground bg-accent" : "border-border bg-background hover:border-foreground"}`}>
                      <input type="radio" name={question.key} value={option.value} required checked={answers[question.key] === option.value} onChange={() => updateAnswer(question.key, option.value)} className="h-4 w-4 shrink-0 accent-foreground" />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </section>
      ))}

      {notice && <p role={notice.error ? "alert" : "status"} className={`border p-4 text-sm ${notice.error ? "border-red-200 bg-red-50 text-red-700" : "border-border bg-white"}`}>{notice.text}</p>}
      <button type="submit" className="w-full bg-accent px-6 py-5 text-lg font-bold transition-colors hover:bg-foreground hover:text-white">Save preferences ↗</button>
      <p className="text-center text-xs leading-relaxed text-muted">Demo only — answers are stored in this browser tab when you save, not in your account. Clear them if using a shared device.</p>
    </form>
  );
}
