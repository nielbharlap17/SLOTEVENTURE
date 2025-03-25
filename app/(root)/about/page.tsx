import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-20 text-white">
        <div className="wrapper text-center">
          <h1 className="text-5xl font-bold mb-6">About Slot Eventure</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transforming how events are planned, managed, and experienced.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Slot Eventure was born from a simple observation: event planning should be exciting, not exhausting. 
                Founded in 2023, we set out to create a platform that simplifies the entire event lifecycle.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small team of passionate event enthusiasts has grown into a comprehensive platform 
                serving thousands of event organizers and attendees across the country.
              </p>
              <p className="text-gray-700">
                Our mission is to empower event creators and provide unforgettable experiences for attendees.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <Image 
                src="/assets/images/story.jpeg" 
                alt="Our team" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="wrapper">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-600">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Event Creation</h3>
              <p className="text-gray-600 text-center">
                Intuitive tools to create and customize your events with ease. Set up ticketing, manage registrations, and promote your event all in one place.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Attendee Experience</h3>
              <p className="text-gray-600 text-center">
                Seamless registration, easy ticket access, and interactive features to enhance the attendee experience before, during, and after events.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Analytics & Insights</h3>
              <p className="text-gray-600 text-center">
                Powerful analytics to track event performance, attendee engagement, and ROI. Make data-driven decisions for your future events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="wrapper">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-600">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { name: 'Nimesh Jaiswal', role: 'Founder & CEO', image: '/assets/images/placeholder.png' },
              { name: 'Nilesh Bharati', role: 'Co-Founder', image: '/assets/images/placeholder.png' },
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="wrapper text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Next Event?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of event organizers who trust Slot Eventure for their event management needs.
          </p>
          <Button asChild size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
            <Link href="/events/create">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 