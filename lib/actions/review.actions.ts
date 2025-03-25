"use server"

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../database';
import Review from '../database/models/review.model';
import Event from '../database/models/event.model';
import User from '../database/models/user.model';
import { handleError, createAppError, handleAppError } from '../utils';
import { CreateReviewParams, GetReviewsByEventParams, GetReviewsByUserParams } from '@/types';

// Create a new review
export async function createReview(reviewData: CreateReviewParams) {
  try {
    await connectToDatabase();

    // Validate inputs
    if (!reviewData.eventId) {
      throw createAppError('VALIDATION_ERROR', 'Event ID is required');
    }
    
    if (!reviewData.userId) {
      throw createAppError('AUTH_ERROR', 'User ID is required');
    }

    if (!reviewData.quote || reviewData.quote.trim().length < 10) {
      throw createAppError('VALIDATION_ERROR', 'Review text must be at least 10 characters');
    }

    if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
      throw createAppError('VALIDATION_ERROR', 'Rating must be between 1 and 5');
    }

    // Check if event exists
    const event = await Event.findById(reviewData.eventId);
    if (!event) {
      throw createAppError('NOT_FOUND', 'Event not found');
    }

    // Check if user exists
    const user = await User.findById(reviewData.userId);
    if (!user) {
      throw createAppError('NOT_FOUND', 'User not found');
    }

    // Check if user has already reviewed this event
    const existingReview = await Review.findOne({
      event: reviewData.eventId,
      user: reviewData.userId
    });

    if (existingReview) {
      throw createAppError('REVIEW_ERROR', 'You have already reviewed this event');
    }

    // Create the review
    const newReview = await Review.create({
      quote: reviewData.quote,
      rating: reviewData.rating,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.photo || '',
      event: reviewData.eventId,
      user: reviewData.userId,
      role: reviewData.role || 'Attendee',
      bgColor: reviewData.bgColor || '#F5F5F5'
    });

    revalidatePath(`/events/${reviewData.eventId}`);
    
    return JSON.parse(JSON.stringify(newReview));
  } catch (error) {
    console.error('Error creating review:', error);
    if (error && typeof error === 'object' && 'type' in error) {
      throw error; // Re-throw AppError
    }
    throw handleAppError(error);
  }
}

// Get reviews by event
export async function getReviewsByEvent({ eventId, limit = 6, page = 1 }: GetReviewsByEventParams) {
  try {
    await connectToDatabase();

    // Validate eventId
    if (!eventId) {
      throw createAppError('VALIDATION_ERROR', 'Event ID is required');
    }

    const skipAmount = (Number(page) - 1) * limit;
    
    const reviews = await Review.find({ event: eventId })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'user',
        model: User,
        select: '_id firstName lastName photo'
      })
      .populate({
        path: 'event',
        model: Event,
        select: '_id title'
      });

    const reviewsCount = await Review.countDocuments({ event: eventId });

    return {
      data: JSON.parse(JSON.stringify(reviews)),
      totalPages: Math.ceil(reviewsCount / limit)
    };
  } catch (error) {
    console.error('Error getting reviews by event:', error);
    if (error && typeof error === 'object' && 'type' in error) {
      throw error; // Re-throw AppError
    }
    throw handleAppError(error);
  }
}

// Get reviews by user
export async function getReviewsByUser({ userId, limit = 6, page = 1 }: GetReviewsByUserParams) {
  try {
    await connectToDatabase();

    // Validate userId
    if (!userId) {
      throw createAppError('VALIDATION_ERROR', 'User ID is required');
    }

    const skipAmount = (Number(page) - 1) * limit;
    
    const reviews = await Review.find({ user: userId })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
        select: '_id title'
      });

    const reviewsCount = await Review.countDocuments({ user: userId });

    return {
      data: JSON.parse(JSON.stringify(reviews)),
      totalPages: Math.ceil(reviewsCount / limit)
    };
  } catch (error) {
    console.error('Error getting reviews by user:', error);
    if (error && typeof error === 'object' && 'type' in error) {
      throw error; // Re-throw AppError
    }
    throw handleAppError(error);
  }
}

// Delete a review
export async function deleteReview(reviewId: string) {
  try {
    await connectToDatabase();

    // Validate reviewId
    if (!reviewId) {
      throw createAppError('VALIDATION_ERROR', 'Review ID is required');
    }

    const deletedReview = await Review.findById(reviewId);
    if (!deletedReview) {
      throw createAppError('NOT_FOUND', 'Review not found');
    }
    
    const eventId = deletedReview.event;
    
    await Review.findByIdAndDelete(reviewId);

    revalidatePath(`/events/${eventId}`);
    
    return JSON.parse(JSON.stringify(deletedReview));
  } catch (error) {
    console.error('Error deleting review:', error);
    if (error && typeof error === 'object' && 'type' in error) {
      throw error; // Re-throw AppError
    }
    throw handleAppError(error);
  }
}

// Handle next and previous reviews (for review carousel)
export async function handleNextReview(eventId: string, currentReviewId: string) {
  try {
    await connectToDatabase();
    
    // Validate inputs
    if (!eventId) {
      throw createAppError('VALIDATION_ERROR', 'Event ID is required');
    }
    
    if (!currentReviewId) {
      throw createAppError('VALIDATION_ERROR', 'Current review ID is required');
    }
    
    const currentReview = await Review.findById(currentReviewId);
    if (!currentReview) {
      throw createAppError('NOT_FOUND', 'Current review not found');
    }
    
    const nextReview = await Review.findOne({
      event: eventId,
      createdAt: { $lt: currentReview.createdAt }
    }).sort({ createdAt: -1 });
    
    if (!nextReview) {
      // If no next review, get the most recent one (cycle back to start)
      const firstReview = await Review.findOne({ event: eventId }).sort({ createdAt: -1 });
      if (!firstReview) {
        throw createAppError('NOT_FOUND', 'No reviews found for this event');
      }
      return JSON.parse(JSON.stringify(firstReview));
    }
    
    return JSON.parse(JSON.stringify(nextReview));
  } catch (error) {
    console.error('Error handling next review:', error);
    if (error && typeof error === 'object' && 'type' in error) {
      throw error; // Re-throw AppError
    }
    throw handleAppError(error);
  }
}

export async function handlePrevReview(eventId: string, currentReviewId: string) {
  try {
    await connectToDatabase();
    
    // Validate inputs
    if (!eventId) {
      throw createAppError('VALIDATION_ERROR', 'Event ID is required');
    }
    
    if (!currentReviewId) {
      throw createAppError('VALIDATION_ERROR', 'Current review ID is required');
    }
    
    const currentReview = await Review.findById(currentReviewId);
    if (!currentReview) {
      throw createAppError('NOT_FOUND', 'Current review not found');
    }
    
    const prevReview = await Review.findOne({
      event: eventId,
      createdAt: { $gt: currentReview.createdAt }
    }).sort({ createdAt: 1 });
    
    if (!prevReview) {
      // If no previous review, get the oldest one (cycle back to end)
      const lastReview = await Review.findOne({ event: eventId }).sort({ createdAt: 1 });
      if (!lastReview) {
        throw createAppError('NOT_FOUND', 'No reviews found for this event');
      }
      return JSON.parse(JSON.stringify(lastReview));
    }
    
    return JSON.parse(JSON.stringify(prevReview));
  } catch (error) {
    console.error('Error handling previous review:', error);
    if (error && typeof error === 'object' && 'type' in error) {
      throw error; // Re-throw AppError
    }
    throw handleAppError(error);
  }
}
