import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { rooms } from "@/data/rooms";
import FavoriteButton from "@/components/rooms/FavoriteButton";

interface RoomDetailProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return rooms.map((room) => ({
    id: String(room.id),
  }));
}

function formatPrice(amount: number) {
  return `₺${amount.toLocaleString("tr-TR", {
    maximumFractionDigits: 2,
  })}`;
}

export default async function RoomDetailPage({ params }: RoomDetailProps) {
  const { id } = await params;

  const room = rooms.find((item) => String(item.id) === id);

  if (!room) {
    notFound();
  }

  const monthlyTotal = room.price + room.utilities;

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-6 py-12 md:px-12">
        <Link
          href="/rooms"
          className="mb-8 inline-block text-sm font-medium underline"
        >
          ← Back to rooms
        </Link>

        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
          ROOMA / {room.location}
        </p>

        <h1 className="mb-4 text-4xl font-black tracking-tighter md:text-6xl">
          {room.title}
        </h1>

        <p className="mb-8 text-muted">
          {room.location} · {room.size} m² ·{" "}
          {room.furnished ? "Furnished" : "Unfurnished"}
        </p>

        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <Image
                src={room.image}
                alt={room.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              <span className="absolute left-4 top-4 bg-accent px-4 py-2 text-xs font-bold">
                SAMPLE LISTING
              </span>
            </div>

            <section className="border-b border-border py-10">
              <h2 className="mb-5 text-3xl font-black tracking-tight">
                About this room.
              </h2>

              <p className="leading-relaxed text-muted">{room.description}</p>
            </section>

            <section className="py-10">
              <h2 className="mb-6 text-3xl font-black tracking-tight">
                What&apos;s included.
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="border border-border bg-white p-4 text-sm"
                  >
                    ✓ {amenity}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="border border-border bg-white p-6 lg:sticky lg:top-8 md:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
              Monthly rent
            </p>

            <p className="flex flex-wrap items-baseline gap-x-2 text-4xl font-black tracking-tight sm:text-5xl">
              {formatPrice(room.price)}
              <span className="text-sm font-normal text-muted">/ month</span>
            </p>

            <div className="my-8 space-y-5 border-y border-border py-6">
              <div className="flex justify-between gap-3">
                <span className="text-muted">Rent</span>
                <span className="shrink-0">{formatPrice(room.price)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-muted">Estimated utilities</span>
                <span className="shrink-0">{formatPrice(room.utilities)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-muted">Refundable deposit</span>
                <span className="shrink-0">{formatPrice(room.deposit)}</span>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <span className="font-semibold">Monthly total</span>
              <span className="text-3xl font-black">
                {formatPrice(monthlyTotal)}
              </span>
            </div>

            <Link
              href={`/messages/room-${room.id}`}
              className="block w-full bg-accent px-6 py-4 text-center font-bold transition-colors hover:bg-foreground hover:text-white"
            >
              Contact landlord ↗
            </Link>

            <FavoriteButton roomId={room.id} className="mt-3" />

            <p className="mt-4 text-center text-xs text-muted">
              Demo listing — try our messaging interface.
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
