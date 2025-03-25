"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { ReviewCard } from "./ReviewCard"
import { ReviewForm } from "./ReviewForm"
import { deleteReview, getReviewsByEvent, handleNextReview, handlePrevReview } from "@/lib/actions/review.actions"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { AppError, createAppError, handleAppError } from "@/lib/utils"
import { ErrorDisplay } from "./ErrorDisplay"

interface ReviewsSectionProps {
  eventId: string
  initialReviews?: any[]
  totalPages?: number
  userId: string
}

export function ReviewsSection({ eventId, initialReviews = [], totalPages = 1, userId }: ReviewsSectionProps) {
  const router = useRouter()
  
  const [reviews, setReviews] = useState<any[]>(initialReviews)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [error, setError] = useState<AppError | null>(null)

  useEffect(() => {
    setReviews(initialReviews)
  }, [initialReviews])

  const loadReviews = async (page: number) => {
    setIsLoading(true)
    setError(null)
    
    try {
      if (!eventId) {
        throw createAppError('EVENT_ERROR', 'Event ID is required to fetch reviews')
      }
      
      const result = await getReviewsByEvent({ eventId, page })
      if (result?.data) {
        setReviews(result.data)
      }
    } catch (error) {
      console.error("Error loading reviews:", error)
      setError(handleAppError(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    loadReviews(newPage)
  }

  const handleDelete = async (reviewId: string) => {
    try {
      setError(null)
      
      if (!reviewId) {
        throw createAppError('VALIDATION_ERROR', 'Review ID is required')
      }
      
      await deleteReview(reviewId)
      
      // Refresh reviews after deletion
      loadReviews(currentPage)
      router.refresh()
    } catch (error) {
      console.error("Error deleting review:", error)
      setError(handleAppError(error))
    }
  }

  const handleNextReviewClick = async () => {
    if (reviews.length <= 1) return
    
    try {
      setError(null)
      setIsLoading(true)
      
      const currentReview = reviews[currentReviewIndex]
      if (!currentReview?._id) {
        throw createAppError('REVIEW_ERROR', 'Invalid review data')
      }
      
      const nextReview = await handleNextReview(eventId, currentReview._id)
      
      // Find the index of the next review
      const nextIndex = reviews.findIndex(r => r._id === nextReview._id)
      if (nextIndex !== -1) {
        setCurrentReviewIndex(nextIndex)
      }
    } catch (error) {
      console.error("Error handling next review:", error)
      setError(handleAppError(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevReviewClick = async () => {
    if (reviews.length <= 1) return
    
    try {
      setError(null)
      setIsLoading(true)
      
      const currentReview = reviews[currentReviewIndex]
      if (!currentReview?._id) {
        throw createAppError('REVIEW_ERROR', 'Invalid review data')
      }
      
      const prevReview = await handlePrevReview(eventId, currentReview._id)
      
      // Find the index of the previous review
      const prevIndex = reviews.findIndex(r => r._id === prevReview._id)
      if (prevIndex !== -1) {
        setCurrentReviewIndex(prevIndex)
      }
    } catch (error) {
      console.error("Error handling previous review:", error)
      setError(handleAppError(error))
    } finally {
      setIsLoading(false)
    }
  }

  const hasReviewed = reviews.some(review => review.user?._id === userId)

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Reviews</h3>
        
        {!hasReviewed && !showForm && (
          <Button 
            onClick={() => setShowForm(true)}
            variant="outline"
          >
            Write a Review
          </Button>
        )}
      </div>

      {error && (
        <ErrorDisplay 
          error={error} 
          onClose={() => setError(null)}
        />
      )}
      
      {showForm && (
        <div className="mb-8">
          <ReviewForm eventId={eventId} userId={userId} />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          <div className="relative">
            {reviews.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-10 px-4">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="rounded-full bg-white/80 shadow-sm hover:bg-white"
                  onClick={handlePrevReviewClick}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="rounded-full bg-white/80 shadow-sm hover:bg-white"
                  onClick={handleNextReviewClick}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
            
            {reviews[currentReviewIndex] && (
              <ReviewCard 
                review={reviews[currentReviewIndex]} 
                currentUserId={userId}
                onDelete={handleDelete}
              />
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(index + 1)}
                  disabled={isLoading}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No reviews yet. Be the first to share your experience!
        </div>
      )}
    </div>
  )
}
