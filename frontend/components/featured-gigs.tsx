import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, Building } from "lucide-react"

// Mock data for featured gigs
const featuredGigs = [
  {
    id: 1,
    title: "Web Design Assistant",
    company: "Creative Solutions",
    location: "Remote",
    type: "Part-time",
    category: "Technology",
    postedAt: "2 days ago",
    description: "Help design and update websites for our clients. Flexible hours and mentorship provided.",
  },
  {
    id: 2,
    title: "Social Media Intern",
    company: "Marketing Minds",
    location: "Hybrid - New York",
    type: "Internship",
    category: "Marketing",
    postedAt: "3 days ago",
    description: "Create engaging content for various social media platforms. Learn valuable marketing skills.",
  },
  {
    id: 3,
    title: "Data Entry Specialist",
    company: "DataFlow Inc",
    location: "Remote",
    type: "Freelance",
    category: "Administrative",
    postedAt: "1 day ago",
    description: "Input and organize data for our growing company. Work at your own pace.",
  },
  {
    id: 4,
    title: "Customer Support Representative",
    company: "TechHelp",
    location: "Remote",
    type: "Part-time",
    category: "Customer Service",
    postedAt: "5 days ago",
    description: "Provide excellent customer service via email and chat. Training provided.",
  },
]

export function FeaturedGigs() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {featuredGigs.map((gig) => (
        <Card key={gig.id} className="flex flex-col">
          <CardContent className="flex-1 pt-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">{gig.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Building className="h-3 w-3" />
                  <span>{gig.company}</span>
                </div>
              </div>
              <Badge
                variant={gig.type === "Part-time" ? "default" : gig.type === "Internship" ? "secondary" : "outline"}
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
                <span>Posted {gig.postedAt}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Briefcase className="h-3 w-3" />
                <span>{gig.category}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">{gig.description}</p>
          </CardContent>
          <CardFooter className="pt-2">
            <Link href={`/gigs/${gig.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
