
import type { Metadata } from "next";

import "leaflet/dist/leaflet.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MapExplorer from "@/components/map/MapExplorer";

export const metadata: Metadata = {
  title: "Explore Map | ROOMA",
  description:
    "Explore student accommodation and neighbourhoods on the map.",
};

export default function MapPage() {
  return (
    <>
      <Navbar />

      <main>
        <MapExplorer />
      </main>

      <Footer />
    </>
  );
}
