"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function HireApplicantModal({
  applicationId,
  onClose,
}: {
  applicationId: string
  onClose: () => void
}) {
  const [startDate, setStartDate] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleHire = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/hire/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate }),
      })

      if (response.ok) {
        toast({ description: "Applicant hired successfully!", variant: "default" })
      } else {
        const errorData = await response.json()
        toast({ description: errorData.message || "Failed to hire the applicant. Please try again.", variant: "destructive" })
      }
    } catch (error) {
      console.error(error)
      toast({ description: "An unexpected error occurred while hiring. Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hire Applicant</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // Disable past dates
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleHire} disabled={loading || !startDate}>
            {loading ? "Hiring..." : "Hire"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
