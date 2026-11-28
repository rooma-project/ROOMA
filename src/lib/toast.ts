"use client";

export type ToastKind = "success" | "info" | "error";

export interface ToastNotice {
  id: number;
  kind: ToastKind;
  title: string;
  description?: string;
}

const empty: readonly ToastNotice[] = [];
let notices: readonly ToastNotice[] = empty;
let nextId = 0;
const listeners = new Set<() => void>();
const timers = new Map<number, number>();

function publish(next: readonly ToastNotice[]) {
  notices = next;
  listeners.forEach((listener) => listener());
}

export function subscribeToasts(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function getToasts() { return notices; }
export function getServerToasts() { return empty; }

export function dismissToast(id: number) {
  const timer = timers.get(id);
  if (timer !== undefined) {
    window.clearTimeout(timer);
    timers.delete(id);
  }
  if (notices.some((notice) => notice.id === id)) {
    publish(notices.filter((notice) => notice.id !== id));
  }
}

function show(kind: ToastKind, title: string, description?: string) {
  if (typeof window === "undefined") return;
  const id = ++nextId;
  while (notices.length >= 4) dismissToast(notices[0].id);
  publish([...notices, { id, kind, title, description }]);
  timers.set(id, window.setTimeout(() => dismissToast(id), kind === "error" ? 8000 : 4500));
}

export const toast = {
  success: (title: string, description?: string) => show("success", title, description),
  info: (title: string, description?: string) => show("info", title, description),
  error: (title: string, description?: string) => show("error", title, description),
};
