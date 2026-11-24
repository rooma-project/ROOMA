
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign In | ROOMA",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main>
        <AuthForm mode="login" />
      </main>

      <Footer />
    </>
  );
}
