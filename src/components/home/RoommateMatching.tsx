
const compatibility = [
  { label: "Cleanliness", score: 95 },
  { label: "Sleep schedule", score: 90 },
  { label: "Social lifestyle", score: 85 },
  { label: "House rules", score: 98 },
];

export default function RoommateMatching() {
  return (
    <section
      id="matching"
      className="bg-foreground text-white"
    >
    <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-2">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent">
            02 / Roommate Matching
          </p>

    <h2 className="text-4xl font-black leading-none tracking-tighter sm:text-5xl lg:text-6xl xl:text-7xl">            Good rooms.
            <br />
            <span className="text-accent">
              Better roommates.
            </span>
          </h2>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60">
            Find people who match your lifestyle,
            not just your budget.
          </p>
        </div>

    <div className="min-w-0 border border-white/20 bg-white/5 p-5 sm:p-8 xl:p-10">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">
                Lifestyle compatibility
              </h3>

              <p className="mt-2 text-sm text-white/50">
                Example matching result
              </p>
            </div>

            <span className="text-5xl font-black text-accent">
              92%
            </span>
          </div>

          <div className="space-y-6">
            {compatibility.map((item) => (
              <div key={item.label}>

                <div className="mb-3 flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-accent">
                    {item.score}%
                  </span>
                </div>

                <div
                  className="h-2 bg-white/10"
                  role="meter"
                  aria-label={item.label}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.score}
                >
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${item.score}%` }}
                  />
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
