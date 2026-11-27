"use client";

import { useSyncExternalStore } from "react";
import { isCompletePreferences, preferenceStorageKey } from "@/data/roommatePreferences";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("pageshow", callback);
  window.addEventListener("focus", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pageshow", callback);
    window.removeEventListener("focus", callback);
  };
}

function getSnapshot() {
  try { return sessionStorage.getItem(preferenceStorageKey); } catch { return null; }
}

function getServerSnapshot() { return null; }

export function useSavedPreferences() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isCompletePreferences(parsed) ? parsed : null;
  } catch { return null; }
}
