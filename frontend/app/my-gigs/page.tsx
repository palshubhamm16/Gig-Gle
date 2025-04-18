import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Building, Clock, MapPin, Users, Edit, Trash, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "My Posted Gigs | Gig-gle",
  description: "Manage your posted gigs and review applications",
}

type Gig = {
  _id: string
  title: string
  company: string
  locationType: string
  location: string
  country: string
  state: string
  city: string
  type: string
  category: string
  description: string
  requirements: string
  responsibilities: string
  benefits: string
  salary: string
  hours: string
  deadline: string
  accommodations: string
  flexibleHours: boolean
  assistiveTech: boolean
  userId: string
  createdAt: string
  applicationsCount?: number
  newApplications?: number
  status?: string
}

async function fetchUserGigs(userId: string): Promise<Gig[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-gigs`, {
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    cache: "no-store",
  })

  const text = await res.text()
  console.log("Raw response from /my-gigs:", text)

  if (!res.ok) throw new Error("Failed to fetch gigs")

  try {
    return JSON.parse(text)
  } catch (err) {
    throw new Error("Invalid JSON response from /my-gigs")
  }
}

export default async function MyGigsPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in?redirect_url=/my-gigs")
  }

  let gigs: Gig[] = []

  try {
    gigs = await fetchUserGigs(user.id)
  } catch (error) {
    console.error("Failed to fetch user's gigs:", error)
  }

  // Mock default status if not present
  const withStatus = gigs.map((gig) => ({
    ...gig,
    status: "active", // you could update this logic later
    applicationsCount: gig.applicationsCount ?? 0,
    newApplications: gig.newApplications ?? 0,
    postedAt: new Date(gig.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  }))

  const activeGigs = withStatus.filter((gig) => gig.status === "active")
  const closedGigs = withStatus.filter((gig) => gig.status === "closed")

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Posted Gigs</h1>
            <p className="text-muted-foreground">Manage your gigs and review applications</p>
          </div>
          <Link href="/post-gig">
            <Button>Post New Gig</Button>
          </Link>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Gigs ({activeGigs.length})</TabsTrigger>
            <TabsTrigger value="closed">Closed Gigs ({closedGigs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeGigs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No active gigs</h3>
                <p className="text-muted-foreground mb-6">You haven't posted any active gigs yet.</p>
                <Link href="/post-gig">
                  <Button>Post a Gig</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {activeGigs.map((gig) => (
                  <Card key={gig._id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{gig.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Building className="h-3 w-3" />
                            <span>{gig.company}</span>
                          </CardDescription>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{gig.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Briefcase className="h-3 w-3" />
                          <span>
                            {gig.type} • {gig.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Clock className="h-3 w-3" />
                          <span>Posted on {gig.postedAt}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium mt-1">
                          <Users className="h-4 w-4" />
                          <span>
                            {gig.applicationsCount} Applications
                            {gig.newApplications && gig.newApplications > 0 && (
                              <Badge variant="secondary" className="ml-2">
                                {gig.newApplications} new
                              </Badge>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex gap-2 w-full">
                        <Link href={`/my-gigs/${gig._id}/applications`} className="flex-1">
                          <Button variant="default" size="sm" className="w-full">
                            Review Applications
                          </Button>
                        </Link>
                        <Link href={`/gigs/${gig._id}`} className="flex-shrink-0">
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/my-gigs/${gig._id}/edit`} className="flex-shrink-0">
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="closed" className="space-y-6">
            {closedGigs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No closed gigs</h3>
                <p className="text-muted-foreground mb-6">You don't have any closed gigs yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {closedGigs.map((gig) => (
                  <Card key={gig._id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{gig.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Building className="h-3 w-3" />
                            <span>{gig.company}</span>
                          </CardDescription>
                        </div>
                        <Badge variant="outline">Closed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{gig.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Briefcase className="h-3 w-3" />
                          <span>
                            {gig.type} • {gig.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Clock className="h-3 w-3" />
                          <span>Posted on {gig.postedAt}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium mt-1">
                          <Users className="h-4 w-4" />
                          <span>{gig.applicationsCount} Total Applications</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex gap-2 w-full">
                        <Link href={`/my-gigs/${gig._id}/applications`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View Applications
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="flex-shrink-0 gap-1">
                          <Trash className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
