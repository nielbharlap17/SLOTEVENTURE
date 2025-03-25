"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface RatingProps {
  value: number
  onChange?: (value: number) => void
  max?: number
  size?: "sm" | "md" | "lg"
  readOnly?: boolean
}

export function Rating({ 
  value, 
  onChange, 
  max = 5, 
  size = "md", 
  readOnly = false 
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }
  
  const starSize = sizes[size]

  const handleMouseEnter = (index: number) => {
    if (readOnly) return
    setHoverValue(index)
  }
  
  const handleMouseLeave = () => {
    if (readOnly) return
    setHoverValue(null)
  }
  
  const handleClick = (index: number) => {
    if (readOnly) return
    if (onChange) {
      onChange(index)
    }
  }
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1
        const isFilled = (hoverValue !== null ? hoverValue : value) >= starValue
        
        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none"
          >
            <Star 
              className={`${starSize} cursor-${readOnly ? 'default' : 'pointer'} ${
                isFilled 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              }`}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starValue)}
            />
          </button>
        )
      })}
    </div>
  )
}
