
"use client";

import { useState } from "react";
import { rooms } from "@/data/rooms";
import SearchBar, { type RoomFilters } from "./SearchBar";
import RoomCard from "@/components/rooms/RoomCard";

const initialFilters: RoomFilters = {
  location: "",
  minPrice: "",
  maxPrice: "",
  minSize: "",
  furnished: "all",
  sort: "default",
};

export default function FeaturedRooms() {
  const [filters, setFilters] =
    useState<RoomFilters>(initialFilters);

  const invalidFilters =
    [filters.minPrice, filters.maxPrice, filters.minSize]
      .some((value) =>
        value !== "" &&
        (!Number.isFinite(Number(value)) || Number(value) < 0)
      ) ||
    (
      filters.minPrice !== "" &&
      filters.maxPrice !== "" &&
      Number(filters.minPrice) > Number(filters.maxPrice)
    );

  const filteredRooms = invalidFilters
    ? []
    : rooms.filter((room) => {

        const matchesLocation = room.location
          .toLowerCase()
          .includes(filters.location.trim().toLowerCase());

        const matchesMinPrice =
          filters.minPrice === "" ||
          room.price >= Number(filters.minPrice);

        const matchesMaxPrice =
          filters.maxPrice === "" ||
          room.price <= Number(filters.maxPrice);

        const matchesSize =
          filters.minSize === "" ||
          room.size >= Number(filters.minSize);

        const matchesFurnished =
          filters.furnished === "all" ||
          (filters.furnished === "yes" && room.furnished) ||
          (filters.furnished === "no" && !room.furnished);

        return (
          matchesLocation &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesSize &&
          matchesFurnished
        );
      });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "size-desc":
        return b.size - a.size;

      case "size-asc":
        return a.size - b.size;

      default:
        return 0;
    }
  });

  function resetFilters() {
    setFilters({ ...initialFilters });
  }

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
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />

      <div className="my-6 flex items-center justify-between">
        <p
          className="text-sm text-muted"
          aria-live="polite"
        >
          {sortedRooms.length} sample rooms found
        </p>
      </div>

      {invalidFilters ? (
        <div
          role="alert"
          className="border border-border bg-white p-6 text-sm text-red-600"
        >
          Please enter valid non-negative values. Minimum rent
          cannot exceed maximum rent.
        </div>
      ) : sortedRooms.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="border border-border bg-white px-6 py-16 text-center">

          <h3 className="text-3xl font-black tracking-tight">
            No rooms found.
          </h3>

          <p className="mt-4 text-muted">
            Try adjusting your filters to find more rooms.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 bg-accent px-6 py-3 font-semibold transition-colors hover:bg-foreground hover:text-white"
          >
            Reset filters ↗
          </button>

        </div>
      )}
    </section>
  );
}
