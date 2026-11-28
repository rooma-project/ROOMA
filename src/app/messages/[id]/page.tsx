import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MessageCenter from "@/components/messages/MessageCenter";
import { conversations } from "@/data/messages";

export const metadata: Metadata = { title: "Conversation | ROOMA" };

export function generateStaticParams() {
  return conversations.map((conversation) => ({ id: conversation.id }));
}

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!conversations.some((item) => item.id === id)) notFound();
  return <><Navbar /><main><MessageCenter selectedId={id} /></main><Footer /></>;
}
