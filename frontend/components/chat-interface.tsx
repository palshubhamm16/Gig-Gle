"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Phone, Video, Info } from "lucide-react"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Creative Solutions",
    role: "Hiring Manager",
    gigTitle: "Web Design Assistant",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for applying! Do you have time for a quick chat about the position?",
    timestamp: "10:32 AM",
    unread: true,
    type: "employer", // This indicates if the user is an employer or applicant in this conversation
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "DataFlow Inc",
    role: "Team Lead",
    gigTitle: "Data Entry Specialist",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Your application looks great. I'd like to discuss the project timeline.",
    timestamp: "Yesterday",
    unread: false,
    type: "employer",
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    company: "TechHelp",
    role: "HR Specialist",
    gigTitle: "Customer Support Representative",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "We're moving forward with your application. Can you start next Monday?",
    timestamp: "Apr 8",
    unread: false,
    type: "employer",
  },
  {
    id: 4,
    name: "Jamie Smith",
    role: "Applicant",
    gigTitle: "Social Media Intern",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'm very interested in the position and would love to discuss my qualifications further.",
    timestamp: "Apr 9",
    unread: true,
    type: "applicant",
  },
  {
    id: 5,
    name: "Taylor Wilson",
    role: "Applicant",
    gigTitle: "Web Design Assistant",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for considering my application. I'm available for an interview anytime next week.",
    timestamp: "Apr 7",
    unread: false,
    type: "applicant",
  },
]

// Mock data for messages in the active conversation
const mockMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hi there! Thanks for applying to the Web Design Assistant position at Creative Solutions.",
    timestamp: "10:15 AM",
    isUser: false,
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    content:
      "I was really impressed with your portfolio and experience. Do you have time for a quick chat about the position?",
    timestamp: "10:16 AM",
    isUser: false,
  },
  {
    id: 3,
    sender: "You",
    content:
      "Hi Sarah! Thank you for reaching out. I'm very excited about the opportunity to work with Creative Solutions.",
    timestamp: "10:20 AM",
    isUser: true,
  },
  {
    id: 4,
    sender: "You",
    content: "Yes, I'd be happy to chat about the position. When would be a good time for you?",
    timestamp: "10:21 AM",
    isUser: true,
  },
  {
    id: 5,
    sender: "Sarah Johnson",
    content: "Great! How about tomorrow at 2 PM? We can do a video call if that works for you.",
    timestamp: "10:30 AM",
    isUser: false,
  },
  {
    id: 6,
    sender: "Sarah Johnson",
    content: "Also, I wanted to ask if you have experience with responsive design and accessibility features?",
    timestamp: "10:32 AM",
    isUser: false,
  },
]

export function ChatInterface() {
  const { user } = useUser()
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim() === "") return

    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-200px)] min-h-[500px]">
      {/* Conversations List */}
      <Card className="h-full overflow-hidden">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                All
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Employers
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Applicants
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto h-[calc(100%-60px)]">
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`w-full text-left p-3 hover:bg-muted/50 transition-colors ${activeConversation.id === conversation.id ? "bg-muted" : ""}`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                    <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.type === "employer"
                        ? `${conversation.company} • ${conversation.role}`
                        : `Re: ${conversation.gigTitle}`}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm truncate">{conversation.lastMessage}</p>
                      {conversation.unread && <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary"></span>}
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
                <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
                <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{activeConversation.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {activeConversation.company} • {activeConversation.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
                <span className="sr-only">Call</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Video className="h-4 w-4" />
                <span className="sr-only">Video call</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
                <span className="sr-only">Info</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] ${message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
              >
                <div className="flex flex-col">
                  <p>{message.content}</p>
                  <span
                    className={`text-xs mt-1 ${message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
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
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
