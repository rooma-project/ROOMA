"use client";

import { useMemo, useSyncExternalStore } from "react";

const storageKey = "rooma:favorite-rooms:v1";
const changeEvent = "rooma:favorite-rooms-change";
const emptySnapshot = "[]";

function getSnapshot(): string {
  try {
    return window.localStorage.getItem(storageKey) ?? emptySnapshot;
  } catch {
    return emptySnapshot;
  }
}

function getServerSnapshot(): string {
  return emptySnapshot;
}

function subscribe(onChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) onChange();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(changeEvent, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(changeEvent, onChange);
  };
}

function parseIds(snapshot: string): number[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id): id is number =>
      typeof id === "number" && Number.isSafeInteger(id) && id > 0
    ))];
  } catch {
    return [];
  }
}

function toggleFavorite(roomId: number): boolean {
  try {
    // Read the latest storage value, not an older render's state.
    const ids = parseIds(getSnapshot());
    const next = ids.includes(roomId)
      ? ids.filter((id) => id !== roomId)
      : [...ids, roomId];

    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(changeEvent));
    return true;
  } catch {
    return false;
  }
}

export function useFavorites() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const favoriteIds = useMemo(() => parseIds(snapshot), [snapshot]);

  return { favoriteIds, toggleFavorite };
}
