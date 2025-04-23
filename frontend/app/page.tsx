import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, MapPin, Clock, Filter, Search, ArrowRight, Users, CheckCircle, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FeaturedGigs } from "@/components/featured-gigs"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - New diagonal layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
        <div className="absolute h-full w-full bg-[radial-gradient(circle_500px_at_70%_20%,rgba(255,255,255,0.1),transparent)]"></div>

        <div className="container relative px-4 py-20 md:py-32 lg:py-40">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col space-y-6 max-w-xl">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur-sm w-fit">
                <span className="mr-2 rounded-full bg-blue-500 px-1.5 py-0.5 text-xs font-medium">New</span>
                <span>Inclusive opportunities for everyone</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                Find Your Perfect Gig, <span className="text-blue-200">Inclusively</span>
              </h1>

              <p className="text-lg text-blue-100 md:text-xl">
                Gig-gle connects youth with disabilities to meaningful part-time jobs, freelance gigs, and internships
                that value your unique talents.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/gigs">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50">
                    Find Gigs
                  </Button>
                </Link>
                <Link href="/post-gig">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 text-black hover:bg-white/10"
                  >
                    Post a Gig
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-blue-400/20 blur-xl"></div>
              <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-blue-300/20 blur-xl"></div>

              <div className="relative rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 shadow-xl">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                      <Briefcase className="h-6 w-6 text-blue-200" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Web Design Assistant</h3>
                      <p className="text-sm text-blue-100">Remote • Part-time</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                      <Briefcase className="h-6 w-6 text-blue-200" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Social Media Intern</h3>
                      <p className="text-sm text-blue-100">Hybrid • Internship</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                      <Briefcase className="h-6 w-6 text-blue-200" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Data Entry Specialist</h3>
                      <p className="text-sm text-blue-100">Remote • Freelance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section - New */}
      <section className="border-y bg-blue-50 dark:bg-blue-950/20">
        <div className="container px-4 py-10 md:py-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</span>
              <span className="text-sm text-muted-foreground">Active Gigs</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,200+</span>
              <span className="text-sm text-muted-foreground">Registered Users</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">85%</span>
              <span className="text-sm text-muted-foreground">Placement Rate</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</span>
              <span className="text-sm text-muted-foreground">Support</span>
            </div>
          </div>
        </div>
      </section>

 

      {/* Featured Gigs - Updated with new styling */}
      <section className="container px-4 md:px-6 py-10">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">Featured Gigs</h2>
              <p className="text-muted-foreground">Discover the latest opportunities in your area</p>
            </div>
            <Link href="/gigs" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <FeaturedGigs />
      </section>

      {/* Categories - Redesigned with cards */}
      <section className="bg-blue-50 dark:bg-blue-950/20 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">Browse by Category</h2>
            <p className="text-muted-foreground mx-auto max-w-[700px]">
              Find gigs that match your skills and interests
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Technology", count: 24, icon: <Briefcase className="h-5 w-5" /> },
              { name: "Creative Arts", count: 18, icon: <Star className="h-5 w-5" /> },
              { name: "Customer Service", count: 15, icon: <Users className="h-5 w-5" /> },
              { name: "Education", count: 12, icon: <CheckCircle className="h-5 w-5" /> },
              { name: "Administrative", count: 10, icon: <Briefcase className="h-5 w-5" /> },
              { name: "Marketing", count: 8, icon: <Star className="h-5 w-5" /> },
              { name: "Data Entry", count: 7, icon: <Users className="h-5 w-5" /> },
              { name: "Writing", count: 6, icon: <CheckCircle className="h-5 w-5" /> },
            ].map((category) => (
              <Link key={category.name} href={`/gigs?category=${category.name}`} className="group">
                <Card className="h-full transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-3 rounded-full bg-blue-100 dark:bg-blue-900/50 p-3 text-blue-600 dark:text-blue-400">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground"></p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Updated with timeline style */}
      <section className="container px-4 md:px-6 py-16">
        <div className="flex flex-col gap-2 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">How Gig-gle Works</h2>
          <p className="text-muted-foreground mx-auto max-w-[700px]">
            Our platform is designed to be accessible and easy to use for everyone
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-blue-200 dark:bg-blue-800"></div>

          <div className="space-y-16 relative">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative">
              <div className="md:text-right flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2">Find Opportunities</h3>
                <p className="text-muted-foreground">
                  Browse through our curated list of inclusive gigs and filter by your preferences.
                </p>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="font-bold">1</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                  <Search className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative">
              <div className="md:order-2 flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2">Apply with Ease</h3>
                <p className="text-muted-foreground">
                  Our accessible application process is designed to highlight your unique skills and abilities.
                </p>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="font-bold">2</span>
                </div>
              </div>

              <div className="md:order-1 flex items-center justify-center">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                  <Briefcase className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative">
              <div className="md:text-right flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2">Start Working</h3>
                <p className="text-muted-foreground">
                  Connect with employers who value diversity and inclusion in their workforce.
                </p>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="font-bold">3</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                  <Clock className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - New section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Success Stories</h2>
            <p className="text-blue-100 mt-2 max-w-[700px] mx-auto">
              Hear from users who found meaningful opportunities through Gig-gle
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "Gig-gle helped me find a remote web design position that accommodates my schedule for medical appointments. I'm now building my portfolio while earning income.",
                name: "Alex J.",
                role: "Web Designer",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "As someone with ADHD, finding the right work environment was challenging. Through Gig-gle, I connected with an employer who values my creative thinking.",
                name: "Taylor W.",
                role: "Content Creator",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "The accessibility features on Gig-gle made the job search process so much easier. I found a part-time position that perfectly matches my skills and needs.",
                name: "Jordan M.",
                role: "Data Entry Specialist",
                avatar: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex-1">
                    <p className="italic text-blue-100">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-blue-200">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4 md:px-6 py-16">
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 flex flex-col items-center text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-[600px]">
            Join our community of talented individuals and inclusive employers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/gigs">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50">
                Find Gigs
              </Button>
            </Link>
            <Link href="/post-gig">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-black hover:bg-white/10"
              >
                Post a Gig
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
