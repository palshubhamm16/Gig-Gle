import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, Heart, Shield, Sparkles, MessageSquare, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "About Gig-gle | Inclusive Job Platform",
  description: "Learn about our mission to create an inclusive job platform for youth with disabilities",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Mission</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Gig-gle is dedicated to bridging the opportunity gap by enabling young individuals with disabilities
                  to find meaningful work, build experience, and showcase their talents in a safe and accessible
                  environment.
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
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Diverse group of young people working together"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="The founding team of Gig-gle"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Gig-gle was founded in 2024 by a team of advocates, technologists, and educators who recognized the
                significant employment gap facing youth with disabilities.
              </p>
              <p>
                Despite their talents and capabilities, young people with disabilities face unemployment rates
                significantly higher than their peers without disabilities. We believe that everyone deserves the
                opportunity to showcase their skills, gain work experience, and earn income independently.
              </p>
              <p>
                Our platform was built from the ground up with accessibility and inclusivity as core principles, not
                afterthoughts. We've worked closely with disability advocates and young people with diverse abilities to
                create a platform that truly meets their needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Our Values</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              The principles that guide everything we do at Gig-gle
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Inclusivity</h3>
                  <p className="text-muted-foreground">
                    We believe in creating opportunities for everyone, regardless of ability, background, or
                    circumstance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Empowerment</h3>
                  <p className="text-muted-foreground">
                    We strive to empower young people with disabilities to achieve economic independence and career
                    growth.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Compassion</h3>
                  <p className="text-muted-foreground">
                    We approach our work with empathy, understanding, and a genuine desire to make a positive
                    difference.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Safety</h3>
                  <p className="text-muted-foreground">
                    We prioritize creating a safe, respectful environment where everyone feels valued and protected.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously seek new ways to improve accessibility and create better opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Community</h3>
                  <p className="text-muted-foreground">
                    We foster a supportive community where connections lead to opportunities and growth.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">How We're Different</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Gig-gle is designed specifically for youth with disabilities, with features that set us apart
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Built for Accessibility</h3>
              <p className="text-muted-foreground">
                Our platform is designed from the ground up with accessibility in mind, following WCAG guidelines and
                incorporating features like screen reader compatibility, keyboard navigation, and customizable text
                options.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Inclusive Gig Matching</h3>
              <p className="text-muted-foreground">
                Our platform helps match young people with opportunities that align with their skills, interests, and
                accommodation needs, making it easier to find the right fit.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Accommodation-Focused</h3>
              <p className="text-muted-foreground">
                We make it easy for employers to specify available accommodations and for job seekers to request what
                they need, facilitating open communication from the start.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Trust & Safety Framework</h3>
              <p className="text-muted-foreground">
                We've implemented robust verification processes and community guidelines to ensure a safe, respectful
                environment for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="container px-4 md:px-6">
        <div className="rounded-lg bg-muted p-6 md:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6 max-w-[600px]">
            Whether you're looking for work or looking to hire, Gig-gle is the platform where inclusive opportunities
            happen.
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
