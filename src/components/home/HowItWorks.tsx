
const steps = [
  {
    number: "01",
    title: "Find your space.",
    description:
      "Explore rooms that fit your budget, location and lifestyle.",
    symbol: "⌕",
  },
  {
    number: "02",
    title: "Meet your people.",
    description:
      "Connect with roommates who share your living preferences.",
    symbol: "◎",
  },
  {
    number: "03",
    title: "Make it home.",
    description:
      "Get in touch and take the next step in your student journey.",
    symbol: "↗",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-12"
    >
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
        03 / How It Works
      </p>

      <h2 className="mb-12 max-w-4xl text-5xl font-black tracking-tighter md:text-7xl">
        Your next chapter starts here.
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <article
            key={step.number}
            className="border border-border p-8 transition-colors hover:bg-white"
          >
            <div className="mb-12 flex items-center justify-between">

              <span
                aria-hidden="true"
                className="flex h-16 w-16 items-center justify-center bg-accent text-4xl font-bold"
              >
                {step.symbol}
              </span>

              <span className="text-sm text-muted">
                / {step.number}
              </span>

            </div>

            <h3 className="mb-4 text-3xl font-black tracking-tight">
              {step.title}
            </h3>

            <p className="leading-relaxed text-muted">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
