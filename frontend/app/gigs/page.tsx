'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Country, State, City } from "country-state-city"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Building, Filter } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function GigsPage() {
  const [gigs, setGigs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Filters
  const [selectedCountry, setSelectedCountry] = useState('IN')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('technology')
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['part-time'])

  // Options
  const [stateOptions, setStateOptions] = useState<any[]>([])
  const [cityOptions, setCityOptions] = useState<any[]>([])

  useEffect(() => {
    const states = State.getStatesOfCountry(selectedCountry)
    setStateOptions(states)
    setSelectedState('')
    setSelectedCity('')
    setCityOptions([])
  }, [selectedCountry])

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState(selectedCountry, selectedState)
      setCityOptions(cities)
      setSelectedCity('')
    }
  }, [selectedState])

  async function fetchFilteredGigs() {
    setLoading(true)

    const query = new URLSearchParams({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      category: selectedCategory,
      types: selectedTypes.join(','),
    })

    try {
      const res = await fetch(`${API_URL}/gigs?${query.toString()}`)
      const data = await res.json()
      setGigs(data)
    } catch (err) {
      console.error('Fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleTypeToggle(type: string) {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find Gigs</h1>
          <p className="text-muted-foreground">
            Browse through available opportunities that match your skills and interests
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          {/* Sidebar Filters */}
          <Card className="h-fit">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                <div className="space-y-4 text-sm">

                  {/* Country */}
                  <div>
                    <label className="block mb-1 font-medium">Country</label>
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block mb-1 font-medium">State</label>
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      disabled={!stateOptions.length}
                    >
                      <option value="">Select State</option>
                      {stateOptions.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block mb-1 font-medium">City</label>
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!cityOptions.length}
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="technology">Technology</option>
                      <option value="creative-arts">Creative Arts</option>
                      <option value="customer-service">Customer Service</option>
                      <option value="education">Education</option>
                      <option value="administrative">Administrative</option>
                      <option value="marketing">Marketing</option>
                      <option value="data-entry">Data Entry</option>
                      <option value="writing">Writing</option>
                      {/* Add more categories here */}
                    </select>
                  </div>

                  {/* Job Types */}
                  <div>
                    <label className="block mb-1 font-medium">Job Types</label>
                    <div className="space-y-1">
                      {["part-time", "internship", "freelance"].map(type => (
                        <div key={type} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={type}
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeToggle(type)}
                          />
                          <label htmlFor={type} className="capitalize">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={fetchFilteredGigs} className="w-full">
                {loading ? "Loading..." : "Apply Filters"}
              </Button>
            </CardContent>
          </Card>

          {/* Gigs List */}
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{gigs.length}</strong> results
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gigs.map((gig) => (
                <Card key={gig._id} className="flex flex-col">
                  <CardContent className="flex-1 pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-lg">{gig.title}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Building className="h-3 w-3" />
                          <span>{gig.company}</span>
                        </div>
                      </div>
                      <Badge variant="default">{gig.type}</Badge>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{gig.city}, {gig.state}, {gig.country}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="h-3 w-3" />
                        <span>{gig.postedAt || 'Recently posted'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Briefcase className="h-3 w-3" />
                        <span>{gig.category}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">{gig.description}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link href={`/gigs/${gig._id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
