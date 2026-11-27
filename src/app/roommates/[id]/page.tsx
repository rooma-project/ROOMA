import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoommateDetail from "@/components/roommates/RoommateDetail";
import { roommates } from "@/data/roommates";

export const metadata: Metadata = {
  title: "Roommate Profile | ROOMA",
  description: "Compare student lifestyle preferences in Istanbul.",
};

export function generateStaticParams() {
  return roommates.map((roommate) => ({ id: String(roommate.id) }));
}

export default async function RoommateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const roommate = roommates.find((item) => String(item.id) === id);
  if (!roommate) notFound();
  return (
    <>
      <Navbar />
      <main><RoommateDetail roommate={roommate} /></main>
      <Footer />
    </>
  );
}
