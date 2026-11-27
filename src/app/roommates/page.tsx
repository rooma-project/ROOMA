import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoommateExplorer from "@/components/roommates/RoommateExplorer";

export const metadata: Metadata = {
  title: "Find a Roommate | ROOMA",
  description: "Discover compatible student roommates in Istanbul.",
};

export default function RoommatesPage() {
  return (
    <>
      <Navbar />
      <main><RoommateExplorer /></main>
      <Footer />
    </>
  );
}
