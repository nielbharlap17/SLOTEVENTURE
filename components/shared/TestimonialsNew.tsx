"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import TestimonialForm from './TestimonialForm';

// Fallback testimonials data
const fallbackTestimonials = [
  {
    id: 1,
    quote: "The platform is so intuitive and easy to use. I love how I can find and register for events in just a few clicks!",
    name: "Nimesh Jaiswal",
    role: "Community Member",
    avatar: "NJ",
    rating: 4,
    bgColor: "bg-indigo-600"
  },
  {
    id: 2,
    quote: "As an event organizer, this platform has made my life so much easier. The analytics and attendee management features are top-notch!",
    name: "Priya Sharma",
    role: "Event Organizer",
    avatar: "PS",
    rating: 5,
    bgColor: "bg-blue-600"
  },
  {
    id: 3,
    quote: "I've discovered so many amazing events in my area that I wouldn't have known about otherwise. The recommendation engine is spot on!",
    name: "Rahul Patel",
    role: "Regular Attendee",
    avatar: "RP",
    rating: 5,
    bgColor: "bg-purple-600"
  },
  {
    id: 4,
    quote: "The calendar feature is a game-changer for planning my schedule. I can see all upcoming events at a glance and never miss something important.",
    name: "Ananya Gupta",
    role: "Student",
    avatar: "AG",
    rating: 5,
    bgColor: "bg-green-600"
  },
  {
    id: 5,
    quote: "I appreciate how easy it is to connect with other attendees before and after events. It's helped me build my professional network tremendously.",
    name: "Vikram Mehta",
    role: "Networking Professional",
    avatar: "VM",
    rating: 4,
    bgColor: "bg-pink-600"
  },
  {
    id: 6,
    quote: "The ticketing system is seamless and secure. As someone who hosts paid workshops, this reliability is crucial for my business.",
    name: "Deepa Krishnan",
    role: "Workshop Host",
    avatar: "DK",
    rating: 5,
    bgColor: "bg-amber-600"
  }
];

// Background colors for avatars
const bgColors = [
  "bg-indigo-600", "bg-blue-600", "bg-purple-600", 
  "bg-green-600", "bg-pink-600", "bg-amber-600",
  "bg-red-600", "bg-cyan-600", "bg-emerald-600"
];

const TestimonialsNew = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSignedIn } = useUser();
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has created or purchased an event
  const [isEligible, setIsEligible] = useState(false);
  
  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        const data = await response.json();
        
        if (data.testimonials && data.testimonials.length > 0) {
          // Map API testimonials to the format we need
          const formattedTestimonials = data.testimonials.map((item: any, index: number) => ({
            id: item._id,
            quote: item.text,
            name: `${item.user.firstName} ${item.user.lastName}`,
            role: item.role,
            avatar: `${item.user.firstName[0]}${item.user.lastName[0]}`,
            rating: item.rating,
            bgColor: bgColors[index % bgColors.length]
          }));
          
          setTestimonials(formattedTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to sample data
        setTestimonials(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);
  
  // Check if user is eligible to submit testimonials
  useEffect(() => {
    // In a real app, you would check if the user has created or purchased an event
    // For demo purposes, we'll assume all signed-in users are eligible
    if (isSignedIn) {
      setIsEligible(true);
    }
  }, [isSignedIn]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && testimonials.length > 0) {
        handleNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating, testimonials.length]);

  const handlePrev = () => {
    if (isAnimating || testimonials.length === 0) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating || testimonials.length === 0) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex || testimonials.length === 0) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="wrapper">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="text-xl text-gray-600 mt-4">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-500"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-blue-500"></div>
        <div className="absolute -bottom-24 right-1/3 w-72 h-72 rounded-full bg-purple-500"></div>
      </div>
      
      <div className="wrapper relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 animate-fade-up">What Our Users Say</h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Don't just take our word for it. Here's what our community has to say about their experiences.
          </p>
        </div>
        
        {testimonials.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            {/* Large Quote Mark */}
            <div className="absolute -left-4 -top-20 text-indigo-100 opacity-50">
              <svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,75 C0,75 12.5,50 50,50 C50,25 37.5,0 0,0 L0,25 C25,25 25,50 25,50 C12.5,50 0,62.5 0,75 Z" fill="currentColor" transform="translate(25, 25)"/>
                <path d="M0,75 C0,75 12.5,50 50,50 C50,25 37.5,0 0,0 L0,25 C25,25 25,50 25,50 C12.5,50 0,62.5 0,75 Z" fill="currentColor" transform="translate(100, 25)"/>
              </svg>
            </div>
            
            {/* Testimonial Slider */}
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-white animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 p-8 md:p-12"
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-xl md:text-2xl text-gray-700 text-center italic mb-10 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="flex flex-col items-center mt-4">
                        <div className={`w-16 h-16 rounded-full ${testimonial.bgColor} text-white flex items-center justify-center text-xl font-bold mb-4 transform transition-transform hover:scale-110`}>
                          {testimonial.avatar}
                        </div>
                        
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        
                        <h3 className="text-xl font-bold text-indigo-600">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <button 
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-10 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-10 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-2 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-indigo-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Add Testimonial Button */}
            {isEligible && (
              <div className="text-center mt-10 animate-fade-up" style={{ animationDelay: '0.8s' }}>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Share Your Experience
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No testimonials yet. Be the first to share your experience!</p>
            
            {isEligible && (
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white mt-6"
              >
                Share Your Experience
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Testimonial Submission Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <div className="relative">
            {/* Close button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <TestimonialForm 
              onClose={() => setIsModalOpen(false)} 
              onSuccess={(newTestimonial) => {
                // Add the new testimonial to the list (will show as pending)
                setTestimonials(prev => [newTestimonial, ...prev]);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialsNew; 