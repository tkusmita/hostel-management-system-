"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, ArrowLeft, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useBookingStore } from "@/lib/booking-store"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const preselectedRoom = searchParams.get("room")
  const { addBooking } = useBookingStore()

  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [roomType, setRoomType] = useState(preselectedRoom || "")
  const [guests, setGuests] = useState("1")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const roomPrices = {
    dorm: 1000,
    private: 2000,
    ensuite: 4000,
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !roomType) return 0
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    const pricePerNight = roomPrices[roomType as keyof typeof roomPrices] || 0
    return nights * pricePerNight
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkIn || !checkOut || !roomType) return

    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add booking to store
    addBooking({
      guestName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      roomType: roomType === "dorm" ? "Shared Dorm" : roomType === "private" ? "Private Room" : "Ensuite Room",
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
      guests: Number.parseInt(guests),
      status: "pending",
      total: calculateTotal(),
      specialRequests: formData.specialRequests,
    })

    setIsSubmitting(false)
    setIsSuccess(true)

    // Redirect to confirmation after 3 seconds
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
            <CardDescription>Your reservation has been successfully submitted</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                You will receive a confirmation email shortly with your booking details and payment instructions.
              </AlertDescription>
            </Alert>
            <p className="text-sm text-muted-foreground">Redirecting to homepage in a few seconds...</p>
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">HostelHub</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Book Your Stay</h1>
            <p className="text-muted-foreground">Fill out the form below to reserve your room at HostelHub</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Please provide your information and stay preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid md:grid-cols-3 gap-5">
                        <div>
                            
                          <Label htmlFor="firstName display:block margin-bottom:6px ">First Name</Label>
                          <Input
                            id="firstName padding:8px"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stay Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Stay Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Check-in Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full padding-10 justify-start text-left font-normal bg-transparent"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkIn ? format(checkIn, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={checkIn}
                                onSelect={setCheckIn}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label>Check-out Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-transparent"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkOut ? format(checkOut, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={checkOut}
                                onSelect={setCheckOut}
                                disabled={(date) => date < (checkIn || new Date())}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="roomType">Room Type</Label>
                          <Select value={roomType} onValueChange={setRoomType} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dorm">Shared Dorm - rs1000/night</SelectItem>
                              <SelectItem value="private">Private Room - rs3000/night</SelectItem>
                              <SelectItem value="ensuite">Ensuite Room - rs4000/night</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="guests">Number of Guests</Label>
                          <Select value={guests} onValueChange={setGuests}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Guest</SelectItem>
                              <SelectItem value="2">2 Guests</SelectItem>
                              <SelectItem value="3">3 Guests</SelectItem>
                              <SelectItem value="4">4 Guests</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any special requests or requirements..."
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Processing Booking..." : "Complete Booking"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {checkIn && checkOut && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Check-in:</span>
                        <span>{format(checkIn, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Check-out:</span>
                        <span>{format(checkOut, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nights:</span>
                        <span>{Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}</span>
                      </div>
                    </div>
                  )}

                  {roomType && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Room Type:</span>
                        <span className="capitalize">{roomType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Price per night:</span>
                        <span>rs{roomPrices[roomType as keyof typeof roomPrices]}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Guests:</span>
                    <span>{guests}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>rs{calculateTotal()}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">* Final price includes all taxes and fees</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
