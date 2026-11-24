
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Account | ROOMA",
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <main>
        <AuthForm mode="register" />
      </main>

      <Footer />
    </>
  );
}
