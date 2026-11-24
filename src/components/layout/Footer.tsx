import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-foreground text-white">

      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">

        <div className="grid gap-12 md:grid-cols-3">

          <div className="md:col-span-2">
            <Link
  href="/"
  className="text-7xl font-black tracking-tighter text-accent"
>
  rooma.
</Link>

            <p className="mt-6 leading-relaxed text-white/60">
              find the room.
              <br />
              meet the people.
              <br />
              live the city.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest">
              Explore
            </h3>

            <div className="flex flex-col gap-4 text-sm text-white/60">

              <a href="#rooms" className="hover:text-accent">
                Find a room
              </a>

              <a href="#matching" className="hover:text-accent">
                Find a roommate
              </a>

              <a href="#how-it-works" className="hover:text-accent">
                How it works
              </a>

            </div>
          </div>

        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/20 pt-8 text-xs text-white/50 md:flex-row">

          <p>© 2026 ROOMA</p>

          <p>University Graduation Project</p>

          <p>Built for student life.</p>

        </div>
      </div>
    </footer>
  );
}
