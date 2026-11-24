
"use client";

import { useState } from "react";
import { rooms } from "@/data/rooms";
import SearchBar from "./SearchBar";
import RoomCard from "@/components/rooms/RoomCard";

export default function FeaturedRooms() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");

  const filteredRooms = rooms.filter((room) => {
    const matchesLocation = room.location
      .toLowerCase()
      .includes(location.trim().toLowerCase());

    const matchesBudget =
      budget === "" || room.price <= Number(budget);

    return matchesLocation && matchesBudget;
  });

  return (
    <section
      id="rooms"
      className="mx-auto max-w-[1440px] px-6 py-20 md:px-12"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
        01 / Explore
      </p>

      <h2 className="mb-8 text-5xl font-black tracking-tighter md:text-7xl">
        Find your space.
      </h2>

      <SearchBar
        location={location}
        budget={budget}
        setLocation={setLocation}
        setBudget={setBudget}
      />

      <div className="my-6 flex items-center justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {filteredRooms.length} sample rooms found
        </p>

        <button
          onClick={() => {
            setLocation("");
            setBudget("");
          }}
          className="text-sm underline"
        >
          Clear filters
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <p className="py-12 text-center text-muted">
          No rooms match your search.
        </p>
      )}
    </section>
  );
}
