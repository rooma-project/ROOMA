"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import type { Room } from "@/data/rooms";

interface PhotoPreview {
  name: string;
  url: string;
}

const inputClass =
  "w-full border border-border bg-background px-4 py-3 outline-none focus:border-foreground";

const labelClass =
  "mb-2 block text-sm font-semibold";

interface CreateRoomFormProps {
  initialRoom?: Room;
}

export default function CreateRoomForm({
  initialRoom,
}: CreateRoomFormProps) {
  const isEdit = Boolean(initialRoom);

  const [photos, setPhotos] = useState<PhotoPreview[]>(
    initialRoom
      ? [{ name: initialRoom.title, url: initialRoom.image }]
      : []
  );
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [rent, setRent] = useState(
    initialRoom ? String(initialRoom.price) : ""
  );
  const [utilities, setUtilities] = useState(
    initialRoom ? String(initialRoom.utilities) : ""
  );

  const photoUrls = useRef<string[]>([]);

  const monthlyTotal =
    Number(rent || 0) + Number(utilities || 0);

  useEffect(() => {
    return () => {
      photoUrls.current.forEach((url) =>
        URL.revokeObjectURL(url)
      );
    };
  }, []);

  function handlePhotos(
    e: ChangeEvent<HTMLInputElement>
  ) {
    setError("");
    setMessage("");

    const files = Array.from(e.target.files || []);

    e.target.value = "";

    if (files.length === 0) return;

    if (photos.length + files.length > 5) {
      setError("You can upload a maximum of 5 photos.");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const invalidFile = files.some(
      (file) =>
        !allowedTypes.includes(file.type) ||
        file.size > 5 * 1024 * 1024
    );

    if (invalidFile) {
      setError(
        "Please select JPG, PNG or WEBP images under 5 MB."
      );
      return;
    }

    const newPhotos = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    photoUrls.current.push(
      ...newPhotos.map((photo) => photo.url)
    );

    setPhotos((previous) => [
      ...previous,
      ...newPhotos,
    ]);
  }

  function removePhoto(url: string) {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }

    photoUrls.current = photoUrls.current.filter(
      (item) => item !== url
    );

    setPhotos((previous) =>
      previous.filter((photo) => photo.url !== url)
    );

    setError("");
    setMessage("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const startDate = String(
      formData.get("startDate") || ""
    );

    const endDate = String(
      formData.get("endDate") || ""
    );

    if (startDate && endDate && endDate < startDate) {
      setError("End date cannot be before start date.");
      return;
    }

    if (photos.length === 0) {
      setError("Please add at least one room photo.");
      return;
    }

    setMessage(
      isEdit
        ? "Listing changes validated. Changes are not saved to the database yet."
        : "Listing validation successful. Your listing has not been saved to the database yet."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="space-y-8"
    >
      {/* 01 — Property information */}

      <section className="border border-border bg-white p-6 md:p-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
          01 / Property information
        </p>

        <h2 className="mb-8 text-3xl font-black tracking-tight">
          Tell us about your space.
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="title" className={labelClass}>
              Listing title
            </label>

            <input
              id="title"
              name="title"
              defaultValue={initialRoom?.title ?? ""}
              placeholder="Modern student room"
              maxLength={100}
              required
              className={inputClass}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>

              <input
                id="city"
                name="city"
                placeholder="Enter city"
                required
                className={inputClass}
                defaultValue="Istanbul"
              />
            </div>

            <div>
              <label
                htmlFor="neighbourhood"
                className={labelClass}
              >
                Neighbourhood
              </label>

              <input
                id="neighbourhood"
                name="neighbourhood"
                defaultValue={initialRoom?.location ?? ""}
                placeholder="Enter neighbourhood"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className={labelClass}
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              defaultValue={initialRoom?.description ?? ""}
              rows={5}
              minLength={20}
              maxLength={2000}
              placeholder="Describe the room and its features..."
              required
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* 02 — Pricing */}

      <section className="border border-border bg-white p-6 md:p-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
          02 / Pricing and details
        </p>

        <h2 className="mb-8 text-3xl font-black tracking-tight">
          Set your price.
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="rent" className={labelClass}>
              Monthly rent (₺)
            </label>

            <input
              id="rent"
              name="rent"
              type="number"
              min="1"
              step="0.01"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="utilities"
              className={labelClass}
            >
              Monthly utilities (₺)
            </label>

            <input
              id="utilities"
              name="utilities"
              type="number"
              min="0"
              step="0.01"
              value={utilities}
              onChange={(e) =>
                setUtilities(e.target.value)
              }
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="deposit" className={labelClass}>
              Deposit (₺)
            </label>

            <input
              id="deposit"
              name="deposit"
              defaultValue={initialRoom?.deposit ?? ""}
              type="number"
              min="0"
              step="0.01"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="size" className={labelClass}>
              Room size (m²)
            </label>

            <input
              id="size"
              name="size"
              defaultValue={initialRoom?.size ?? ""}
              type="number"
              min="1"
              step="0.1"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="furnished"
              className={labelClass}
            >
              Furnishing
            </label>

            <select
              id="furnished"
              name="furnished"
              defaultValue={initialRoom ? (initialRoom.furnished ? "yes" : "no") : "yes"}
              className={inputClass}
            >
              <option value="yes">Furnished</option>
              <option value="no">Unfurnished</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="roomType"
              className={labelClass}
            >
              Room type
            </label>

            <select
              id="roomType"
              name="roomType"
              defaultValue={isEdit ? "" : "private"}
              required
              className={inputClass}
            >
              <option value="" disabled>Select room type</option>
              <option value="private">Private room</option>
              <option value="shared">Shared room</option>
              <option value="studio">Studio</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-accent p-6">
          <span className="font-semibold">
            Estimated monthly total
          </span>

          <span className="text-4xl font-black tracking-tight">
            ₺{monthlyTotal.toFixed(2)}
          </span>
        </div>

        <p className="mt-3 text-xs text-muted">
          Monthly rent and utilities. Deposit is excluded.
        </p>
      </section>

      {/* 03 — Availability */}

      <section className="border border-border bg-white p-6 md:p-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
          03 / Availability
        </p>

        <h2 className="mb-8 text-3xl font-black tracking-tight">
          When is it available?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className={labelClass}
            >
              Available from
            </label>

            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className={labelClass}
            >
              Available until (optional)
            </label>

            <input
              id="endDate"
              name="endDate"
              type="date"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* 04 — Photos */}

      <section className="border border-border bg-white p-6 md:p-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
          04 / Room photos
        </p>

        <h2 className="mb-8 text-3xl font-black tracking-tight">
          Show your space.
        </h2>

        <label
          htmlFor="photos"
          className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-background px-6 py-12 text-center transition-colors hover:border-foreground"
        >
          <span className="mb-4 text-5xl font-light">
            +
          </span>

          <span className="font-bold">
            Choose room photos
          </span>

          <span className="mt-3 text-xs text-muted">
            JPG, PNG or WEBP. Maximum 5 photos,
            5 MB per photo.
          </span>
        </label>

        <input
          id="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handlePhotos}
          className="sr-only"
        />

        <p className="mt-4 text-sm text-muted">
          {photos.length}/5 photos selected
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {photos.map((photo, index) => (
            <div
              key={photo.url}
              className="relative aspect-[4/3] overflow-hidden border border-border"
            >
              <Image
                src={photo.url}
                alt={`Room preview: ${photo.name}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />

              {index === 0 && (
                <span className="absolute left-2 top-2 bg-accent px-3 py-2 text-xs font-semibold">
                  COVER
                </span>
              )}

              <button
                type="button"
                aria-label={`Remove ${photo.name}`}
                onClick={() => removePhoto(photo.url)}
                className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center bg-foreground text-xl text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {error && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 p-5 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {message && (
        <p
          role="status"
          className="border border-border bg-white p-5 text-sm"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-accent px-8 py-5 text-lg font-bold transition-colors hover:bg-foreground hover:text-white"
      >
        {isEdit ? "Save changes ↗" : "Create listing ↗"}
      </button>

      <p className="text-center text-xs text-muted">
        Demo mode — listings and photos are not stored yet.
      </p>
    </form>
  );
}
