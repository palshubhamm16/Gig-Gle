import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  XCircle,
  Download,
  Calendar,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Review Applications | Gig-gle",
  description: "Review applications for your posted gig",
}

async function fetchApplicationsByGigId(gigId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/gig/${gigId}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch applications")
  }

  return res.json()
}

export default async function ReviewApplicationsPage({ params }: { params: { id: string } }) {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in?redirect_url=/my-gigs")
  }

  const gigId = params.id
  const applications = await fetchApplicationsByGigId(gigId)

  const appliedApplications = applications.filter((app: any) => app.status === "applied")
  const interviewApplications = applications.filter((app: any) => app.status === "interview")
  const hiredApplications = applications.filter((app: any) => app.status === "hired")
  const rejectedApplications = applications.filter((app: any) => app.status === "rejected")

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/my-gigs"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors w-fit mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to My Gigs</span>
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">
            Review and manage applications for this position ({applications.length} total)
          </p>
        </div>

        <Tabs defaultValue="applied" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applied">Applied ({appliedApplications.length})</TabsTrigger>
            <TabsTrigger value="interview">Interview ({interviewApplications.length})</TabsTrigger>
            <TabsTrigger value="hired">Hired ({hiredApplications.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="applied">
            <ApplicationList applications={appliedApplications} emptyMsg="No applied applications" />
          </TabsContent>
          <TabsContent value="interview">
            <ApplicationList applications={interviewApplications} emptyMsg="No interviews scheduled" />
          </TabsContent>
          <TabsContent value="hired">
            <ApplicationList applications={hiredApplications} emptyMsg="No hired applicants yet" />
          </TabsContent>
          <TabsContent value="rejected">
            <ApplicationList applications={rejectedApplications} emptyMsg="No rejected applications" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ApplicationList({ applications, emptyMsg }: { applications: any[]; emptyMsg: string }) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">{emptyMsg}</h3>
        <p className="text-muted-foreground">You don't have any applications in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {applications.map((application) => (
        <ApplicationCard key={application._id} application={application} />
      ))}
    </div>
  )
}

function ApplicationCard({ application }: { application: any }) {
  const applicantName = application.name || "Unnamed Seeker"

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={application.avatar || "/placeholder.svg"} alt={applicantName} />
              <AvatarFallback>{applicantName?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{applicantName}</CardTitle>
              <CardDescription>{application.seeker}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge
              variant={
                application.status === "applied"
                  ? "outline"
                  : application.status === "interview"
                  ? "secondary"
                  : application.status === "hired"
                  ? "default"
                  : "destructive"
              }
            >
              {application.status === "applied"
                ? "Applied"
                : application.status === "interview"
                ? "Interview Scheduled"
                : application.status === "hired"
                ? "Hired"
                : "Rejected"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Applied {new Date(application.appliedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Cover Letter</h3>
            <p className="text-sm text-muted-foreground">{application.coverLetter || "None provided"}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-1">Accommodations Needed</h3>
            <p className="text-sm text-muted-foreground">
              {application.accommodationNeeded || "None specified"}
            </p>
          </div>

          {application.status === "interview" && application.interview?.date && (
            <div className="flex items-center gap-1 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              <span>Interview scheduled for {new Date(application.interview.date).toLocaleDateString()}</span>
            </div>
          )}

          {application.status === "hired" && application.startDate && (
            <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-500">
              <CheckCircle className="h-4 w-4" />
              <span>Start date: {new Date(application.startDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex flex-wrap gap-2 w-full">
          {application.pdf && (
            <a href={application.pdf} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Resume
              </Button>
            </a>
          )}

          <Link href={`/chat?applicant=${application.seeker}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full gap-1">
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
          </Link>

          {application.status === "applied" && (
            <>
              <Button variant="default" size="sm" className="flex-1 gap-1">
                <Calendar className="h-4 w-4" />
                Schedule Interview
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </>
          )}

          {application.status === "interview" && (
            <>
              <Button variant="default" size="sm" className="flex-1 gap-1">
                <CheckCircle className="h-4 w-4" />
                Hire
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
