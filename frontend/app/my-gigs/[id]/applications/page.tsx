"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
import { format } from "date-fns"
import ScheduleInterviewModal from "./ScheduleInterviewModal" // We'll define this below

export default function ReviewApplicationsClientPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const params = useParams()
  const gigId = params?.id as string

  const fetchApplications = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/gig/${gigId}`, {
      cache: "no-store",
    })
    const data = await res.json()
    setApplications(data)
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleScheduleClick = (appId: string) => {
    setSelectedAppId(appId)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedAppId(null)
    setShowModal(false)
    fetchApplications()
  }

  const appliedApplications = applications.filter((a) => a.status === "applied")
  const interviewApplications = applications.filter((a) => a.status === "interview")
  const hiredApplications = applications.filter((a) => a.status === "hired")
  const rejectedApplications = applications.filter((a) => a.status === "rejected")

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/my-gigs" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors w-fit mb-6">
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
            <ApplicationList applications={appliedApplications} onScheduleClick={handleScheduleClick} />
          </TabsContent>
          <TabsContent value="interview">
            <ApplicationList applications={interviewApplications} onScheduleClick={handleScheduleClick} />
          </TabsContent>
          <TabsContent value="hired">
            <ApplicationList applications={hiredApplications} />
          </TabsContent>
          <TabsContent value="rejected">
            <ApplicationList applications={rejectedApplications} />
          </TabsContent>
        </Tabs>
      </div>

      {showModal && selectedAppId && (
        <ScheduleInterviewModal applicationId={selectedAppId} onClose={closeModal} />
      )}
    </div>
  )
}

function ApplicationList({ applications, onScheduleClick }: { applications: any[]; onScheduleClick?: (id: string) => void }) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No applications found</h3>
        <p className="text-muted-foreground">No applicants in this tab.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {applications.map((app) => (
        <ApplicationCard key={app._id} application={app} onScheduleClick={onScheduleClick} />
      ))}
    </div>
  )
}

function ApplicationCard({ application, onScheduleClick }: { application: any; onScheduleClick?: (id: string) => void }) {
  const status = application.status

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.name || "Unnamed Seeker"} />
              <AvatarFallback>{application.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{application.name || "Unnamed Seeker"}</CardTitle>
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
            <p className="text-sm text-muted-foreground">{application.accommodationNeeded || "None specified"}</p>
          </div>

          {/* New Fields */}
          {application.gender && (
            <div>
              <h3 className="text-sm font-medium mb-1">Gender</h3>
              <p className="text-sm text-muted-foreground">{application.gender}</p>
            </div>
          )}

          {application.age && (
            <div>
              <h3 className="text-sm font-medium mb-1">Age</h3>
              <p className="text-sm text-muted-foreground">{application.age}</p>
            </div>
          )}

          {application.disability && (
            <div>
              <h3 className="text-sm font-medium mb-1">Disability</h3>
              <p className="text-sm text-muted-foreground">{application.disability}</p>
            </div>
          )}

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

          {onScheduleClick && (
            <Button
              variant="secondary"
              size="sm"
              className="w-full gap-1"
              onClick={() => onScheduleClick(application._id)}
            >
              <Calendar className="h-4 w-4" />
              Schedule Interview
            </Button>
          )}

          {application.status === "applied" && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-1"
                onClick={() => alert(`Hiring applicant ${application.name}`)} // Replace with hire logic
              >
                <CheckCircle className="h-4 w-4" />
                Hire
              </Button>

              <Button
                variant="destructive"
                size="sm"
                className="w-full gap-1"
                onClick={() => alert(`Rejecting applicant ${application.name}`)} // Replace with reject logic
              >
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
