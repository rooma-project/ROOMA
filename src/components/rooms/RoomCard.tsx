import Link from "next/link";
import Image from "next/image";
import type { Room } from "@/data/rooms";
import FavoriteButton from "@/components/rooms/FavoriteButton";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="group overflow-hidden border border-border bg-white transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <Image
          src={room.image}
          alt={room.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 z-10 bg-accent px-3 py-2 text-xs font-semibold">
          SAMPLE LISTING
        </span>
      </div>

      <div className="p-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
          {room.location}
        </p>

        <h3 className="text-xl font-bold">
          <Link href={`/rooms/${room.id}`} className="hover:underline">
            {room.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm text-muted">
          {room.size} m² · {room.furnished ? "Furnished" : "Unfurnished"}
        </p>

        <div className="mt-6 border-t border-border pt-5">
          <p className="text-3xl font-black tracking-tight">
            ₺{room.price.toLocaleString("tr-TR")}
            <span className="ml-1 text-sm font-normal text-muted">/ month</span>
          </p>
        </div>

        <Link
          href={`/rooms/${room.id}`}
          className="mt-5 block bg-accent px-5 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground hover:text-white"
        >
          View room ↗
        </Link>
        <FavoriteButton roomId={room.id} className="mt-3" />
      </div>
    </article>
  );
}
