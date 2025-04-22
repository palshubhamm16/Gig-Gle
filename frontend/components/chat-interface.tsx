"use client"

import { useEffect, useState } from "react"
import { useUser, useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Phone, Video, Info } from "lucide-react"

interface ChatInterfaceProps {
  conversationId: string
}

const fetchConversations = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participants/conversations/${userId}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Failed to fetch conversations. Response:", errorText)
      throw new Error("Failed to fetch conversations")
    }

    const data = await res.json()
    return data.conversations
  } catch (error) {
    console.error("Error fetching conversations:", error)
    throw error
  }
}

const fetchUserInfo = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
    if (!res.ok) throw new Error("Failed to fetch user info")

    const user = await res.json()
    return {
      username: user.firstName || "Unknown",
      avatar: user.imageUrl || "/placeholder.svg",
    }
  } catch (error) {
    console.error("Error fetching user info:", error)
    return { username: "Unknown", avatar: "/placeholder.svg" }
  }
}


export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const { user } = useUser()
  const clerk = useClerk()  // Access Clerk client instance using the hook
  const [conversations, setConversations] = useState<
    { id: string; avatar?: string; name?: string; company?: string; role?: string; timestamp?: string; type?: string; gigTitle?: string; lastMessage?: string; unread?: boolean }[]
  >([])
  const [activeConversation, setActiveConversation] = useState<typeof conversations[number] | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (!user || !clerk) return

    fetchConversations(user.id).then(async (convos) => {
      const formatted = await Promise.all(
        convos.map(async (c: any) => {
          const other = c.participants.find((p: any) => p.userId !== user.id)  // Find the other participant
          if (other) {
            const userInfo = await fetchUserInfo(other.userId);  // Fetch user info
            return {
              id: c._id,
              name: userInfo.username,  // Use the fetched username
              avatar: userInfo.avatar,  // Use the fetched avatar
              lastMessage: c.lastMessage,  // Add any other fields like lastMessage if needed
            };
          }
          return {};
        })
      );

      setConversations(formatted);
      const convo = formatted.find((c) => c.id === conversationId);
      setActiveConversation(convo || formatted[0]);
    })
  }, [user, conversationId, clerk]);  // Ensure Clerk and user are included as dependencies

  useEffect(() => {
    if (!activeConversation) return

  }, [activeConversation])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Optionally send message to backend
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-200px)] min-h-[500px]">
      {/* Conversations List */}
      <Card className="h-full overflow-hidden">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Conversations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto h-[calc(100%-60px)]">
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`w-full text-left p-3 hover:bg-muted/50 transition-colors ${
                  activeConversation?.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => {
                  setActiveConversation(conversation)
                  setMessages([])
                }}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name ?? "User"} />
                    <AvatarFallback>{conversation.name?.charAt(0) ?? "?"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.name ?? "Unknown"}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.type === "employer"
                        ? `${conversation.company} • ${conversation.role}`
                        : `Re: ${conversation.gigTitle}`}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm truncate">{conversation.lastMessage}</p>
                      {conversation.unread && <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary" />}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="h-full flex flex-col">
        <CardHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activeConversation?.avatar || "/placeholder.svg"} alt={activeConversation?.name ?? "User"} />
                <AvatarFallback>{activeConversation?.name?.charAt(0) ?? "?"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{activeConversation?.name ?? "Unknown"}</CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Info className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}>
                <div className="flex flex-col">
                  <p>{message.content}</p>
                  <span className={`text-xs mt-1 ${message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon"><Send className="h-4 w-4" /></Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
