import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

export default async function GigDetailsPage({ params }: { params: { id: string } }) {
  const user = await currentUser()

  // Redirect to sign-in if not authenticated
  if (!user) {
    redirect("/sign-in?redirect_url=/my-gigs")
  }

  // Redirect to applications page for this gig
  redirect(`/my-gigs/${params.id}/applications`)
}
