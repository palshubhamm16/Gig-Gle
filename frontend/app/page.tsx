import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, MapPin, Clock, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FeaturedGigs } from "@/components/featured-gigs"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Inclusive Opportunities
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Gig-gle connects youth with disabilities to meaningful part-time jobs, freelance gigs, and
                  internships.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/gigs">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Find Gigs
                  </Button>
                </Link>
                <Link href="/post-gig">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    Post a Gig
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-lg border bg-background p-2">
                  <div className="flex items-center gap-2 border-b p-4">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Search for gigs...</span>
                  </div>
                  <div className="grid gap-2 p-4">
                    <div className="flex items-center gap-4 rounded-lg border p-3">
                      <Briefcase className="h-10 w-10 text-primary" />
                      <div>
                        <h3 className="font-semibold">Web Design Assistant</h3>
                        <p className="text-sm text-muted-foreground">Remote • Part-time</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-3">
                      <Briefcase className="h-10 w-10 text-primary" />
                      <div>
                        <h3 className="font-semibold">Social Media Intern</h3>
                        <p className="text-sm text-muted-foreground">Hybrid • Internship</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-3">
                      <Briefcase className="h-10 w-10 text-primary" />
                      <div>
                        <h3 className="font-semibold">Data Entry Specialist</h3>
                        <p className="text-sm text-muted-foreground">Remote • Freelance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container px-4 md:px-6 py-6">
        <div className="rounded-lg border bg-card p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search for gigs..." className="w-full bg-background pl-8" />
              </div>
            </div>
            <div>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="text" placeholder="Location" className="w-full bg-background pl-8" />
              </div>
            </div>
            <div>
              <Button className="w-full gap-1">
                <Filter className="h-4 w-4" />
                Filter Results
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Featured Gigs</h2>
          <p className="text-muted-foreground">Discover the latest opportunities in your area</p>
        </div>
        <FeaturedGigs />
      </section>

      {/* Categories */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
          <p className="text-muted-foreground">Find gigs that match your skills and interests</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "Technology", count: 24 },
            { name: "Creative Arts", count: 18 },
            { name: "Customer Service", count: 15 },
            { name: "Education", count: 12 },
            { name: "Administrative", count: 10 },
            { name: "Marketing", count: 8 },
            { name: "Data Entry", count: 7 },
            { name: "Writing", count: 6 },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/gigs?category=${category.name}`}
              className="group rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold group-hover:underline">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} gigs available</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col gap-2 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">How Gig-gle Works</h2>
          <p className="text-muted-foreground mx-auto max-w-[700px]">
            Our platform is designed to be accessible and easy to use for everyone
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Find Opportunities</h3>
                <p className="text-muted-foreground">
                  Browse through our curated list of inclusive gigs and filter by your preferences.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Apply with Ease</h3>
                <p className="text-muted-foreground">
                  Our accessible application process is designed to highlight your unique skills and abilities.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Start Working</h3>
                <p className="text-muted-foreground">
                  Connect with employers who value diversity and inclusion in their workforce.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4 md:px-6">
        <div className="rounded-lg bg-muted p-6 md:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-[600px]">
            Join our community of talented individuals and inclusive employers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/gigs">
              <Button size="lg">Find Gigs</Button>
            </Link>
            <Link href="/post-gig">
              <Button size="lg" variant="outline">
                Post a Gig
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
