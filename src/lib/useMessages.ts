"use client";

import { useMemo, useSyncExternalStore } from "react";
import { conversations, initialMessages, type DemoMessage, type MessageStore } from "@/data/messages";

const storageKey = "rooma:demo-messages:v1";
const changeEvent = "rooma:demo-messages-change";
const initialSnapshot = JSON.stringify(initialMessages);
const ids = new Set(conversations.map((item) => item.id));

function getSnapshot() {
  try {
    return window.sessionStorage.getItem(storageKey) ?? initialSnapshot;
  } catch {
    return initialSnapshot;
  }
}

function getServerSnapshot() { return initialSnapshot; }

function subscribe(callback: () => void) {
  window.addEventListener(changeEvent, callback);
  return () => window.removeEventListener(changeEvent, callback);
}

function isMessage(value: unknown): value is DemoMessage {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<DemoMessage>;
  return typeof item.id === "string" &&
    (item.sender === "me" || item.sender === "other") &&
    typeof item.text === "string" && item.text.length <= 2000 &&
    typeof item.sentAt === "string" && Number.isFinite(Date.parse(item.sentAt)) &&
    typeof item.read === "boolean";
}

function parse(snapshot: string): MessageStore {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!value || typeof value !== "object" || Array.isArray(value)) return initialMessages;
    const result: MessageStore = {};
    for (const [id, messages] of Object.entries(value)) {
      if (ids.has(id) && Array.isArray(messages)) result[id] = messages.filter(isMessage);
    }
    return result;
  } catch {
    return initialMessages;
  }
}

function write(store: MessageStore) {
  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(store));
    window.dispatchEvent(new Event(changeEvent));
    return true;
  } catch {
    return false;
  }
}

function sendMessage(conversationId: string, text: string) {
  const body = text.trim();
  if (!ids.has(conversationId) || !body || body.length > 2000) return false;
  const store = parse(getSnapshot());
  const message: DemoMessage = {
    id: window.crypto.randomUUID(), sender: "me", text: body,
    sentAt: new Date().toISOString(), read: true,
  };
  return write({ ...store, [conversationId]: [...(store[conversationId] ?? []), message] });
}

function markRead(conversationId: string) {
  const store = parse(getSnapshot());
  const messages = store[conversationId] ?? [];
  if (!messages.some((message) => message.sender === "other" && !message.read)) return;
  write({ ...store, [conversationId]: messages.map((message) => ({ ...message, read: true })) });
}

export function useMessages() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const messages = useMemo(() => parse(snapshot), [snapshot]);
  return { messages, sendMessage, markRead };
}
