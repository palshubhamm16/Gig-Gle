"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, Building } from "lucide-react"

interface Gig {
  _id: string
  title: string
  company: string
  location: string
  type: string
  category: string
  description: string
  createdAt: string
}

export function FeaturedGigs() {
  const [featuredGigs, setFeaturedGigs] = useState<Gig[] | null>(null)

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs/featured`)
        const data = await res.json()
        setFeaturedGigs(data.gigs)
      } catch (error) {
        console.error("Error fetching featured gigs:", error)
        setFeaturedGigs([])
      }
    }

    fetchGigs()
  }, [])

  if (!featuredGigs) {
    return <p>Loading featured gigs...</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {featuredGigs.map((gig) => (
        <Card
          key={gig._id}
          className="flex flex-col h-full transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800"
        >
          <CardContent className="flex-1 pt-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">{gig.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Building className="h-3 w-3" />
                  <span>{gig.company}</span>
                </div>
              </div>
              <Badge
                variant={gig.type === "part-time" ? "default" : gig.type === "internship" ? "secondary" : "outline"}
                className={gig.type === "part-time" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {gig.type}
              </Badge>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="h-3 w-3" />
                <span>{gig.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="h-3 w-3" />
                <span>Posted {new Date(gig.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Briefcase className="h-3 w-3" />
                <span>{gig.category}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">{gig.description}</p>
          </CardContent>
          <CardFooter className="pt-2">
            <Link href={`/gigs/${gig._id}`} className="w-full">
              <Button
                variant="outline"
                className="w-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:border-blue-800"
              >
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
