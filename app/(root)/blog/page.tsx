import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Hosting a Successful Virtual Event",
    excerpt: "Learn how to engage your audience and create memorable experiences in the digital space.",
    date: "March 15, 2024",
    author: "Priya Patel",
    category: "Virtual Events",
    image: "/assets/images/test.png",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Future of Event Technology in 2024",
    excerpt: "Discover the latest trends and innovations shaping the event industry this year.",
    date: "March 10, 2024",
    author: "Rahul Sharma",
    category: "Technology",
    image: "/assets/images/test-2.png",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "How to Choose the Perfect Venue for Your Corporate Event",
    excerpt: "A comprehensive guide to selecting venues that align with your event goals and budget.",
    date: "March 5, 2024",
    author: "Neha Singh",
    category: "Planning",
    image: "/assets/images/placeholder.png",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Sustainable Event Planning: Reducing Your Carbon Footprint",
    excerpt: "Practical strategies for organizing eco-friendly events without compromising on quality.",
    date: "February 28, 2024",
    author: "Amit Kumar",
    category: "Sustainability",
    image: "/assets/images/hero.png",
    readTime: "8 min read"
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern-dots"></div>
        </div>
        <div className="wrapper text-center relative z-10">
          <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">LATEST INSIGHTS</span>
          <h1 className="text-5xl font-bold mb-6">Slot Eventure Blog</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Expert tips, industry trends, and success stories to help you create unforgettable events.
          </p>
          {/* <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-white text-blue-700 hover:bg-blue-50">Event Planning</Button>
            <Button className="bg-white text-blue-700 hover:bg-blue-50">Technology</Button>
            <Button className="bg-white text-blue-700 hover:bg-blue-50">Marketing</Button>
            <Button className="bg-white text-blue-700 hover:bg-blue-50">Success Stories</Button>
          </div> */}
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="wrapper">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <Image 
                  src="/assets/images/test.png" 
                  alt="Featured post" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <span className="text-blue-600 font-semibold">FEATURED POST</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">How Event Technology is Transforming the Industry in 2024</h2>
              <p className="text-gray-600 mb-4">
                From AI-powered attendee matching to immersive virtual experiences, technology is revolutionizing how we plan, 
                execute, and experience events. Discover the key innovations that are setting new standards in the industry.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/assets/images/placeholder.png" 
                    alt="Author" 
                    width={40} 
                    height={40} 
                    className="rounded-full"
                  />
                  <span className="text-gray-700">By Rahul Sharma</span>
                </div>
                <span className="text-gray-500">March 20, 2024</span>
                <span className="text-gray-500">10 min read</span>
              </div>
              <div className="group relative inline-block">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg font-medium transition-all duration-300 transform group-hover:translate-y-[-2px] group-hover:shadow-lg flex items-center gap-2">
                  <Link href="/blog/featured">
                    Read Full Article
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="absolute -bottom-1 left-1/2 w-0 h-1 bg-yellow-400 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 bg-gray-50">
        <div className="wrapper">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-48 w-full">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{post.date}</span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="group relative inline-block">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg font-medium transition-all duration-300 transform group-hover:translate-y-[-2px] group-hover:shadow-lg flex items-center gap-2">
                <Link href="/blog/all">
                  <span className="relative">
                    View All Articles
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transform transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </Button>
              {/* <div className="absolute -right-2 -top-2 bg-yellow-400 text-xs font-bold text-gray-900 px-2 py-1 rounded-full opacity-0 transform scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                50+ Articles
              </div> */}
              <div className="absolute -left-1 -bottom-1 w-full h-full bg-indigo-700 rounded-lg -z-10 opacity-0 transform translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="wrapper text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Get the latest event planning tips, industry insights, and exclusive content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-lg flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage; 