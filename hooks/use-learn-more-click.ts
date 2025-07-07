"use client"

import type React from "react"

import { useCallback } from "react"

export function useLearnMoreClick() {
  const handleLearnMoreClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const url = event.currentTarget.getAttribute("data-url")
    if (url && window.top) {
      window.top.location.href = url
    }
  }, [])

  return handleLearnMoreClick
}
