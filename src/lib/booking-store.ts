// src/lib/booking-store.ts
import { create } from "zustand"

interface Booking {
  id: string
  guestName: string
  email: string
  phone?: string
  roomType: string
  checkIn: string
  checkOut: string
  guests: number
  status: string
  total: number
}

interface Room {
  id: string
  status: string
  type: string
  capacity: number
  occupied: number
  price: number
}

interface BookingState {
  bookings: Booking[]
  rooms: Room[]
  addBooking: (booking: Omit<Booking, "id">) => void
  updateBookingStatus: (id: string, status: string) => void
  cancelBooking: (id: string) => void
  updateRoomStatus: (id: string, status: string) => void
  updateRoomOccupancy: (id: string, occupied: number) => void
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  rooms: [
    { id: "101", status: "available", type: "Single", capacity: 1, occupied: 0, price: 100 },
    { id: "102", status: "occupied", type: "Double", capacity: 2, occupied: 2, price: 200 },
    { id: "103", status: "maintenance", type: "Suite", capacity: 4, occupied: 0, price: 400 },
  ],

  addBooking: (booking) =>
    set((state) => ({
      bookings: [
        ...state.bookings,
        {
          ...booking,
          id: (state.bookings.length + 1).toString(), // auto-generate ID
        },
      ],
    })),

  updateBookingStatus: (id, status) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status } : b
      ),
    })),

  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status: "cancelled" } : b
      ),
    })),

  updateRoomStatus: (id, status) =>
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === id ? { ...r, status } : r
      ),
    })),

  updateRoomOccupancy: (id, occupied) =>
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === id ? { ...r, occupied } : r
      ),
    })),
}))
