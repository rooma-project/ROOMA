import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/data/rooms";
import FavoriteButton from "@/components/rooms/FavoriteButton";
import { formatPrice } from "@/lib/formatPrice";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group min-w-0 overflow-hidden border border-border bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <Image
          src={room.image}
          alt={room.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-accent px-3 py-2 text-xs font-bold">
          SAMPLE LISTING
        </span>
      </div>
      <div className="p-6">
        <p className="mb-2 text-xs uppercase tracking-wide text-muted">
          {room.location}
        </p>
        <h3 className="text-xl font-bold tracking-tight">
          <Link href={`/rooms/${room.id}`} className="hover:underline">
            {room.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm text-muted">
          {room.size} m² · {room.furnished ? "Furnished" : "Unfurnished"}
        </p>
        <div className="mt-6 border-t border-border pt-5">
          <p className="flex flex-wrap items-baseline gap-x-1">
            <span className="text-3xl font-black tracking-tight">
              {formatPrice(room.price)}
            </span>
            <span className="text-xs text-muted">/ month</span>
          </p>
          <Link
            href={`/rooms/${room.id}`}
            className="mt-5 block w-full bg-accent px-4 py-3 text-center text-sm font-bold transition-colors hover:bg-foreground hover:text-white"
          >
            View room ↗
          </Link>
          <FavoriteButton roomId={room.id} className="mt-3" />
        </div>
      </div>
    </article>
  );
}
