import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wifi, Coffee, Car, Users, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
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
              <span className="text-xl font-bold text-foreground">HostelHub</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#rooms" className="text-muted-foreground hover:text-foreground transition-colors">
                Rooms
              </Link>
              <Link href="#amenities" className="text-muted-foreground hover:text-foreground transition-colors">
                Amenities
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Button asChild>
                <Link href="/book">Book Now</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Your Home Away From Home
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Experience comfort, community, and convenience at HostelHub. Modern accommodations with all the amenities
              you need for an unforgettable stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/book">Book Your Stay</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#rooms">View Rooms</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Free WiFi</h3>
              <p className="text-sm text-muted-foreground">High-speed internet throughout</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Common Kitchen</h3>
              <p className="text-sm text-muted-foreground">Fully equipped shared kitchen</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Car className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Free Parking</h3>
              <p className="text-sm text-muted-foreground">Secure parking available</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">Meet fellow travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section id="rooms" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Room</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From budget-friendly dorms to private rooms, we have options for every traveler
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Shared Dorm</CardTitle>
                  <Badge variant="secondary">4-6 beds</Badge>
                </div>
                <CardDescription>Perfect for budget travelers and meeting new people</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">$25</span>
                  <span className="text-muted-foreground">per night</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Shared bathroom</li>
                  <li>• Lockers included</li>
                  <li>• Common area access</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/book?room=dorm">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Private Room</CardTitle>
                  <Badge variant="secondary">1-2 guests</Badge>
                </div>
                <CardDescription>Your own space with shared facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">$55</span>
                  <span className="text-muted-foreground">per night</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Private room</li>
                  <li>• Shared bathroom</li>
                  <li>• Desk & storage</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/book?room=private">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ensuite Room</CardTitle>
                  <Badge variant="secondary">1-2 guests</Badge>
                </div>
                <CardDescription>Premium comfort with private bathroom</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">$85</span>
                  <span className="text-muted-foreground">per night</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Private bathroom</li>
                  <li>• Premium bedding</li>
                  <li>• Mini fridge</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/book?room=ensuite">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Guests Say</h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-muted-foreground">4.8 out of 5 stars</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Amazing hostel with great facilities. The staff was incredibly helpful and the location is perfect!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">JS</span>
                  </div>
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-sm text-muted-foreground">Backpacker</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Clean, comfortable, and great value for money. Met some wonderful people here!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Maria Johnson</p>
                    <p className="text-sm text-muted-foreground">Solo Traveler</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Perfect for digital nomads. Fast WiFi, quiet spaces to work, and a great community."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-purple-600">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Alex Lee</p>
                    <p className="text-sm text-muted-foreground">Digital Nomad</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-bold">HostelHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your home away from home. Experience comfort, community, and convenience.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/book" className="hover:text-foreground transition-colors">
                    Book Now
                  </Link>
                </li>
                <li>
                  <Link href="#rooms" className="hover:text-foreground transition-colors">
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link href="#amenities" className="hover:text-foreground transition-colors">
                    Amenities
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-foreground transition-colors">
                    Staff Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  123 Hostel Street, City
                </li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Email: info@hostelhub.com</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <p className="text-sm text-muted-foreground">Stay connected for updates and special offers.</p>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HostelHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
