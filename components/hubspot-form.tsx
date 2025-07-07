"use client"

import type React from "react"
import { useEffect, useState } from "react"
import ThankYouContent from "./thank-you-content"
import BackgroundWrapper from "./background-wrapper"

declare global {
  interface Window {
    hbspt: any
  }
}

const HubSpotForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "//js.hsforms.net/forms/embed/v2.js"
    script.async = true
    script.onload = () => createForm()
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const createForm = () => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: "21027761",
        formId: "6cddcb2f-85ca-451b-a943-5642e3b7c1ae",
        target: "#hubspotForm",
        onFormSubmitted: () => {
          setIsSubmitted(true)
        },
      })
    }
  }

  return (
    <BackgroundWrapper>
      <div
        className="w-full max-w-2xl mx-auto p-8 rounded-lg"
        style={{
          backgroundColor: "rgba(18, 19, 52, 0.9)",
        }}
      >
        {isSubmitted ? (
          <ThankYouContent />
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6 text-white text-center">Request a Demo</h1>
            <div id="hubspotForm" className="bg-white p-8 rounded-lg shadow-lg" />
          </>
        )}
      </div>
    </BackgroundWrapper>
  )
}

export default HubSpotForm
