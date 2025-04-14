import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { PostGigForm } from "@/components/post-gig-form"

export const metadata: Metadata = {
  title: "Post a Gig | Gig-gle",
  description: "Create a new gig posting on Gig-gle",
}

export default async function PostGigPage() {
  const user = await currentUser()

  // Redirect to sign-in if not authenticated
  if (!user) {
    redirect("/sign-in?redirect_url=/post-gig")
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Post a Gig</h1>
          <p className="text-muted-foreground">
            Create a new gig posting to find talented individuals for your opportunity
          </p>
        </div>

        <PostGigForm />
      </div>
    </div>
  )
}
