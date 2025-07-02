"use client"

import React from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="animate-in fade-in-0 duration-200">
      {children}
    </div>
  )
}