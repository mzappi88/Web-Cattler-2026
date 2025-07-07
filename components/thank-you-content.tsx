import type React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const ThankYouContent: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-8 rounded-lg bg-white shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Thank You!</h1>
      <p className="text-xl font-bold mb-4">Welcome to the Cattler Community!</p>
      <p className="mb-2">Your demo user will be sent to your email shortly.</p>
      <p className="mb-2">Be sure to check your spam folder if you don't see it.</p>
      <p className="mb-4">If you have any questions, please contact us:</p>

      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <a href="tel:+15312345882" className="font-bold text-green-600">
            +1 (531) 234-5882
          </a>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <a href="mailto:info@cattler.farm" className="font-bold text-green-600">
            info@cattler.farm
          </a>
        </div>
      </div>

      <Button
        asChild
        className="bg-[#22CE88] text-white font-bold py-2 px-4 rounded-full inline-flex items-center mb-6 hover:bg-[#1fb377]"
      >
        <Link href="https://www.cattler.farm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Homepage
        </Link>
      </Button>

      <h2 className="text-2xl font-bold mb-4">Download Cattler App</h2>
      <div className="flex justify-center space-x-4 mb-6">
        <a
          href="https://play.google.com/store/apps/details?id=com.cattlerapp&hl=en_US&pli=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1664287128google-play-store-logo-png-TnqGr1pgmmMyhUijcHdy0tytufbay1.png"
            alt="Get it on Google Play"
            width={135}
            height={40}
          />
        </a>
        <a href="https://apps.apple.com/us/app/cattler/id1584969241" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a902db97f96951c82922874-NdK2w7iM4CtO0XLEkBefXVguyUZB80.png"
            alt="Download on App Store"
            width={135}
            height={40}
          />
        </a>
      </div>
      <div className="flex justify-center space-x-8">
        <div>
          <Image
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.cattlerapp&hl=en_US&pli=1"
            alt="Google Play QR Code"
            width={150}
            height={150}
            className="border-4 border-black rounded-lg"
          />
        </div>
        <div>
          <Image
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://apps.apple.com/us/app/cattler/id1584969241"
            alt="App Store QR Code"
            width={150}
            height={150}
            className="border-4 border-black rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default ThankYouContent
