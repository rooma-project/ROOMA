import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FavoritesList from "@/components/rooms/FavoritesList";

export const metadata: Metadata = {
  title: "Saved Rooms | ROOMA",
  description: "Keep your favorite student accommodation listings in one place.",
};

export default function FavoritesPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">ROOMA / Favorites</p>
        <h1 className="text-5xl font-black leading-[1.12] tracking-tighter sm:text-6xl lg:text-8xl">
          Keep your <span className="inline-block bg-accent px-2">favorites.</span>
        </h1>
        <p className="mb-12 mt-6 max-w-xl text-lg leading-relaxed text-muted">Your personal shortlist of rooms in Istanbul. Compare your options and find your next home.</p>
        <FavoritesList />
      </main>
      <Footer />
    </>
  );
}
