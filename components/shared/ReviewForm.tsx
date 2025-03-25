"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { createReview } from "@/lib/actions/review.actions"
import { useRouter } from "next/navigation"
import { Rating } from "@/components/shared/Rating"
import { ErrorDisplay } from "@/components/shared/ErrorDisplay"
import { AppError, createAppError, handleAppError } from "@/lib/utils"

const formSchema = z.object({
  quote: z.string().min(10, {
    message: "Review must be at least 10 characters.",
  }),
  rating: z.number().min(1).max(5),
})

type ReviewFormProps = {
  eventId: string
  userId: string
}

export function ReviewForm({ eventId, userId }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<AppError | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: "",
      rating: 5,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate inputs
      if (!eventId) {
        throw createAppError('EVENT_ERROR', 'Event ID is required');
      }

      if (!userId) {
        throw createAppError('AUTH_ERROR', 'You must be logged in to submit a review');
      }

      if (values.rating < 1 || values.rating > 5) {
        throw createAppError('VALIDATION_ERROR', 'Rating must be between 1 and 5');
      }

      if (values.quote.trim().length < 10) {
        throw createAppError('VALIDATION_ERROR', 'Review must be at least 10 characters');
      }

      await createReview({
        eventId,
        userId,
        quote: values.quote,
        rating: values.rating,
      })

      form.reset()
      router.refresh()
    } catch (error) {
      console.error("Error submitting review:", error)
      setError(handleAppError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
      
      {error && (
        <ErrorDisplay 
          error={error} 
          onClose={() => setError(null)}
        />
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Rating 
                    value={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your experience about this event..." 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Your review will be visible to other users.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
