
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandlordDashboard from "@/components/dashboard/LandlordDashboard";

export const metadata: Metadata = {
  title: "Landlord Dashboard | ROOMA",
  description: "Manage your student accommodation listings.",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main>
        <LandlordDashboard />
      </main>

      <Footer />
    </>
  );
}
