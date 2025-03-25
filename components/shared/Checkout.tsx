"use client"

import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

import { IEvent } from '@/lib/database/models/event.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';
import { ErrorDisplay } from './ErrorDisplay';
import { AppError, createAppError, handleAppError } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setSuccessMessage('Order placed successfully! You will receive an email confirmation.');
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setError(createAppError('PAYMENT_ERROR', 'Order was canceled.'));
      console.log('Order canceled -- continue to shop around and checkout when you\'re ready.');
    }
  }, []);

  const handleCheckoutClick = () => {
    setError(null);
    setShowConfirmation(true);
  };

  const cancelCheckout = () => {
    setShowConfirmation(false);
  };

  const onCheckout = async () => {
    setError(null);
    setIsSubmitting(true);
    setShowConfirmation(false);

    try {
      // Validate event data
      if (!event?._id || !event?.title) {
        throw createAppError('EVENT_ERROR', 'Invalid event data');
      }

      // Validate user is logged in
      if (!userId) {
        throw createAppError('AUTH_ERROR', 'You must be logged in to purchase tickets');
      }

      const order = {
        eventTitle: event?.title,
        eventId: event?._id,
        price: Number(event?.price || 0),
        isFree: event?.isFree || false,
        buyerId: userId
      }

      const response = await checkoutOrder(order);
      
      // If we have a URL from the response, redirect to it
      if (response?.url) {
        window.location.href = response.url;
      } else {
        throw createAppError('PAYMENT_ERROR', 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setError(handleAppError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      {error && (
        <ErrorDisplay 
          error={error} 
          onClose={() => setError(null)}
        />
      )}
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-green-800">{successMessage}</p>
          </div>
          <button 
            onClick={() => setSuccessMessage(null)} 
            className="ml-auto text-green-500 hover:text-green-700"
          >
            ×
          </button>
        </div>
      )}
      
      {showConfirmation ? (
        <div className="p-4 border border-gray-200 rounded-lg mb-4">
          <h3 className="font-semibold text-lg mb-2">Confirm Purchase</h3>
          <p className="mb-2">
            You are about to purchase a ticket for <span className="font-medium">{event?.title}</span>
          </p>
          <p className="mb-4">
            Price: <span className="font-medium">
              {event?.isFree 
                ? 'Free' 
                : formatPrice(String(event && event.price !== undefined ? Number(event.price) * 100 : 0))}
            </span>
          </p>
          <div className="flex space-x-3">
            <Button 
              onClick={onCheckout} 
              disabled={isSubmitting}
              className="bg-primary-500 hover:bg-primary-600"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Purchase'}
            </Button>
            <Button 
              onClick={cancelCheckout} 
              variant="outline"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          onClick={handleCheckoutClick} 
          size="lg" 
          className="button sm:w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : event?.isFree ? 'Get Ticket' : 'Buy Ticket'}
        </Button>
      )}
    </div>
  )
}

export default Checkout