
import { rooms, type Room } from "@/data/rooms";

export interface MapRoom extends Room {
  latitude: number;
  longitude: number;
}

const coordinates: Record<number, [number, number]> = {
  1: [40.9905, 29.0303], // Kadıköy
  2: [41.0438, 29.0075], // Beşiktaş
  3: [41.0602, 28.9877], // Şişli
};

export const mapRooms: MapRoom[] = rooms.flatMap(
  (room) => {
    const position = coordinates[room.id];

    if (!position) return [];

    return [
      {
        ...room,
        latitude: position[0],
        longitude: position[1],
      },
    ];
  }
);
