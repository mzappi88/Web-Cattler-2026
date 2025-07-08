"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import PaymentSuccess from "@/components/pricing/payment-success"

export default function SuccessPage() {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const loadCompleteData = async () => {
      try {
        // Get complete data from localStorage
        const storedData = localStorage.getItem("completeData")
        if (storedData) {
          const data = JSON.parse(storedData)
          if (mounted) {
            setPaymentData(data)
            setError(null)
          }
        } else {
          if (mounted) {
            setError("No completion data found")
            setTimeout(() => {
              if (mounted) {
                router.push("/pricing")
              }
            }, 100)
          }
        }
      } catch (error) {
        console.error("Error parsing completion data:", error)
        if (mounted) {
          setError("Invalid completion data")
          setTimeout(() => {
            if (mounted) {
              router.push("/pricing")
            }
          }, 100)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadCompleteData()

    return () => {
      mounted = false
    }
  }, [router]) // Only depend on router which is stable

  const handleStartUsingApp = () => {
    // Clear stored data
    localStorage.removeItem("paymentData")
    localStorage.removeItem("completeData")
    window.location.href = "https://app.feeder.cattler.com"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cattler-green mx-auto mb-4"></div>
          <p className="text-cattler-navy font-lato">Finalizando configuração...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-lato mb-4">{error}</p>
          <p className="text-cattler-navy/70 font-roboto">Redirecionando para a página de planos...</p>
        </div>
      </div>
    )
  }

  if (!paymentData) {
    return null
  }

  return <PaymentSuccess paymentData={paymentData} onStartUsingApp={handleStartUsingApp} />
}
