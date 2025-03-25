"use client"

import { useState } from "react"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { deleteReview } from "@/lib/actions/review.actions"
import { formatDate } from "@/lib/utils"
import { Rating } from "@/components/shared/Rating"
import { AppError, createAppError, handleAppError } from "@/lib/utils"
import { ErrorDisplay } from "./ErrorDisplay"

type ReviewCardProps = {
  review: any
  currentUserId: string
  onDelete?: (reviewId: string) => void
}

export function ReviewCard({ review, currentUserId, onDelete }: ReviewCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<AppError | null>(null)
  
  const isCurrentUser = review?.user?._id === currentUserId
  
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return
    }
    
    setIsDeleting(true)
    setError(null)
    
    try {
      if (!review?._id) {
        throw createAppError('VALIDATION_ERROR', 'Review ID is required')
      }
      
      await deleteReview(review._id)
      
      if (onDelete) {
        onDelete(review._id)
      }
    } catch (error) {
      console.error("Error deleting review:", error)
      setError(handleAppError(error))
    } finally {
      setIsDeleting(false)
    }
  }
  
  if (!review) return null
  
  // Format the date or provide a fallback
  const formattedDate = review?.createdAt ? formatDate(review.createdAt) : 'Unknown date'
  
  return (
    <div 
      className="relative p-6 rounded-lg shadow-sm transition-all"
      style={{ backgroundColor: review?.bgColor || '#F5F5F5' }}
    >
      {error && (
        <ErrorDisplay 
          error={error} 
          onClose={() => setError(null)}
        />
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            {review?.avatar ? (
              <Image 
                src={review.avatar} 
                alt={review?.name || 'Reviewer'} 
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl">
                  {(review?.name?.charAt(0) || 'U').toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold">{review?.name || 'Anonymous'}</h4>
            <p className="text-sm text-gray-500">{review?.role || 'Attendee'}</p>
            <div className="mt-1">
              <Rating value={review?.rating || 0} readOnly />
            </div>
          </div>
        </div>
        
        {isCurrentUser && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700">{review?.quote || 'No review text provided'}</p>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        {formattedDate}
      </div>
    </div>
  )
}
