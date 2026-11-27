
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CreateRoomForm from "@/components/rooms/CreateRoomForm";
import { rooms } from "@/data/rooms";

export const metadata: Metadata = {
  title: "Edit Listing | ROOMA",
};

interface EditRoomPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return rooms.map((room) => ({
    id: String(room.id),
  }));
}

export default async function EditRoomPage({
  params,
}: EditRoomPageProps) {
  const { id } = await params;

  const room = rooms.find(
    (item) => String(item.id) === id
  );

  if (!room) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-[1000px] px-6 py-16 md:px-12 md:py-24">

        <Link
          href="/dashboard"
          className="mb-8 inline-block text-sm underline"
        >
          ← Back to dashboard
        </Link>

        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
          ROOMA / Edit listing
        </p>

        <h1 className="text-5xl font-black leading-[1.15] tracking-tighter sm:text-6xl lg:text-7xl">
          Update your space.
        </h1>

        <p className="mt-6 text-lg text-muted">
          Editing: {room.title}
        </p>

        <div className="my-8 border border-border bg-white p-5 text-sm text-muted">
          You are editing a sample listing.
          Changes will not be permanently saved
          until database integration is completed.
        </div>

        <CreateRoomForm
          key={room.id}
          initialRoom={room}
        />

      </main>

      <Footer />
    </>
  );
}
