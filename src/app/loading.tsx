export default function Loading() {
  return (
    <main className="mx-auto min-h-[70vh] max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      <div role="status" aria-live="polite" className="mb-8 flex items-center gap-3">
        <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-full border-2 border-border border-t-foreground motion-safe:animate-spin" />
        <span className="text-sm font-semibold text-muted">Loading your space...</span>
      </div>
      <div aria-hidden="true" className="motion-safe:animate-pulse">
        <div className="mb-5 h-3 w-32 bg-border" />
        <div className="mb-4 h-12 w-full max-w-lg bg-border sm:h-16" />
        <div className="mb-10 h-5 w-full max-w-sm bg-border" />
        <div className="mb-6 grid gap-4 border border-border bg-white p-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-11 bg-background" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="overflow-hidden border border-border bg-white">
              <div className="aspect-[4/3] bg-border" />
              <div className="space-y-4 p-6">
                <div className="h-3 w-24 bg-border" />
                <div className="h-6 w-4/5 bg-border" />
                <div className="h-4 w-1/2 bg-border" />
                <div className="h-11 w-full bg-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
