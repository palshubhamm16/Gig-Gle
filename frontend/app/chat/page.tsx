import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { ChatInterface } from "@/components/chat-interface"

export const metadata: Metadata = {
  title: "Chat | Gig-gle",
  description: "Chat with employers and other users on Gig-gle",
}

export default async function ChatPage() {
  const user = await currentUser()

  // Redirect to sign-in if not authenticated
  if (!user) {
    redirect("/sign-in?redirect_url=/chat")
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Chat with employers and other users</p>
      </div>

      <ChatInterface />
    </div>
  )
}
