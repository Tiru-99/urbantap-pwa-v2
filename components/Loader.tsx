"use client"

import { Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div
        role="status"
        className="flex items-center justify-center"
      >
        <Loader2 
          className={cn(
            "animate-spin text-primary",
            sizeClasses[size],
            className
          )}
        />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

