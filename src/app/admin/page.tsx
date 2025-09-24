"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Bed,
  Calendar,
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  LogOut,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AuthGuard } from "@/components/auth-guard"
import { useRouter } from "next/navigation"
import { useBookingStore } from "@/lib/booking-store"

// ---------- Types ----------
interface Booking {
  id: string
  guestName: string
  email: string
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

// ---------- Dashboard ----------
function AdminDashboardContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  const { bookings, rooms, updateBookingStatus, cancelBooking, updateRoomStatus, updateRoomOccupancy } =
    useBookingStore()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const handleBookingAction = (bookingId: string, action: string) => {
    switch (action) {
      case "check-in":
        updateBookingStatus(bookingId, "checked-in")
        break
      case "cancel":
        updateBookingStatus(bookingId, "cancelled")
        break
      case "confirm":
        updateBookingStatus(bookingId, "confirmed")
        break
      default:
        break
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "checked-in":
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>
      case "checked-out":
        return <Badge className="bg-gray-100 text-gray-800">Checked Out</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoomStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case "occupied":
        return <Badge className="bg-blue-100 text-blue-800">Occupied</Badge>
      case "full":
        return <Badge className="bg-red-100 text-red-800">Full</Badge>
      case "maintenance":
        return <Badge className="bg-orange-100 text-orange-800">Maintenance</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredBookings = bookings.filter((booking: Booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalBookings: bookings.length,
    occupancyRate: Math.round(
      (rooms.reduce((acc, room) => acc + room.occupied, 0) / rooms.reduce((acc, room) => acc + room.capacity, 0)) * 100,
    ),
    activeGuests: bookings.filter((b) => b.status === "checked-in").reduce((acc, b) => acc + b.guests, 0),
    revenue: bookings.filter((b) => b.status !== "cancelled").reduce((acc, b) => acc + b.total, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">HostelHub Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, Admin</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Body */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">All time bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
              <p className="text-xs text-muted-foreground">Current occupancy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeGuests}</div>
              <p className="text-xs text-muted-foreground">Currently checked in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue}</div>
              <p className="text-xs text-muted-foreground">Total bookings value</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Booking Management</CardTitle>
                    <CardDescription>View and manage all hostel bookings</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Booking
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="checked-out">Checked Out</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room Type</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{booking.guestName}</div>
                              <div className="text-sm text-muted-foreground">{booking.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{booking.roomType}</TableCell>
                          <TableCell>{booking.checkIn}</TableCell>
                          <TableCell>{booking.checkOut}</TableCell>
                          <TableCell>{booking.guests}</TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell>${booking.total}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {booking.status === "pending" && (
                                  <DropdownMenuItem onClick={() => handleBookingAction(booking.id, "confirm")}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Confirm
                                  </DropdownMenuItem>
                                )}
                                {booking.status === "confirmed" && (
                                  <DropdownMenuItem onClick={() => handleBookingAction(booking.id, "check-in")}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Check In
                                  </DropdownMenuItem>
                                )}
                                {booking.status !== "cancelled" && booking.status !== "checked-out" && (
                                  <DropdownMenuItem onClick={() => handleBookingAction(booking.id, "cancel")}>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancel
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Clock className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Room Management</CardTitle>
                    <CardDescription>Monitor room availability and status</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Room
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms.map((room) => (
                    <Card key={room.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Room {room.id}</CardTitle>
                          {getRoomStatusBadge(room.status)}
                        </div>
                        <CardDescription>{room.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Capacity:</span>
                            <span>{room.capacity} guests</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Occupied:</span>
                            <span>
                              {room.occupied}/{room.capacity}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Price:</span>
                            <span>${room.price}/night</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guests Tab */}
          <TabsContent value="guests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guest Management</CardTitle>
                <CardDescription>View and manage guest information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Guest Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Detailed guest profiles and history will be available here
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Guest
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// ---------- Export ----------
export default function AdminDashboard() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminDashboardContent />
    </AuthGuard>
  )
}
