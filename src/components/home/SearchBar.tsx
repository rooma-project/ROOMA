
"use client";

export interface RoomFilters {
  location: string;
  minPrice: string;
  maxPrice: string;
  minSize: string;
  furnished: string;
  sort: string;
}

interface SearchBarProps {
  filters: RoomFilters;
  onChange: (filters: RoomFilters) => void;
  onReset: () => void;
}

export default function SearchBar({
  filters,
  onChange,
  onReset,
}: SearchBarProps) {
  const inputClass =
    "w-full border border-border bg-background px-4 py-3 outline-none focus:border-foreground";

  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-wider text-muted";

  function updateFilter(
    key: keyof RoomFilters,
    value: string
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  return (
    <div className="border border-border bg-white p-5 md:p-8">

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-black tracking-tight">
          Search filters
        </h3>

        <button
          type="button"
          onClick={onReset}
          className="text-sm text-muted underline hover:text-foreground"
        >
          Clear filters
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <div>
          <label htmlFor="location" className={labelClass}>
            Location
          </label>

          <input
            id="location"
            type="text"
            placeholder="City or neighbourhood"
            value={filters.location}
            onChange={(e) =>
              updateFilter("location", e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="minPrice" className={labelClass}>
            Minimum rent (€)
          </label>

          <input
            id="minPrice"
            type="number"
            min="0"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) =>
              updateFilter("minPrice", e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className={labelClass}>
            Maximum rent (€)
          </label>

          <input
            id="maxPrice"
            type="number"
            min="0"
            placeholder="No limit"
            value={filters.maxPrice}
            onChange={(e) =>
              updateFilter("maxPrice", e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="minSize" className={labelClass}>
            Minimum size (m²)
          </label>

          <input
            id="minSize"
            type="number"
            min="0"
            placeholder="Any size"
            value={filters.minSize}
            onChange={(e) =>
              updateFilter("minSize", e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="furnished" className={labelClass}>
            Furnishing
          </label>

          <select
            id="furnished"
            value={filters.furnished}
            onChange={(e) =>
              updateFilter("furnished", e.target.value)
            }
            className={inputClass}
          >
            <option value="all">All rooms</option>
            <option value="yes">Furnished</option>
            <option value="no">Unfurnished</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort" className={labelClass}>
            Sort by
          </label>

          <select
            id="sort"
            value={filters.sort}
            onChange={(e) =>
              updateFilter("sort", e.target.value)
            }
            className={inputClass}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="size-desc">Largest rooms first</option>
            <option value="size-asc">Smallest rooms first</option>
          </select>
        </div>

      </div>
    </div>
  );
}
