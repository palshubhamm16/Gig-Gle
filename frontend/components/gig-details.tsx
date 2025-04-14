"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ApplyForm } from "@/components/apply-form"
import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Share2,
  BookmarkPlus,
} from "lucide-react"

export function GigDetails({ gig }: { gig: any }) {
  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="flex flex-col gap-6">
        <Link
          href="/gigs"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to gigs</span>
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">{gig.title}</h1>
                <Badge variant={gig.type === "part-time" ? "default" : "secondary"}>
                  {gig.type}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{gig.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{`${gig.city}, ${gig.state}, ${gig.country}`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Posted recently</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{gig.category}</span>
                </div>
              </div>
            </div>

            <Section title="Description" content={<p>{gig.description}</p>} />
            <Section title="Requirements" content={<p>{gig.requirements}</p>} />
            <Section title="Responsibilities" content={<p>{gig.responsibilities}</p>} />
            <Section title="Benefits" content={<p>{gig.benefits}</p>} />
            <Section title="Accommodations" content={<p>{gig.accommodations}</p>} />

            <div className="lg:hidden">
              <ApplyForm gigId={gig._id} gigTitle={gig.title} />
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Quick Info</h3>
                  <Separator />
                </div>
                <div className="space-y-3">
                  <InfoRow icon={DollarSign} label="Compensation" value={gig.salary} />
                  <InfoRow icon={Clock} label="Hours" value={gig.hours} />
                  <InfoRow icon={Calendar} label="Deadline" value={gig.deadline} />
                </div>
                <Separator />
                <div className="space-y-3">
                  <ContactInfo label="Contact Email" value={gig.contactEmail || "N/A"} />
                  <ContactInfo label="Contact Phone" value={gig.contactPhone || "N/A"} />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <BookmarkPlus className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="hidden lg:block">
              <ApplyForm gigId={gig._id} gigTitle={gig.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {content}
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function ContactInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  )
}
