"use client";

import Link from "next/link";
import RoomCard from "@/components/rooms/RoomCard";
import { rooms } from "@/data/rooms";
import { useFavorites } from "@/lib/useFavorites";

export default function FavoritesList() {
  const { favoriteIds } = useFavorites();
  const savedRooms = [...favoriteIds].reverse().flatMap((id) => {
    const room = rooms.find((item) => item.id === id);
    return room ? [room] : [];
  });

  return (
    <section aria-label="Saved rooms">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          {savedRooms.length} saved {savedRooms.length === 1 ? "room" : "rooms"}
        </p>
        <Link href="/rooms" className="text-sm font-semibold underline">Explore rooms ↗</Link>
      </div>
      {savedRooms.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedRooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      ) : (
        <div className="border border-border bg-white px-6 py-16 text-center md:py-24">
          <span aria-hidden="true" className="text-5xl">♡</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight">No saved rooms yet.</h2>
          <p className="mx-auto mt-4 max-w-sm text-muted">Save the rooms you like and keep your shortlist in one place.</p>
          <Link href="/rooms" className="mt-6 inline-block bg-accent px-6 py-4 font-bold transition-colors hover:bg-foreground hover:text-white">Explore rooms ↗</Link>
        </div>
      )}
      <p className="mt-8 text-xs text-muted">Demo favorites are stored in this browser, not in your ROOMA account.</p>
    </section>
  );
}
