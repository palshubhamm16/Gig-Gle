import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase, MapPin, Clock, Building, Calendar,
  DollarSign, Share2, BookmarkPlus, ArrowLeft,
} from "lucide-react";
import { ApplyForm } from "@/components/apply-form";

// Metadata
export const metadata: Metadata = {
  title: "Gig Details | Gig-gle",
  description: "View details and apply for this gig on Gig-gle",
};

// Fetch gig from backend
async function getGig(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch gig");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching gig:", err);
    return null;
  }
}

export default async function GigDetailsPage({ params }: { params: { id: string } }) {
  const gig = await getGig(params.id);

  if (!gig) {
    notFound();
  }

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
          {/* Main Content */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">{gig.title}</h1>
                <Badge
                  variant={gig.type === "part-time" ? "default" : gig.type === "internship" ? "secondary" : "outline"}
                >
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
                  <span>{gig.location}</span>
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

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p>{gig.description}</p>
            </div>

            {/* Requirements */}
            {gig.requirements && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {gig.requirements.split("\n").map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {gig.responsibilities && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {gig.responsibilities.split("\n").map((resp: string, i: number) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {gig.benefits && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Benefits</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {gig.benefits.split("\n").map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accommodations */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Accommodations Available</h2>
              <p>{gig.accommodations}</p>
            </div>

            {/* Apply Form (Mobile) */}
            <div className="lg:hidden">
              <ApplyForm gigId={gig._id} gigTitle={gig.title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Quick Info</h3>
                  <Separator />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Compensation</p>
                      <p className="text-sm text-muted-foreground">{gig.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Hours</p>
                      <p className="text-sm text-muted-foreground">{gig.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Application Deadline</p>
                      <p className="text-sm text-muted-foreground">{gig.deadline}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {gig.city}, {gig.state}, {gig.country}
                    </p>
                  </div>
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

            {/* Apply Form (Desktop) */}
            <div className="hidden lg:block">
              <ApplyForm gigId={gig._id} gigTitle={gig.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
