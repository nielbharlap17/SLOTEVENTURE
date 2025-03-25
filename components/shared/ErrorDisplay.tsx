"use client"

import { AlertCircle, X } from "lucide-react"
import { useState } from "react"
import { AppError, getErrorMessage } from "@/lib/utils"

interface ErrorDisplayProps {
  error: AppError
  onClose?: () => void
}

export function ErrorDisplay({ error, onClose }: ErrorDisplayProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }
  
  if (!isVisible) return null
  
  const message = getErrorMessage(error)
  
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {error.type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
          </h3>
          <div className="mt-1 text-sm text-red-700">
            <p>{message}</p>
          </div>
        </div>
        <button
          type="button"
          className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700 focus:outline-none"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {error.details && process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded overflow-auto max-h-32">
          <pre>{JSON.stringify(error.details, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
