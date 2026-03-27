import { addDays, format } from "date-fns";
import { getPriceValue } from "./price";

export function buildCartItemFromRoom(room, options = {}) {
  const duration = Number(options.duration || 1);
  const checkInDate = options.checkIn ? new Date(options.checkIn) : addDays(new Date(), 1);
  const checkOutDate = options.checkOut
    ? new Date(options.checkOut)
    : addDays(checkInDate, Math.max(1, duration));

  return {
    ...room,
    roomId: room?._id,
    hotelId: typeof room?.hotelId === "object" ? room.hotelId?._id : room?.hotelId,
    duration: Math.max(1, duration),
    checkIn: format(checkInDate, "yyyy-MM-dd"),
    checkOut: format(checkOutDate, "yyyy-MM-dd"),
    price: room?.price || {
      roomPrice: getPriceValue(room),
    },
  };
}

export function buildPendingCartIntent(room, options = {}) {
  return {
    roomId: room?._id,
    hotelId: typeof room?.hotelId === "object" ? room.hotelId?._id : room?.hotelId,
    roomName: room?.name || room?.roomTypeName || room?.type || "Room",
    duration: Number(options.duration || 1),
    checkIn: options.checkIn || null,
    checkOut: options.checkOut || null,
    redirectToCart: true,
  };
}
