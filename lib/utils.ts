import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

import { UrlQueryParams, RemoveUrlQueryParams } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateString: string | Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: string) => {
  // Convert from cents to dollars (Stripe stores amounts in cents)
  const amount = parseFloat(price) / 100
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

// Enhanced error handling with specific error types
export type ErrorType = 
  | 'AUTH_ERROR'
  | 'EVENT_ERROR'
  | 'PAYMENT_ERROR'
  | 'BOOKING_ERROR'
  | 'REVIEW_ERROR'
  | 'SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND';

export interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
}

export const createAppError = (type: ErrorType, message: string, details?: any): AppError => {
  return { type, message, details };
};

export const handleAppError = (error: unknown): AppError => {
  console.error('Application error:', error);
  
  // Handle known error types
  if (typeof error === 'object' && error !== null && 'type' in error && 'message' in error) {
    return error as AppError;
  }
  
  // Handle Stripe errors
  if (typeof error === 'object' && error !== null && 'type' in error && error.type === 'StripeError') {
    return createAppError('PAYMENT_ERROR', 'Payment processing failed', error);
  }
  
  // Handle MongoDB errors
  if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'MongoError') {
    return createAppError('SERVER_ERROR', 'Database operation failed', error);
  }
  
  // Handle validation errors
  if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'ValidationError') {
    return createAppError('VALIDATION_ERROR', 'Invalid data provided', error);
  }
  
  // Handle authentication errors
  if (typeof error === 'object' && error !== null && 'name' in error && 
      (error.name === 'AuthenticationError' || error.name === 'ClerkError')) {
    return createAppError('AUTH_ERROR', 'Authentication failed', error);
  }
  
  // Default to server error
  const errorMessage = typeof error === 'string' 
    ? error 
    : error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred';
  
  return createAppError('SERVER_ERROR', errorMessage, error);
};

// User-friendly error messages
export const getErrorMessage = (error: AppError): string => {
  switch (error.type) {
    case 'AUTH_ERROR':
      return 'Authentication failed. Please sign in and try again.';
    case 'EVENT_ERROR':
      return 'There was a problem with the event. Please try again later.';
    case 'PAYMENT_ERROR':
      return 'Payment processing failed. Please check your payment details and try again.';
    case 'BOOKING_ERROR':
      return 'Unable to complete booking. Please try again later.';
    case 'REVIEW_ERROR':
      return 'Unable to process review. Please try again later.';
    case 'VALIDATION_ERROR':
      return 'Please check your information and try again.';
    case 'NOT_FOUND':
      return 'The requested resource was not found.';
    case 'SERVER_ERROR':
    default:
      return 'Something went wrong. Please try again later.';
  }
};

// Format date to a readable format
export const formatDate = (dateString: string | Date): string => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};