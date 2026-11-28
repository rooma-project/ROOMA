"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { conversations, type Conversation, type DemoMessage } from "@/data/messages";
import { useMessages } from "@/lib/useMessages";
import { toast } from "@/lib/toast";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

function timeLabel(value: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }).format(new Date(value));
}

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Istanbul" }).format(new Date(value));
}

function ChatPanel({ conversation, history, send }: {
  conversation: Conversation;
  history: DemoMessage[];
  send: (id: string, text: string) => boolean;
}) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const scrollArea = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const area = scrollArea.current;
    if (area) area.scrollTop = area.scrollHeight;
  }, [history.length]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    if (send(conversation.id, draft)) {
      setDraft("");
      setError("");
      toast.success("Demo message saved", "No real message was sent.");
    } else {
      setError("Could not save the demo message. Check your browser storage settings.");
      toast.error("Could not save message", "Check your browser storage settings.");
    }
  }

  return (
    <section className="flex min-h-[540px] min-w-0 flex-col bg-white lg:h-[650px]" aria-label={`Conversation with ${conversation.name}`}>
      <header className="flex items-center gap-3 border-b border-border p-4 sm:p-5">
        <Link href="/messages" className="shrink-0 text-sm font-semibold underline lg:hidden" aria-label="Back to conversations">← Back</Link>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-sm font-black">{initials(conversation.name)}</div>
        <div className="min-w-0">
          <h2 className="break-words text-lg font-black">{conversation.name}</h2>
          <p className="truncate text-xs text-muted">{conversation.subtitle}</p>
        </div>
      </header>
      <div ref={scrollArea} role="log" aria-label="Messages" aria-live="polite" className="h-[340px] flex-1 space-y-4 overflow-y-auto bg-background/60 p-4 sm:p-6">
        {history.length === 0 && <p className="py-16 text-center text-sm text-muted">No messages yet. Start a demo conversation.</p>}
        {history.map((message, index) => (
          <div key={message.id}>
            {(index === 0 || dateLabel(history[index - 1].sentAt) !== dateLabel(message.sentAt)) && <p className="mb-4 text-center text-xs text-muted">{dateLabel(message.sentAt)}</p>}
            <div className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] min-w-0 rounded-2xl px-4 py-3 ${message.sender === "me" ? "rounded-br-sm bg-accent" : "rounded-bl-sm border border-border bg-white"}`}>
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed [overflow-wrap:anywhere]">{message.text}</p>
                <p className="mt-2 text-right text-[11px] text-foreground/70">{message.sender === "me" ? "You · " : ""}{timeLabel(message.sentAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="border-t border-border p-4 sm:p-5">
        {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
        <label htmlFor="message-draft" className="sr-only">Your message</label>
        <div className="flex items-end gap-2">
          <textarea id="message-draft" rows={2} value={draft} maxLength={2000} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message..." className="min-w-0 flex-1 resize-y border border-border bg-background px-3 py-3 text-sm outline-none focus:border-foreground" />
          <button type="submit" disabled={!draft.trim()} className="shrink-0 bg-accent px-4 py-4 text-sm font-bold hover:bg-foreground hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-6">Send ↗</button>
        </div>
        <p className="mt-2 text-xs text-muted">Demo only · No real message is sent.</p>
      </form>
    </section>
  );
}

export default function MessageCenter({ selectedId }: { selectedId?: string }) {
  const { messages, sendMessage, markRead } = useMessages();
  const [search, setSearch] = useState("");
  const selected = conversations.find((item) => item.id === selectedId);
  const unread = Object.values(messages).reduce((total, history) => total + history.filter((message) => message.sender === "other" && !message.read).length, 0);
  const query = search.trim().toLocaleLowerCase("tr-TR");
  const visible = conversations.filter((item) => `${item.name} ${item.subtitle}`.toLocaleLowerCase("tr-TR").includes(query)).sort((a, b) => {
    const aLast = messages[a.id]?.at(-1)?.sentAt;
    const bLast = messages[b.id]?.at(-1)?.sentAt;
    return (bLast ? Date.parse(bLast) : 0) - (aLast ? Date.parse(aLast) : 0);
  });

  useEffect(() => {
    if (selectedId) markRead(selectedId);
  }, [selectedId, markRead, messages]);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:px-12 md:py-20">
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">ROOMA / Messages</p>
      <h1 className="text-5xl font-black leading-[1.12] tracking-tighter sm:text-6xl lg:text-7xl">Start a conversation.</h1>
      <p className="mb-8 mt-5 max-w-xl text-lg text-muted">Connect with students and landlords in Istanbul.</p>
      <div className="grid overflow-hidden border border-border bg-white lg:grid-cols-[minmax(260px,1fr)_minmax(0,2fr)]">
        <aside className={`${selected ? "hidden lg:block" : "block"} min-w-0 border-border lg:border-r`}>
          <div className="border-b border-border p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-black">Inbox</h2>
              <span className="bg-accent px-2 py-1 text-xs font-bold" aria-live="polite">{unread} unread</span>
            </div>
            <label htmlFor="conversation-search" className="sr-only">Search conversations</label>
            <input id="conversation-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search conversations" className="w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-foreground" />
          </div>
          <nav aria-label="Conversations" className="lg:max-h-[510px] lg:overflow-y-auto">
            {visible.map((item) => {
              const history = messages[item.id] ?? [];
              const last = history.at(-1);
              const count = history.filter((message) => message.sender === "other" && !message.read).length;
              return (
                <Link key={item.id} href={`/messages/${item.id}`} aria-current={selectedId === item.id ? "page" : undefined} className={`flex items-center gap-3 border-b border-border p-4 transition-colors hover:bg-background ${selectedId === item.id ? "bg-accent/35" : ""}`}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-background text-xs font-black">{initials(item.name)}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{item.name}</p>
                    <p className="mt-1 truncate text-xs text-muted">{last ? `${last.sender === "me" ? "You: " : ""}${last.text}` : item.subtitle}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    {last && <span className="text-[10px] text-muted">{timeLabel(last.sentAt)}</span>}
                    {count > 0 && <span className="rounded-full bg-foreground px-2 py-1 text-[10px] font-bold text-white" aria-label={`${count} unread messages`}>{count}</span>}
                  </div>
                </Link>
              );
            })}
            {visible.length === 0 && <p className="p-6 text-center text-sm text-muted">No conversations found.</p>}
          </nav>
        </aside>
        {selected ? <ChatPanel key={selected.id} conversation={selected} history={messages[selected.id] ?? []} send={sendMessage} /> : (
          <div className="hidden min-h-[650px] flex-col items-center justify-center bg-background/60 p-8 text-center lg:flex">
            <div className="mb-5 flex h-16 w-16 items-center justify-center bg-accent text-3xl font-black">↗</div>
            <h2 className="text-3xl font-black tracking-tight">Your next home starts here.</h2>
            <p className="mt-3 max-w-sm text-sm text-muted">Select a conversation to view messages and start chatting.</p>
          </div>
        )}
      </div>
      <p className="mt-5 text-xs text-muted">Demo inbox with fictional contacts. Messages stay in this browser tab until the session ends. Do not enter personal information.</p>
    </section>
  );
}
