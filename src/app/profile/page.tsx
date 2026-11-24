
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata: Metadata = {
  title: "My Profile | ROOMA",
};

export default function ProfilePage() {
  return (
    <>
      <Navbar />

      <main>
        <ProfileForm />
      </main>

      <Footer />
    </>
  );
}
