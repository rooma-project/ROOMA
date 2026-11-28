"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/rooms";
import { formatPrice } from "@/lib/formatPrice";
import { toast } from "@/lib/toast";

export default function LandlordDashboard() {
  const [listings, setListings] = useState([...rooms]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const totalRent = listings.reduce(
    (total, room) => total + room.price,
    0
  );

  function deleteListing(id: number) {
    setListings((previous) =>
      previous.filter((room) => room.id !== id)
    );
    setDeleteId(null);
    setMessage("Listing removed from the demo dashboard.");
    toast.success("Listing removed", "Removed from the demo dashboard.");
  }

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      {/* Dashboard header */}
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
        ROOMA / Landlord Dashboard
      </p>

      <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-5xl font-black leading-[1.12] tracking-tighter sm:text-6xl lg:text-7xl">
            Manage your space.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Create and manage your student accommodation listings in one place.
          </p>
        </div>
        <Link
          href="/rooms/create"
          className="shrink-0 bg-accent px-6 py-4 font-bold transition-colors hover:bg-foreground hover:text-white"
        >
          + Create listing
        </Link>
      </div>

      {/* Statistics */}
      <div className="mb-12 grid gap-5 sm:grid-cols-2">
        <article className="border border-border bg-white p-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
            Total listings
          </p>
          <p className="text-5xl font-black tracking-tight">{listings.length}</p>
          <p className="mt-3 text-sm text-muted">Listings in your demo dashboard</p>
        </article>
        <article className="border border-border bg-accent p-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest">
            Total listed rent
          </p>
          <p className="text-5xl font-black tracking-tight">
            {formatPrice(totalRent)}
          </p>
          <p className="mt-3 text-sm">Combined monthly asking rent</p>
        </article>
      </div>

      {/* Listing management */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-4xl font-black tracking-tighter">Your listings.</h2>
        <p className="text-sm text-muted">{listings.length} sample listings</p>
      </div>

      {message && (
        <p role="status" className="mb-6 border border-border bg-white p-4 text-sm">
          {message}
        </p>
      )}

      <div className="space-y-4">
        {listings.map((room) => (
          <article key={room.id} className="border border-border bg-white p-4 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              {/* Room image */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-background sm:w-48">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 192px"
                  className="object-cover"
                />
              </div>

              {/* Room information */}
              <div className="min-w-0 flex-1">
                <span className="inline-block bg-background px-3 py-2 text-xs font-semibold">
                  SAMPLE LISTING
                </span>
                <h3 className="mt-4 break-words text-2xl font-black tracking-tight">
                  {room.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {room.location} · {room.size} m² ·{" "}
                  {room.furnished ? "Furnished" : "Unfurnished"}
                </p>
                <p className="mt-4 text-2xl font-black">
                  {formatPrice(room.price)}
                  <span className="ml-1 text-sm font-normal text-muted">/ month</span>
                </p>
              </div>

              {/* Listing actions */}
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Link
                  href={`/rooms/${room.id}`}
                  className="border border-border px-4 py-3 text-sm font-semibold hover:bg-background"
                >
                  View ↗
                </Link>
                <Link
                  href={`/rooms/${room.id}/edit`}
                  className="border border-border px-4 py-3 text-sm font-semibold hover:bg-background"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteId(room.id);
                    setMessage("");
                  }}
                  className="border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Delete confirmation */}
            {deleteId === room.id && (
              <div className="mt-6 border-t border-border pt-6">
                <p className="mb-4 font-semibold">Remove this listing?</p>
                <p className="mb-4 text-sm text-muted">
                  This only removes the listing from the current demo dashboard.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => deleteListing(room.id)}
                    className="bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Confirm delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(null)}
                    className="border border-border px-5 py-3 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}

        {listings.length === 0 && (
          <div className="border border-border bg-white px-6 py-20 text-center">
            <h3 className="text-3xl font-black tracking-tight">No listings yet.</h3>
            <p className="mt-4 text-muted">Create your first room listing to get started.</p>
            <Link
              href="/rooms/create"
              className="mt-6 inline-block bg-accent px-6 py-4 font-bold"
            >
              + Create listing
            </Link>
          </div>
        )}
      </div>

      <p className="mt-10 text-center text-xs text-muted">
        Demo dashboard — changes are not saved to a database.
      </p>
    </section>
  );
}
