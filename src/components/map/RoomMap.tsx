"use client";

import { useEffect } from "react";
import Link from "next/link";
import { divIcon, latLngBounds } from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import type { MapRoom } from "@/data/mapRooms";
import { formatPrice } from "@/lib/formatPrice";

interface RoomMapProps {
  rooms: MapRoom[];
  selectedRoomId: number | null;
  onSelectRoom: (id: number) => void;
}

function MapFocus({
  room,
  rooms,
}: {
  room: MapRoom | undefined;
  rooms: MapRoom[];
}) {
  const map = useMap();

  useEffect(() => {
    map.stop();

    if (room) {
      map.flyTo([room.latitude, room.longitude], Math.max(map.getZoom(), 14), {
        duration: 0.8,
      });
      return;
    }

    if (rooms.length > 0) {
      const bounds = latLngBounds(rooms.map((item) => [item.latitude, item.longitude]));
      map.fitBounds(bounds, { padding: [55, 35], maxZoom: 14, animate: false });
    } else {
      map.setView([41.03, 29.015], 12, { animate: false });
    }
  }, [map, room, rooms]);

  return null;
}

function createPriceIcon(
  price: number,
  selected: boolean
) {
  return divIcon({
    className: "",
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100px;
        height: 36px;
        border-radius: 24px;
        background: ${selected ? "#151515" : "#C7FF35"};
        color: ${selected ? "#FFFFFF" : "#151515"};
        border: 2px solid #151515;
        font-size: 14px;
        font-weight: 800;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,0.18);
      ">
        ${formatPrice(price)}
      </div>
    `,
    iconSize: [100, 36],
    iconAnchor: [50, 18],
    popupAnchor: [0, -20],
  });
}

export default function RoomMap({
  rooms,
  selectedRoomId,
  onSelectRoom,
}: RoomMapProps) {
  const selectedRoom = rooms.find(
    (room) => room.id === selectedRoomId
  );

  return (
    <MapContainer
      center={[41.0300, 29.0150]}
      zoom={12}
      scrollWheelZoom={false}
      className="z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      <MapFocus room={selectedRoom} rooms={rooms} />

      {rooms.map((room) => (
        <Marker
          key={room.id}
          position={[room.latitude, room.longitude]}
          icon={createPriceIcon(
            room.price,
            selectedRoomId === room.id
          )}
          title={`${room.title} - ${formatPrice(room.price)}`}
          eventHandlers={{
            click: () => onSelectRoom(room.id),
          }}
        >
          <Popup>
            <div className="min-w-[180px] py-2">
              <p className="text-xs text-muted">
                SAMPLE LISTING
              </p>

              <h3 className="text-lg font-bold">
                {room.title}
              </h3>

              <p className="text-sm text-muted">
                {room.location} · {room.size} m²
              </p>

              <p className="text-xl font-black">
                {formatPrice(room.price)} / month
              </p>

              <Link
                href={`/rooms/${room.id}`}
                className="block bg-accent px-4 py-3 text-center font-bold"
                style={{ color: "#151515" }}
              >
                View room ↗
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
