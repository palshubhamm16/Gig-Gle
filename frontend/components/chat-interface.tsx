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

const fetchMessages = async (conversationId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${conversationId}`)
  const data = await res.json()
  return data.messages
}

const postMessage = async (conversationId: string, senderId: string, content: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversationId, senderId, content }),
  })

  if (!res.ok) throw new Error("Failed to send message")

  const message = await res.json()
  return message
}

const fetchConversations = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/participants/conversations/${userId}`)
  const data = await res.json()
  return data.conversations
}

const fetchUserInfo = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
  const user = await res.json()
  return {
    username: user.firstName || "Unknown",
    avatar: user.imageUrl || "/placeholder.svg",
  }
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const { user } = useUser()
  const clerk = useClerk()
  const [conversations, setConversations] = useState<any[]>([])
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")

  // Load conversations and set active
  useEffect(() => {
    if (!user || !clerk) return

    fetchConversations(user.id).then(async (convos) => {
      const formatted = await Promise.all(
        convos.map(async (c: any) => {
          const other = c.participants.find((p: any) => p.userId !== user.id)
          if (other) {
            const userInfo = await fetchUserInfo(other.userId)
            return {
              id: c._id,
              name: userInfo.username,
              avatar: userInfo.avatar,
              lastMessage: c.lastMessage,
            }
          }
          return {}
        })
      )

      setConversations(formatted)
      const convo = formatted.find((c) => c.id === conversationId)
      setActiveConversation(convo || formatted[0])
    })
  }, [user, conversationId, clerk])

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConversation) return

    fetchMessages(activeConversation.id).then((msgs) => {
      const formatted = msgs.map((m: any) => ({
        id: m._id,
        content: m.content,
        timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isUser: m.senderId === user?.id,
      }))
      setMessages(formatted)
    })
  }, [activeConversation, user])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !activeConversation || !user) return

    const tempMessage = {
      id: `temp-${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages((prev) => [...prev, tempMessage])
    setNewMessage("")

    try {
      const saved = await postMessage(activeConversation.id, user.id, newMessage)
      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempMessage.id ? {
          id: saved._id,
          content: saved.content,
          timestamp: new Date(saved.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isUser: true,
        } : msg))
      )
    } catch (err) {
      console.error("Failed to send message:", err)
    }
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-200px)] min-h-[500px]">
      {/* Conversations List */}
      <Card className="h-full overflow-hidden">
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Conversations</CardTitle>
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
                    <h3 className="font-medium truncate">{conversation.name ?? "Unknown"}</h3>
                    <p className="text-sm truncate">{conversation.lastMessage}</p>
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
              <CardTitle className="text-lg">{activeConversation?.name ?? "Unknown"}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Info className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}>
                <p>{message.content}</p>
                <span className={`text-xs mt-1 ${message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {message.timestamp}
                </span>
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
