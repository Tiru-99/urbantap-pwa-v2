import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Lock } from 'lucide-react'

interface GatedContentProps {
  className?: string
  placeholderHeight?: string
}

export function GatedContent({ className = "", placeholderHeight = "200px" }: GatedContentProps) {
  return (
    <Card className={`relative border-2 border-dashed border-border p-6 ${className}`}>
      {/* Placeholder area */}
      <div 
        className="w-full bg-muted/50 rounded-lg mb-8"
        style={{ height: placeholderHeight }}
      />
      
      {/* Lock icon and text */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="relative flex items-center justify-center w-12 h-12">
          <img src="/assets/img/lock.png"></img>
        </div>
        <p className="text-center text-lg font-medium">
          Unlock info by Downloading the App
        </p>
      </div>

      {/* CTA Button */}
      <Button className="w-full" variant="default" size="lg">
        Download App Now
      </Button>
    </Card>
  )
}

