"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { useFavorites } from "@/lib/useFavorites";

interface FavoriteButtonProps {
  roomId: number;
  className?: string;
}

export default function FavoriteButton({ roomId, className = "" }: FavoriteButtonProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [error, setError] = useState(false);
  const isSaved = favoriteIds.includes(roomId);

  return (
    <div className={className}>
      <button
        type="button"
        aria-pressed={isSaved}
        onClick={() => {
          const success = toggleFavorite(roomId);
          setError(!success);
          if (!success) {
            toast.error("Could not update favorites", "Check your browser storage settings.");
          } else if (isSaved) {
            toast.info("Removed from favorites", "Room removed from your shortlist.");
          } else {
            toast.success("Saved to favorites", "Room added to your shortlist.");
          }
        }}
        className={`inline-flex w-full items-center justify-center gap-2 border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
          isSaved ? "border-foreground bg-accent text-foreground" : "border-border bg-white text-foreground hover:border-foreground"
        }`}
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
        {isSaved ? "Saved to favorites" : "Save to favorites"}
      </button>
      {error && <p role="alert" className="mt-2 text-xs text-red-700">Favorites could not be saved. Check your browser storage settings.</p>}
    </div>
  );
}
