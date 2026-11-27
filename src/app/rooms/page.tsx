
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedRooms from "@/components/home/FeaturedRooms";

export const metadata: Metadata = {
  title: "Explore Rooms | ROOMA",
  description: "Explore student rooms and find your next home.",
};

export default function RoomsPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="mx-auto max-w-[1440px] px-6 pt-16 md:px-12 md:pt-24">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
            ROOMA / Student Housing
          </p>

          <h1 className="text-5xl font-black leading-[1.12] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
  <span className="block">
    A place to
  </span>

  <span className="mt-2 block">
    call{" "}
    <span className="inline-block bg-accent px-2 leading-[1.05]">
      home.
    </span>
  </span>
</h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            Discover student accommodation that fits your
            budget, lifestyle and next chapter.
          </p>
        </section>

        <FeaturedRooms />
      </main>

      <Footer />
    </>
  );
}
