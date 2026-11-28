"use client";

import { useSyncExternalStore } from "react";
import { dismissToast, getServerToasts, getToasts, subscribeToasts, type ToastKind } from "@/lib/toast";

const styles: Record<ToastKind, { panel: string; icon: string; detail: string; symbol: string }> = {
  success: { panel: "bg-white text-foreground border-border", icon: "bg-accent text-foreground", detail: "text-muted", symbol: "✓" },
  info: { panel: "bg-foreground text-white border-foreground", icon: "bg-accent text-foreground", detail: "text-white/75", symbol: "i" },
  error: { panel: "bg-white text-foreground border-red-200", icon: "bg-red-100 text-red-800", detail: "text-muted", symbol: "!" },
};

export default function ToastViewport() {
  const notices = useSyncExternalStore(subscribeToasts, getToasts, getServerToasts);

  return (
    <section aria-label="Notifications" className="pointer-events-none fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[9999] flex max-h-[80vh] flex-col gap-3 overflow-y-auto sm:left-auto sm:w-[380px]">
      {notices.map((notice) => {
        const style = styles[notice.kind];
        return (
          <div key={notice.id} className={`pointer-events-auto flex items-start gap-3 border p-4 shadow-lg ${style.panel}`}>
            <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-xl font-black ${style.icon}`}>{style.symbol}</span>
            <div role={notice.kind === "error" ? "alert" : "status"} className="min-w-0 flex-1 [overflow-wrap:anywhere]">
              <p className="text-sm font-bold">{notice.title}</p>
              {notice.description && <p className={`mt-1 text-xs leading-relaxed ${style.detail}`}>{notice.description}</p>}
            </div>
            <button type="button" aria-label={`Dismiss notification: ${notice.title}`} onClick={() => dismissToast(notice.id)} className="flex h-8 w-8 shrink-0 items-center justify-center text-xl opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2">×</button>
          </div>
        );
      })}
    </section>
  );
}
