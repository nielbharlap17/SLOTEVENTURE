"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const NewsletterSubscription = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    eventAlerts: false,
    monthlyCalendar: false,
    industryInsights: false,
    exclusiveOffers: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleCheckboxChange = (preference: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name.trim()) {
      setSubmissionStatus({ type: 'error', message: 'Please enter your name' });
      toast.error('Please enter your name');
      return;
    }
    
    if (!email.trim()) {
      setSubmissionStatus({ type: 'error', message: 'Please enter your email address' });
      toast.error('Please enter your email address');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmissionStatus({ type: 'error', message: 'Please enter a valid email address' });
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Check if at least one preference is selected
    if (!Object.values(preferences).some(value => value)) {
      setSubmissionStatus({ type: 'error', message: 'Please select at least one newsletter preference' });
      toast.error('Please select at least one newsletter preference');
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionStatus(null);
    
    try {
      // Prepare subscription data
      const subscriptionData = {
        name: name.trim(),
        email: email.trim(),
        preferences
      };
      
      // Send data to API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe to newsletter');
      }
      
      // Show success message
      const successMessage = data.message || 'Thank you for subscribing to our newsletter!';
      setSubmissionStatus({ 
        type: 'success', 
        message: successMessage
      });
      toast.success(successMessage);
      
      // Reset form after success
      setTimeout(() => {
        setName('');
        setEmail('');
        setPreferences({
          eventAlerts: false,
          monthlyCalendar: false,
          industryInsights: false,
          exclusiveOffers: false
        });
        setSubmissionStatus(null);
      }, 3000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to subscribe. Please try again.';
      setSubmissionStatus({ 
        type: 'error', 
        message: errorMessage
      });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md border border-gray-100 p-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Join Our Newsletter</h2>
      <p className="text-gray-600 mb-6">Stay updated with the latest events, industry insights, and exclusive offers.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Newsletter Preferences
            </p>
            
            <div className="space-y-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center">
                <input
                  id="event-alerts"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={preferences.eventAlerts}
                  onChange={() => handleCheckboxChange('eventAlerts')}
                  disabled={isSubmitting}
                />
                <label htmlFor="event-alerts" className="ml-2 block text-sm text-gray-700">
                  Event Alerts
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="monthly-calendar"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={preferences.monthlyCalendar}
                  onChange={() => handleCheckboxChange('monthlyCalendar')}
                  disabled={isSubmitting}
                />
                <label htmlFor="monthly-calendar" className="ml-2 block text-sm text-gray-700">
                  Monthly Event Calendar
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="industry-insights"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={preferences.industryInsights}
                  onChange={() => handleCheckboxChange('industryInsights')}
                  disabled={isSubmitting}
                />
                <label htmlFor="industry-insights" className="ml-2 block text-sm text-gray-700">
                  Industry Insights
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="exclusive-offers"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={preferences.exclusiveOffers}
                  onChange={() => handleCheckboxChange('exclusiveOffers')}
                  disabled={isSubmitting}
                />
                <label htmlFor="exclusive-offers" className="ml-2 block text-sm text-gray-700">
                  Exclusive Offers
                </label>
              </div>
            </div>
          </div>
          
          {submissionStatus && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-4 rounded-lg ${
                submissionStatus.type === 'success' 
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
                  : 'bg-red-50 text-red-700 border-l-4 border-red-500'
              }`}
            >
              <div className="flex">
                {submissionStatus.type === 'success' ? (
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {submissionStatus.message}
              </div>
            </motion.div>
          )}
          
          <motion.button
            type="submit"
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md ${
              isSubmitting 
                ? 'bg-blue-400 text-white cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
            }`}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Subscribe Now
              </>
            )}
          </motion.button>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            We respect your privacy. You can unsubscribe at any time.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default NewsletterSubscription;