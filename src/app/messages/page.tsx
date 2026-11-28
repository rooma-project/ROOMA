import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MessageCenter from "@/components/messages/MessageCenter";

export const metadata: Metadata = { title: "Messages | ROOMA" };

export default function MessagesPage() {
  return <><Navbar /><main><MessageCenter /></main><Footer /></>;
}
