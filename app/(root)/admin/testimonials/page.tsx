"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Check, X, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Testimonial = {
  _id: string;
  text: string;
  role: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
};

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isSignedIn) {
        router.push('/sign-in');
        return;
      }

      // In a real app, you would check if the user is an admin
      // For demo purposes, we'll use a simple check based on email
      // You should implement proper role-based access control
      if (user?.primaryEmailAddress?.emailAddress) {
        const email = user.primaryEmailAddress.emailAddress;
        // Check if email is admin (this is just for demo)
        setIsAdmin(email.includes('admin') || email.endsWith('@evently.com'));
      }

      if (!isAdmin) {
        router.push('/');
      }
    };

    checkAdmin();
  }, [isSignedIn, user, router, isAdmin]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }

        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        setError('Failed to load testimonials');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchTestimonials();
    }
  }, [isAdmin]);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/admin/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve testimonial');
      }

      // Update local state
      setTestimonials(prev => 
        prev.map(testimonial => 
          testimonial._id === id 
            ? { ...testimonial, status: 'approved' } 
            : testimonial
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/admin/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject testimonial');
      }

      // Update local state
      setTestimonials(prev => 
        prev.map(testimonial => 
          testimonial._id === id 
            ? { ...testimonial, status: 'rejected' } 
            : testimonial
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAdmin) {
    return <div className="wrapper my-8">Redirecting...</div>;
  }

  if (loading) {
    return <div className="wrapper my-8">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="wrapper my-8 text-red-500">{error}</div>;
  }

  return (
    <div className="wrapper my-8">
      <h1 className="text-3xl font-bold mb-8">Manage Testimonials</h1>
      
      <div className="space-y-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Pending Testimonials</h2>
        </div>
        
        {testimonials.filter(t => t.status === 'pending').length === 0 && (
          <p className="text-gray-500 italic">No pending testimonials</p>
        )}
        
        {testimonials
          .filter(t => t.status === 'pending')
          .map(testimonial => (
            <div 
              key={testimonial._id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-medium">
                    {testimonial.user.firstName} {testimonial.user.lastName}
                  </p>
                  <p className="text-gray-600">{testimonial.role}</p>
                  
                  <div className="flex mt-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleApprove(testimonial._id)}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(testimonial._id)}
                    variant="destructive"
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
              
              <p className="mt-3 text-gray-700">"{testimonial.text}"</p>
              
              <p className="text-sm text-gray-500 mt-4">
                Submitted on {new Date(testimonial.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
      
      <div className="mt-12 space-y-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Approved Testimonials</h2>
        </div>
        
        {testimonials.filter(t => t.status === 'approved').length === 0 && (
          <p className="text-gray-500 italic">No approved testimonials</p>
        )}
        
        {testimonials
          .filter(t => t.status === 'approved')
          .map(testimonial => (
            <div 
              key={testimonial._id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-medium">
                    {testimonial.user.firstName} {testimonial.user.lastName}
                  </p>
                  <p className="text-gray-600">{testimonial.role}</p>
                  
                  <div className="flex mt-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleReject(testimonial._id)}
                    variant="outline"
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </div>
              </div>
              
              <p className="mt-3 text-gray-700">"{testimonial.text}"</p>
              
              <p className="text-sm text-gray-500 mt-4">
                Submitted on {new Date(testimonial.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TestimonialsAdmin; 