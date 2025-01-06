"use client"

import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { useState } from "react"

export default function FixedNavbar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <>
      {/* Spacer div to prevent content from hiding behind fixed banner */}
      <div className="h-[72px] md:h-[64px]" />
      
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 h-[72px] md:h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-20 h-12 bg-primary rounded-xl flex items-center justify-center">
              <img 
                src="/assets/urbantap.png" 
                alt="App logo" 
                className="w-20 h-20 object-contain px-1"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Get the app</h3>
              <p className="text-xs text-muted-foreground">The fastest way to find properties</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="default"
              className="h-9 px-4 rounded-full bg-primary"
            >
              Use app
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close banner</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

