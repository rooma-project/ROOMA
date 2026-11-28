"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import SearchBar, { type RoomFilters } from "@/components/home/SearchBar";
import { mapRooms } from "@/data/mapRooms";
import FavoriteButton from "@/components/rooms/FavoriteButton";

const RoomMap = dynamic(() => import("./RoomMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-background">
      <p className="animate-pulse text-sm font-semibold text-muted">
        Loading map...
      </p>
    </div>
  ),
});

const initialFilters: RoomFilters = {
  location: "",
  minPrice: "",
  maxPrice: "",
  minSize: "",
  furnished: "all",
  sort: "default",
};

function normalizeLocation(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR")
    .normalize("NFD").replace(/\p{M}/gu, "").replace(/ı/g, "i");
}

function formatPrice(price: number) {
  return `₺${price.toLocaleString("tr-TR")}`;
}

export default function MapExplorer() {
  const [filters, setFilters] = useState<RoomFilters>(initialFilters);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const invalidFilters =
    [filters.minPrice, filters.maxPrice, filters.minSize].some(
      (value) => value !== "" && (!Number.isFinite(Number(value)) || Number(value) < 0)
    ) ||
    (filters.minPrice !== "" && filters.maxPrice !== "" &&
      Number(filters.minPrice) > Number(filters.maxPrice));

  const filteredRooms = useMemo(() => {
    if (invalidFilters) return [];

    return mapRooms.filter((room) => {
      return (
        normalizeLocation(room.location).includes(normalizeLocation(filters.location)) &&
        (filters.minPrice === "" || room.price >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" || room.price <= Number(filters.maxPrice)) &&
        (filters.minSize === "" || room.size >= Number(filters.minSize)) &&
        (filters.furnished === "all" ||
          (filters.furnished === "yes" && room.furnished) ||
          (filters.furnished === "no" && !room.furnished))
      );
    }).sort((a, b) => {
      switch (filters.sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "size-asc": return a.size - b.size;
        case "size-desc": return b.size - a.size;
        default: return 0;
      }
    });
  }, [filters, invalidFilters]);

  function changeFilters(next: RoomFilters) {
    setFilters(next);
    setSelectedRoomId(null);
  }

  function resetFilters() {
    changeFilters({ ...initialFilters });
  }

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
        ROOMA / Explore Istanbul
      </p>
      <h1 className="max-w-5xl text-4xl font-black leading-[1.12] tracking-tighter sm:text-6xl lg:text-8xl">
        Find your <span className="block break-words">neighbourhood.</span>
      </h1>
      <p className="mb-10 mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Explore student accommodation in Istanbul and discover your next neighbourhood.
      </p>

      <SearchBar filters={filters} onChange={changeFilters} onReset={resetFilters} />
      <p className="mt-3 text-xs text-muted">Rent filters exclude utilities and deposit.</p>

      <div className="my-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          {invalidFilters ? "Invalid filters" : `${filteredRooms.length} sample rooms found`}
        </p>
        <Link href="/rooms" className="border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent">
          List view ↗
        </Link>
      </div>

      {invalidFilters && (
        <p role="alert" className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Enter non-negative values. Minimum rent cannot exceed maximum rent.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="relative isolate h-[420px] min-w-0 overflow-hidden border border-border lg:h-[620px]">
          <RoomMap rooms={filteredRooms} selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />
        </div>

        <div className="min-w-0 space-y-4 lg:max-h-[620px] lg:overflow-y-auto">
          {filteredRooms.map((room) => {
            const isSelected = selectedRoomId === room.id;
            return (
              <article key={room.id} className={`border bg-white p-4 transition-colors ${isSelected ? "border-foreground ring-1 ring-inset ring-foreground" : "border-border"}`}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={room.image} alt={room.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                  <span className="absolute left-3 top-3 bg-accent px-3 py-2 text-xs font-bold">
                    {formatPrice(room.price)} / month
                  </span>
                </div>
                <div className="pt-5">
                  <h2 className="text-2xl font-black tracking-tight">{room.title}</h2>
                  <p className="mt-2 text-sm text-muted">{room.location} · {room.size} m²</p>
                  <p className="mt-2 text-sm text-muted">{room.furnished ? "Furnished" : "Unfurnished"}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button type="button" aria-pressed={isSelected} onClick={() => setSelectedRoomId(room.id)} className={`px-4 py-3 text-sm font-semibold transition-colors ${isSelected ? "bg-foreground text-white" : "bg-accent hover:bg-foreground hover:text-white"}`}>
                      {isSelected ? "Selected on map" : "Show on map"}
                    </button>
                    <Link href={`/rooms/${room.id}`} className="border border-border px-4 py-3 text-sm font-semibold hover:bg-background">
                      View room ↗
                    </Link>
                  </div>
                  <FavoriteButton roomId={room.id} className="mt-3" />
                </div>
              </article>
            );
          })}

          {filteredRooms.length === 0 && (
            <div className="border border-border bg-white px-6 py-12 text-center">
              <h2 className="text-2xl font-black tracking-tight">{invalidFilters ? "Check your filters." : "No rooms found."}</h2>
              <p className="mt-3 text-sm text-muted">Try adjusting your search or clearing your filters.</p>
              <button type="button" onClick={resetFilters} className="mt-5 bg-accent px-5 py-3 text-sm font-bold hover:bg-foreground hover:text-white">
                Reset filters ↗
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="mt-6 text-xs text-muted">
        Demo map — room locations are illustrative and do not represent actual property addresses.
      </p>
    </section>
  );
}
