"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Send data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Message sent successfully! We will get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper my-8">
      <h1 className="h1-bold mb-6">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            Have questions or need assistance? We're here to help! Fill out the form and our team will get back to you as soon as possible.
          </p>
          
          <div className="space-y-4 mt-8">
            <div>
              <h3 className="font-bold">Email</h3>
              <p>support@sloteventure.com</p>
            </div>
            
            <div>
              <h3 className="font-bold">Phone</h3>
              <p>+1 (123) 456-7890</p>
            </div>
            
            <div>
              <h3 className="font-bold">Address</h3>
              <p>New India Chamber, <br />Off Mahakali Caves Rd,<br />Andheri East, Mumbai, Maharashtra 400093</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block font-medium mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block font-medium mb-1">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <Button 
              type="submit" 
              className={`w-full bg-blue-500 hover:bg-blue-600 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;