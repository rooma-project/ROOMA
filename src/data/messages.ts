import { roommates } from "@/data/roommates";
import { rooms } from "@/data/rooms";

export interface Conversation {
  id: string;
  name: string;
  subtitle: string;
}

export interface DemoMessage {
  id: string;
  sender: "me" | "other";
  text: string;
  sentAt: string;
  read: boolean;
}

export type MessageStore = Record<string, DemoMessage[]>;

export const conversations: Conversation[] = [
  ...roommates.map((person) => ({
    id: `roommate-${person.id}`,
    name: person.name,
    subtitle: person.university,
  })),
  ...rooms.map((room) => ({
    id: `room-${room.id}`,
    name: `Landlord · ${room.location.split(",")[0]}`,
    subtitle: room.title,
  })),
];

// Fictional messages for demonstrating the interface; no real recipients.
export const initialMessages: MessageStore = {
  "roommate-1": [
    { id: "demo-1", sender: "other", text: "Hi! Are you also looking for a shared apartment in Kadıköy?", sentAt: "2026-11-27T15:00:00+03:00", read: true },
    { id: "demo-2", sender: "me", text: "Hi! Yes, I'm exploring rooms near the university.", sentAt: "2026-11-27T15:05:00+03:00", read: true },
    { id: "demo-3", sender: "other", text: "Great! We could compare our preferences.", sentAt: "2026-11-27T15:10:00+03:00", read: false },
  ],
  "room-2": [
    { id: "demo-4", sender: "other", text: "Hello! Let me know if you have any questions about the room.", sentAt: "2026-11-27T16:00:00+03:00", read: false },
  ],
};
