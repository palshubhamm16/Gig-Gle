"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { SignInButton } from "@clerk/nextjs"
import axios from "axios"

interface ApplyFormProps {
  gigId: string
  gigTitle: string
}

const disabilityOptions = [
  "Mobility Impairment",
  "Visual Impairment",
  "Hearing Impairment",
  "Speech Impairment",
  "Cognitive Disability",
  "Learning Disability",
  "Autism Spectrum Disorder",
  "ADHD",
  "Mental Health Condition",
  "Chronic Illness",
  "Neurological Disorder",
  "Intellectual Disability",
  "Multiple Disabilities",
]

export function ApplyForm({ gigId, gigTitle }: ApplyFormProps) {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const { toast } = useToast()

  const [resume, setResume] = useState<File | null>(null)
  const [name, setName] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [accommodation, setAccommodation] = useState("")
  const [disabilityType, setDisabilityType] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setResume(file)
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a valid PDF file.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!resume) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume in PDF format.",
        variant: "destructive",
      })
      return
    }

    if (!name.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter your full name.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("resume", resume)
      formData.append("gig", gigId)
      formData.append("name", name.trim())
      formData.append("coverLetter", coverLetter || "No cover letter provided.")
      formData.append("accommodationNeeded", accommodation || "No accommodation needed.")
      formData.append("disabilityType", disabilityType)
      formData.append("age", age)
      formData.append("gender", gender)

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "user-id": user?.id || "",
          },
        }
      )

      toast({
        title: "Application Submitted!",
        description: `You’ve successfully applied for "${gigTitle}".`,
      })

      router.push("/applications")
    } catch (err) {
      console.error("Application error", err)
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isSignedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Apply for this Gig</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Please sign in to apply.</p>
          <SignInButton mode="modal">
            <Button className="w-full">Sign In</Button>
          </SignInButton>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for this Gig</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              className="w-full border rounded px-3 py-2 text-sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select your gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disabilityType">Disability Type</Label>
            <select
              id="disabilityType"
              className="w-full border rounded px-3 py-2 text-sm"
              value={disabilityType}
              onChange={(e) => setDisabilityType(e.target.value)}
              required
            >
              <option value="">Select your disability type</option>
              {disabilityOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume (PDF)</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
            <p className="text-xs text-muted-foreground">Upload a PDF resume.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover-letter">Cover Letter</Label>
            <Textarea
              id="cover-letter"
              placeholder="Tell us why you're a great fit..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accommodation">Accommodation Needs</Label>
            <Textarea
              id="accommodation"
              placeholder="Let us know any accessibility or work accommodations you need."
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
