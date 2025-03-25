"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';

interface TestimonialFormProps {
  onClose: () => void;
  onSuccess: (testimonial: any) => void;
}

const TestimonialForm = ({ onClose, onSuccess }: TestimonialFormProps) => {
  const [testimonialText, setTestimonialText] = useState('');
  const [userRole, setUserRole] = useState('');
  const [rating, setRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonialStats, setTestimonialStats] = useState({
    totalTestimonials: 0,
    approvedTestimonials: 0,
    totalDollarsGenerated: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const { isSignedIn, user } = useUser();

  // Background colors for avatars
  const bgColors = [
    "bg-indigo-600", "bg-blue-600", "bg-purple-600", 
    "bg-green-600", "bg-pink-600", "bg-amber-600",
    "bg-red-600", "bg-cyan-600", "bg-emerald-600"
  ];

  // Fetch testimonial statistics when component mounts
  useEffect(() => {
    const fetchTestimonialStats = async () => {
      try {
        const response = await fetch('/api/testimonials/statistics');
        if (response.ok) {
          const data = await response.json();
          setTestimonialStats({
            totalTestimonials: data.statistics.totalTestimonials,
            approvedTestimonials: data.statistics.approvedTestimonials,
            totalDollarsGenerated: data.statistics.totalDollarsGenerated || 0
          });
        }
      } catch (error) {
        console.error('Error fetching testimonial statistics:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchTestimonialStats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!testimonialText.trim()) {
      setSubmissionStatus('Please enter your testimonial');
      return;
    }
    
    if (!userRole.trim()) {
      setSubmissionStatus('Please enter your role');
      return;
    }
    
    if (rating === 0) {
      setSubmissionStatus('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionStatus('');

    try {
      // Prepare testimonial data
      const testimonialData = {
        testimonialText: testimonialText.trim(),
        userRole: userRole.trim(),
        rating
      };
      
      // Send testimonial to API
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit testimonial');
      }
      
      // Create a new testimonial object for the UI
      const newTestimonial = {
        id: data.testimonial._id || Date.now(),
        quote: testimonialText,
        name: user ? `${user.firstName} ${user.lastName}` : 'Anonymous User',
        role: userRole,
        avatar: user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : 'AU',
        rating,
        bgColor: bgColors[Math.floor(Math.random() * bgColors.length)],
        isPending: true
      };
      
      // Update local testimonial count
      setTestimonialStats(prev => ({
        ...prev,
        totalTestimonials: prev.totalTestimonials + 1,
        totalDollarsGenerated: prev.totalDollarsGenerated + 5 // $5 per testimonial
      }));
      
      // Show success message
      setSubmissionStatus('Thank you for your testimonial! It will be reviewed and published soon.');
      
      // Reset form after delay
      setTimeout(() => {
        setTestimonialText('');
        setUserRole('');
        setRating(0);
        setSubmissionStatus('');
        
        // Call the success callback with the new testimonial
        onSuccess(newTestimonial);
        onClose();
      }, 3000);
    } catch (error) {
      setSubmissionStatus(error instanceof Error ? error.message : 'Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          Share Your Experience
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <p className="text-gray-600 mb-2 italic">
        Tell us about your experience with our platform. Your feedback helps us improve and inspires others.
      </p>
      
      {/* Testimonial counter */}
      <div className="mb-6 text-sm text-gray-500 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        {isLoadingStats ? (
          <span>Loading testimonial stats...</span>
        ) : (
          <span>
            Join <span className="font-semibold text-indigo-600">{testimonialStats.totalTestimonials}</span> others who have shared their experience!
            {testimonialStats.approvedTestimonials > 0 && (
              <span className="ml-1">
                (<span className="font-semibold text-green-600">{testimonialStats.approvedTestimonials}</span> published)
              </span>
            )}
          </span>
        )}
      </div>
      
      {/* Dollars generated counter */}
      {!isLoadingStats && testimonialStats.totalDollarsGenerated > 0 && (
        <div className="mb-6 text-sm text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
          <span>
            Users have contributed <span className="font-semibold text-green-600">${testimonialStats.totalDollarsGenerated}</span> through testimonials!
          </span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-indigo-600 transition-colors">
            Your Testimonial
          </label>
          <textarea
            id="testimonial"
            placeholder="Share your thoughts about our platform..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] transition-all shadow-sm hover:shadow-md"
            value={testimonialText}
            onChange={(e) => setTestimonialText(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="group">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-indigo-600 transition-colors">
            Your Role
          </label>
          <input
            id="role"
            type="text"
            placeholder="e.g., Event Organizer, Attendee, Student..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none p-1"
                disabled={isSubmitting}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  } transition-colors`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating === 0 ? 'Select your rating' : `${rating} star${rating !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>
        
        {submissionStatus && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-4 rounded-lg ${
              submissionStatus.includes('Thank you') 
                ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
                : 'bg-red-50 text-red-700 border-l-4 border-red-500'
            }`}
          >
            <div className="flex">
              {submissionStatus.includes('Thank you') ? (
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {submissionStatus}
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            className={`px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md ${
              isSubmitting 
                ? 'bg-indigo-400 text-white cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600'
            }`}
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Submit Testimonial'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;