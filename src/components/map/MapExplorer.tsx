
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { mapRooms } from "@/data/mapRooms";

const RoomMap = dynamic(
  () => import("./RoomMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-background">
        <p className="animate-pulse text-sm font-semibold text-muted">
          Loading map...
        </p>
      </div>
    ),
  }
);

export default function MapExplorer() {
  const [selectedRoomId, setSelectedRoomId] =
    useState<number | null>(null);

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
        ROOMA / Explore the city
      </p>

      <h1 className="max-w-5xl text-5xl font-black leading-[1.12] tracking-tighter sm:text-6xl lg:text-8xl">
        Find your
        <span className="block break-words">
          neighbourhood.
        </span>
      </h1>

      <p className="mb-10 mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Explore student accommodation on the map
        and discover your next neighbourhood.
      </p>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {mapRooms.length} sample rooms on the map
        </p>

        <Link
          href="/rooms"
          className="border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent"
        >
          List view ↗
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* Interactive map */}

        <div className="relative isolate h-[420px] min-w-0 overflow-hidden border border-border lg:h-[620px]">
          <RoomMap
            rooms={mapRooms}
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
          />
        </div>

        {/* Room list */}

        <div className="min-w-0 space-y-4 lg:max-h-[620px] lg:overflow-y-auto">
          {mapRooms.map((room) => {
            const isSelected =
              selectedRoomId === room.id;

            return (
              <article
                key={room.id}
                className={`border bg-white p-4 transition-colors ${
                  isSelected
                    ? "border-foreground ring-1 ring-inset ring-foreground"
                    : "border-border"
                }`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />

                  <span className="absolute left-3 top-3 bg-accent px-3 py-2 text-xs font-bold">
                    ₺{room.price} / month
                  </span>
                </div>

                <div className="pt-5">
                  <h2 className="text-2xl font-black tracking-tight">
                    {room.title}
                  </h2>

                  <p className="mt-2 text-sm text-muted">
                    {room.location} · {room.size} m²
                  </p>

                  <p className="mt-2 text-sm text-muted">
                    {room.furnished
                      ? "Furnished"
                      : "Unfurnished"}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setSelectedRoomId(room.id)
                      }
                      className={`px-4 py-3 text-sm font-semibold transition-colors ${
                        isSelected
                          ? "bg-foreground text-white"
                          : "bg-accent hover:bg-foreground hover:text-white"
                      }`}
                    >
                      {isSelected
                        ? "Selected on map"
                        : "Show on map"}
                    </button>

                    <Link
                      href={`/rooms/${room.id}`}
                      className="border border-border px-4 py-3 text-sm font-semibold hover:bg-background"
                    >
                      View room ↗
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">
        Demo map — room locations are illustrative
        and do not represent actual property addresses.
      </p>
    </section>
  );
}
