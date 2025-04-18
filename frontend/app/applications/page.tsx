"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Briefcase,
  Building,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Clock3,
  MessageCircle,
} from "lucide-react"

export default function ApplicationsPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push("/sign-in?redirect_url=/applications")
      return
    }

    const fetchApplications = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/`, {
          headers: {
            "user-id": user.id,
          },
        })
        const data = await res.json()
        setApplications(data)
      } catch (err) {
        console.error("Failed to fetch applications:", err)
      }
    }

    fetchApplications()
  }, [user, isLoaded, router])

  const formatDate = (isoDate: string) => new Date(isoDate).toLocaleDateString()

  const transformApplication = (app: any) => {
    const status = app.status
    return {
      id: app._id,
      gigId: app.gig._id,
      gigTitle: app.gig.title,
      company: app.gig.company || "Unknown",
      location: `${app.gig.city || "N/A"}, ${app.gig.state || ""}, ${app.gig.country || ""}`, // ✅ FIXED LINE
      type: app.gig.type,
      appliedAt: formatDate(app.appliedAt),
      status,
      interviewDate: app.interview?.date ? formatDate(app.interview.date) : undefined,
      interviewMessage: app.interview?.message,
      startDate: app.startDate ? formatDate(app.startDate) : undefined,
    }
  }

  const pendingApplications = applications
    .filter((app) => app.status === "applied" || app.status === "interview")
    .map(transformApplication)

  const completedApplications = applications
    .filter((app) => app.status === "accepted" || app.status === "rejected")
    .map(transformApplication)

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground">Track and manage your gig applications</p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active ({pendingApplications.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedApplications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {pendingApplications.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No active applications</h3>
                <p className="text-muted-foreground mb-6">You don't have any active applications at the moment.</p>
                <Link href="/gigs">
                  <Button>Browse Gigs</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingApplications.map((application) => (
                  <Card key={application.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{application.gigTitle}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Building className="h-3 w-3" />
                            <span>{application.company}</span>
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            application.status === "applied"
                              ? "outline"
                              : application.status === "interview"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {application.status === "applied"
                            ? "Pending Review"
                            : application.status === "interview"
                            ? "Interview Scheduled"
                            : "Unknown"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Briefcase className="h-3 w-3" />
                          <span>{application.type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Clock className="h-3 w-3" />
                          <span>Applied on {application.appliedAt}</span>
                        </div>
                        {application.status === "interview" && application.interviewDate && (
                          <div className="flex justify-center items-center bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-center">
                            <Clock3 className="h-4 w-4 mr-2" />
                            <span>Interview on {application.interviewDate}</span>
                          </div>
                        )}
                        {application.status === "interview" && application.interviewMessage && (
                          <div className="flex justify-center items-center mt-4 text-white font-semibold bg-green-700 p-3 rounded-lg text-center">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            <span>{application.interviewMessage}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex gap-2 w-full">
                        <Link href={`/gigs/${application.gigId}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View Gig
                          </Button>
                        </Link>
                        <Button variant="default" size="sm" className="flex-1 gap-1">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedApplications.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No completed applications</h3>
                <p className="text-muted-foreground mb-6">You don't have any completed applications yet.</p>
                <Link href="/gigs">
                  <Button>Browse Gigs</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {completedApplications.map((application) => (
                  <Card key={application.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{application.gigTitle}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Building className="h-3 w-3" />
                            <span>{application.company}</span>
                          </CardDescription>
                        </div>
                        <Badge variant={application.status === "accepted" ? "default" : "destructive"}>
                          {application.status === "accepted" ? "Accepted" : "Rejected"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Briefcase className="h-3 w-3" />
                          <span>{application.type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Clock className="h-3 w-3" />
                          <span>Applied on {application.appliedAt}</span>
                        </div>
                        {application.status === "accepted" && application.startDate && (
                          <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-500">
                            <CheckCircle className="h-3 w-3" />
                            <span>Start date: {application.startDate}</span>
                          </div>
                        )}
                        {application.status === "rejected" && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <XCircle className="h-3 w-3" />
                            <span>Application not selected</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex gap-2 w-full">
                        <Link href={`/gigs/${application.gigId}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View Gig
                          </Button>
                        </Link>
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
