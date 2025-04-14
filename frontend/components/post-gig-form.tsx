"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Country, State, City, IState, ICity } from "country-state-city"
import { useUser } from "@clerk/nextjs" // Clerk's hook to get user data

export function PostGigForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useUser()  // Get user data from Clerk
  const [isSubmitting, setIsSubmitting] = useState(false)

  // States for country, state, and city selection
  const [countries, setCountries] = useState<ReturnType<typeof Country.getAllCountries>>([]) 
  const [states, setStates] = useState<IState[]>([]) 
  const [cities, setCities] = useState<ICity[]>([]) 
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")

  useEffect(() => {
    setCountries(Country.getAllCountries())
  }, [])

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
    setStates(State.getStatesOfCountry(countryCode))
    setSelectedState("")  // Reset state
    setCities([])          // Reset city
  }

  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode)
    setCities(City.getCitiesOfState(selectedCountry, stateCode))
    setSelectedCity("")  // Reset city
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Collect form data
    const formData = new FormData(e.currentTarget)
    const gigData = {
      title: formData.get("title"),
      company: formData.get("company"),
      locationType: formData.get("location-type"),
      location: formData.get("location"),
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      gigType: formData.get("gig-type"),
      category: formData.get("category"),
      description: formData.get("description"),
      requirements: formData.get("requirements"),
      responsibilities: formData.get("responsibilities"),
      benefits: formData.get("benefits"),
      salary: formData.get("salary"),
      hours: formData.get("hours"),
      deadline: formData.get("deadline"),
      accommodations: formData.get("accommodations"),
      flexibleHours: formData.get("flexible-hours"),
      assistiveTech: formData.get("assistive-tech"),
    }

    if (!user) {
      toast({
        title: "Error",
        description: "User is not authenticated.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": user.id,  // Send the user ID from Clerk
        },
        body: JSON.stringify(gigData),
      })

      if (!response.ok) {
        throw new Error("Failed to post gig")
      }

      toast({
        title: "Gig Posted Successfully!",
        description: "Your gig has been posted and is now visible to potential applicants.",
      })
      router.push("/gigs")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while posting your gig.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Gig Title</Label>
                <Input id="title" name="title" placeholder="e.g., Web Design Assistant" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company">Company/Organization Name</Label>
                <Input id="company" name="company" placeholder="e.g., Creative Solutions" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location-type">Location Type</Label>
                <Select defaultValue="remote" onValueChange={(value) => (document.getElementById("location-type-hidden") as HTMLInputElement)!.value = value}>
                  <input type="hidden" id="location-type-hidden" name="location-type" value="remote" />
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="e.g., New York, NY (leave blank if fully remote)" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Select value={selectedState} onValueChange={handleStateChange} disabled={!selectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState}>
                  <input type="hidden" id="city" name="city" value={selectedCity} />
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gig-type">Gig Type</Label>
                <input type="hidden" id="gig-type" name="gig-type" value="part-time" />
                <Select defaultValue="part-time" onValueChange={(value) => (document.getElementById("gig-type") as HTMLInputElement)!.value = value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gig type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <input type="hidden" id="category" name="category" value="technology" />
                <Select defaultValue="technology" onValueChange={(value) => (document.getElementById("category") as HTMLInputElement)!.value = value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="creative-arts">Creative Arts</SelectItem>
                    <SelectItem value="customer-service">Customer Service</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="data-entry">Data Entry</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Gig Details</h2>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of the gig..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List the skills, qualifications, or experience required..."
                  className="min-h-[120px]"
                  required
                />
                <p className="text-xs text-muted-foreground">Enter each requirement on a new line</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="responsibilities">Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  placeholder="List the main tasks and responsibilities..."
                  className="min-h-[120px]"
                  required
                />
                <p className="text-xs text-muted-foreground">Enter each responsibility on a new line</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  placeholder="List the benefits offered with this position..."
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">Enter each benefit on a new line</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Compensation & Schedule</h2>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="salary">Compensation</Label>
                <Input id="salary" name="salary" placeholder="e.g., $15-20 per hour, $500 per project" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hours">Hours</Label>
                <Input id="hours" name="hours" placeholder="e.g., 10-15 hours per week" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input id="deadline" name="deadline" type="date" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="accommodations">Accommodations</Label>
                <Textarea
                  id="accommodations"
                  name="accommodations"
                  placeholder="List any accommodations provided for individuals with disabilities..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="flexible-hours">Flexible Hours</Label>
                <Checkbox id="flexible-hours" name="flexible-hours" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="assistive-tech">Assistive Technology</Label>
                <Checkbox id="assistive-tech" name="assistive-tech" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Gig"}
      </Button>
    </form>
  )
}
export default PostGigForm