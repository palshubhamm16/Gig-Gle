"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ScheduleInterviewModal({
  applicationId,
  onClose,
}: {
  applicationId: string
  onClose: () => void
}) {
  const [interviewDate, setInterviewDate] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/schedule-interview/${applicationId}`, {
        method: "PATCH", // Using PATCH as per your route
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          interviewDate,  // Send interviewDate as per backend controller
          message         // Send message
        }),
      })

      if (response.ok) {
        toast({ description: "Interview scheduled successfully!", variant: "default" })
      } else {
        // Check for error response and show the message from the backend
        const errorData = await response.json()
        toast({ description: errorData.message || "Failed to schedule the interview. Please try again.", variant: "destructive" })
      }
    } catch (error) {
      console.error(error)  // Optionally log the error to the console for debugging
      toast({ description: "An unexpected error occurred while scheduling the interview. Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Date</Label>
            <Input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea
              rows={3}
              placeholder="Add a message for the applicant"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !interviewDate}>
            {loading ? "Scheduling..." : "Schedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
