
"use client";

interface SearchBarProps {
  location: string;
  budget: string;
  setLocation: (value: string) => void;
  setBudget: (value: string) => void;
}

export default function SearchBar({
  location,
  budget,
  setLocation,
  setBudget,
}: SearchBarProps) {
  return (
    <div className="grid gap-4 border border-border bg-white p-5 md:grid-cols-2">

      <div>
        <label
          htmlFor="location"
          className="mb-2 block text-xs font-semibold uppercase text-muted"
        >
          Location
        </label>

        <input
          id="location"
          type="text"
          placeholder="City or neighbourhood"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-border p-4 outline-none focus:border-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="budget"
          className="mb-2 block text-xs font-semibold uppercase text-muted"
        >
          Monthly budget (€)
        </label>

        <input
          id="budget"
          type="number"
          min="0"
          placeholder="Maximum budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full border border-border p-4 outline-none focus:border-foreground"
        />
      </div>

    </div>
  );
}
