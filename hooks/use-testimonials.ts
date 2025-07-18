"use client"

import { useMemo } from "react"
import { useTranslation } from "./use-translation"
import { getTestimonialsByCountry, Testimonial } from "@/data/testimonials"

export function useTestimonials(): Testimonial[] {
  const { selectedCountry } = useTranslation()

  const testimonials = useMemo(() => {
    return getTestimonialsByCountry(selectedCountry)
  }, [selectedCountry])

  return testimonials
} 