"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';

// Import the blog posts data from the all/page.tsx
// In a real application, you would fetch this data from an API or database
const allBlogPosts = [
  {
    id: 1,
    title: "10 Tips for Hosting a Successful Virtual Event",
    excerpt: "Learn how to engage your audience and create memorable experiences in the digital space.",
    date: "March 15, 2024",
    author: "Priya Patel",
    category: "Virtual Events",
    image: "/assets/images/test.png",
    readTime: "5 min read",
    content: `
      <p>Virtual events have become an essential part of the modern event landscape. Whether you're hosting a webinar, virtual conference, or online workshop, these tips will help you create an engaging and successful virtual event.</p>
      
      <h2>1. Choose the Right Platform</h2>
      <p>Select a virtual event platform that aligns with your event goals and audience needs. Consider factors like ease of use, interactive features, and technical support.</p>
      
      <h2>2. Plan Engaging Content</h2>
      <p>Create content that is specifically designed for a virtual audience. Keep sessions shorter than you would for in-person events and incorporate interactive elements throughout.</p>
      
      <h2>3. Provide Clear Instructions</h2>
      <p>Send detailed instructions to attendees before the event, including how to access the platform, technical requirements, and a schedule of activities.</p>
      
      <h2>4. Test Your Technology</h2>
      <p>Conduct thorough testing of all technical aspects before the event. This includes audio, video, internet connection, and any interactive features you plan to use.</p>
      
      <h2>5. Encourage Interaction</h2>
      <p>Use polls, Q&A sessions, chat features, and breakout rooms to keep attendees engaged and create opportunities for networking.</p>
      
      <h2>6. Train Your Speakers</h2>
      <p>Ensure all presenters are comfortable with the virtual platform and understand how to engage a remote audience effectively.</p>
      
      <h2>7. Create Networking Opportunities</h2>
      <p>Incorporate structured networking activities to help attendees connect with each other, such as virtual speed networking or themed discussion groups.</p>
      
      <h2>8. Provide Valuable Resources</h2>
      <p>Share relevant resources, such as presentation slides, additional reading materials, or recordings, that attendees can access during and after the event.</p>
      
      <h2>9. Gather Feedback</h2>
      <p>Collect feedback from attendees to understand what worked well and what could be improved for future virtual events.</p>
      
      <h2>10. Follow Up After the Event</h2>
      <p>Send a follow-up email thanking attendees for their participation, sharing any promised resources, and maintaining the connection for future events.</p>
    `
  },
  {
    id: 2,
    title: "The Future of Event Technology in 2024",
    excerpt: "Discover the latest trends and innovations shaping the event industry this year.",
    date: "March 10, 2024",
    author: "Rahul Sharma",
    category: "Technology",
    image: "/assets/images/test-2.png",
    readTime: "7 min read",
    content: `
      <p>Technology continues to revolutionize the event industry, creating new possibilities for engagement, data collection, and immersive experiences. Here are the key technology trends shaping events in 2024.</p>
      
      <h2>AI-Powered Event Planning</h2>
      <p>Artificial intelligence is streamlining event planning processes, from chatbots that handle attendee queries to AI tools that help match attendees for networking opportunities based on their interests and goals.</p>
      
      <h2>Hybrid Event Solutions</h2>
      <p>As events continue to bridge physical and digital experiences, technology that seamlessly connects in-person and virtual attendees is becoming increasingly sophisticated, offering equal engagement opportunities for all participants.</p>
      
      <h2>Augmented and Virtual Reality</h2>
      <p>AR and VR technologies are creating immersive experiences for attendees, from virtual venue tours to interactive product demonstrations that can be experienced from anywhere in the world.</p>
      
      <h2>Sustainable Event Tech</h2>
      <p>Technology solutions that help reduce the environmental impact of events are gaining traction, including digital badges, paperless check-in systems, and carbon footprint calculators.</p>
      
      <h2>Advanced Event Analytics</h2>
      <p>Data collection and analysis tools are providing event organizers with deeper insights into attendee behavior, preferences, and engagement levels, allowing for more personalized experiences and better ROI measurement.</p>
    `
  },
  {
    id: 3,
    title: "How to Choose the Perfect Venue for Your Corporate Event",
    excerpt: "A comprehensive guide to selecting venues that align with your event goals and budget.",
    date: "March 5, 2024",
    author: "Neha Singh",
    category: "Planning",
    image: "/assets/images/placeholder.png",
    readTime: "6 min read",
    content: `
      <p>Selecting the right venue is one of the most critical decisions when planning a corporate event. The venue sets the tone for your event and can significantly impact attendee experience and overall success.</p>
      
      <h2>Define Your Event Requirements</h2>
      <p>Before beginning your venue search, clearly define your event's purpose, expected attendance, budget, and specific requirements such as AV needs, catering options, and accessibility features.</p>
      
      <h2>Consider Location and Accessibility</h2>
      <p>Choose a location that is convenient for the majority of your attendees. Consider proximity to airports, hotels, public transportation, and parking availability.</p>
      
      <h2>Assess Capacity and Layout</h2>
      <p>Ensure the venue can comfortably accommodate your expected number of attendees and that the layout supports your event activities, whether you need theater-style seating, roundtables, or breakout rooms.</p>
      
      <h2>Evaluate Amenities and Services</h2>
      <p>Review what amenities and services are included in the venue rental, such as AV equipment, Wi-Fi, catering, furniture, and on-site staff support.</p>
      
      <h2>Visit Multiple Venues</h2>
      <p>Schedule site visits to your shortlisted venues to get a feel for the space, meet the staff, and visualize how your event will flow in the environment.</p>
      
      <h2>Review Contracts Carefully</h2>
      <p>Pay close attention to contract details, including cancellation policies, payment schedules, insurance requirements, and any restrictions or additional fees.</p>
    `
  },
  {
    id: 4,
    title: "Sustainable Event Planning: Reducing Your Carbon Footprint",
    excerpt: "Practical strategies for organizing eco-friendly events without compromising on quality.",
    date: "February 28, 2024",
    author: "Amit Kumar",
    category: "Sustainability",
    image: "/assets/images/hero.png",
    readTime: "8 min read",
    content: `
      <p>As environmental concerns continue to grow, event planners are increasingly focused on creating sustainable events that minimize negative environmental impacts while still delivering exceptional experiences.</p>
      
      <h2>Choose Eco-Friendly Venues</h2>
      <p>Select venues with strong sustainability practices, such as LEED certification, renewable energy usage, water conservation measures, and waste reduction programs.</p>
      
      <h2>Reduce Transportation Emissions</h2>
      <p>Minimize transportation-related emissions by choosing central locations, encouraging carpooling or public transportation, and offering virtual attendance options when possible.</p>
      
      <h2>Implement Waste Management Strategies</h2>
      <p>Develop comprehensive waste management plans that include recycling and composting stations, minimizing single-use items, and donating leftover materials or food.</p>
      
      <h2>Serve Sustainable Food and Beverages</h2>
      <p>Work with caterers who source local, seasonal, and organic ingredients, offer plant-based options, and use reusable or compostable serviceware.</p>
      
      <h2>Use Digital Alternatives</h2>
      <p>Replace printed materials with digital alternatives, such as event apps, digital signage, and electronic tickets, to reduce paper waste.</p>
      
      <h2>Measure and Offset Your Impact</h2>
      <p>Calculate your event's carbon footprint and invest in carbon offset projects to neutralize unavoidable emissions.</p>
    `
  },
  {
    id: 5,
    title: "Event Marketing Strategies That Actually Work",
    excerpt: "Proven tactics to boost attendance and create buzz around your next event.",
    date: "February 25, 2024",
    author: "Ananya Gupta",
    category: "Marketing",
    image: "/assets/images/test.png",
    readTime: "9 min read",
    content: `
      <p>Effective event marketing is essential for driving attendance and creating excitement around your event. These strategies have been proven to deliver results across various event types and industries.</p>
      
      <h2>Start Early and Build Momentum</h2>
      <p>Begin your marketing efforts well in advance of your event date, creating a timeline that builds anticipation and urgency as the event approaches.</p>
      
      <h2>Develop a Compelling Event Brand</h2>
      <p>Create a strong event brand with a memorable name, distinctive visual identity, and clear messaging that communicates the unique value of your event.</p>
      
      <h2>Leverage Email Marketing</h2>
      <p>Implement a strategic email campaign that nurtures potential attendees through the decision-making process, from awareness to registration to pre-event engagement.</p>
      
      <h2>Harness the Power of Social Media</h2>
      <p>Develop a comprehensive social media strategy that includes organic content, paid advertising, influencer partnerships, and user-generated content opportunities.</p>
      
      <h2>Create FOMO-Inducing Content</h2>
      <p>Share content that creates a fear of missing out, such as speaker announcements, exclusive networking opportunities, and unique experiences that will be available only to attendees.</p>
      
      <h2>Implement a Multi-Channel Approach</h2>
      <p>Diversify your marketing efforts across multiple channels, including email, social media, content marketing, PR, and partnerships, to reach your target audience wherever they are.</p>
    `
  },
  // Add content for the remaining blog posts as needed
];

const BlogPostPage = () => {
  const { id } = useParams();
  const postId = parseInt(id as string);
  
  // Find the blog post with the matching ID
  const post = allBlogPosts.find(post => post.id === postId);
  
  // If no matching post is found, display a message
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog/all">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Return to All Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
        <div className="wrapper text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-medium">
                {post.author.charAt(0)}
              </div>
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="wrapper">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-80 w-full">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-700 font-medium">Tags:</span>
                  <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                    Event Planning
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                    Tips
                  </span>
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-xl font-medium">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{post.author}</h3>
                    <p className="text-gray-600 mt-2">
                      Event planning expert with over 10 years of experience in organizing corporate and social events.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <Link href="/blog/all">
                    <Button variant="outline" className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Articles
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Articles */}
      <section className="py-12 bg-gray-100">
        <div className="wrapper">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allBlogPosts
              .filter(relatedPost => relatedPost.id !== post.id && relatedPost.category === post.category)
              .slice(0, 3)
              .map(relatedPost => (
                <div key={relatedPost.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {relatedPost.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">{relatedPost.date}</span>
                      <span className="text-gray-500 text-sm">{relatedPost.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
