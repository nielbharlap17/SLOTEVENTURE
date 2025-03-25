"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Extended blog posts data
const allBlogPosts = [
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
  {
    id: 5,
    title: "Event Marketing Strategies That Actually Work",
    excerpt: "Proven tactics to boost attendance and create buzz around your next event.",
    date: "February 25, 2024",
    author: "Ananya Gupta",
    category: "Marketing",
    image: "/assets/images/test.png",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "How to Create an Effective Event Budget",
    excerpt: "Step-by-step guide to planning and managing your event finances.",
    date: "February 20, 2024",
    author: "Vikram Mehta",
    category: "Planning",
    image: "/assets/images/test-2.png",
    readTime: "7 min read"
  },
  {
    id: 7,
    title: "Networking Events: Maximizing Connections and Opportunities",
    excerpt: "Strategies for creating meaningful networking experiences for attendees.",
    date: "February 15, 2024",
    author: "Riya Sharma",
    category: "Networking",
    image: "/assets/images/placeholder.png",
    readTime: "6 min read"
  },
  {
    id: 8,
    title: "The Psychology of Event Design: Creating Memorable Experiences",
    excerpt: "Understanding how environment and design influence attendee experiences.",
    date: "February 10, 2024",
    author: "Arjun Kapoor",
    category: "Design",
    image: "/assets/images/hero.png",
    readTime: "8 min read"
  },
  {
    id: 9,
    title: "Event Security: Best Practices for 2024",
    excerpt: "Essential security measures to keep your events and attendees safe.",
    date: "February 5, 2024",
    author: "Rajiv Singh",
    category: "Security",
    image: "/assets/images/test.png",
    readTime: "10 min read"
  },
  {
    id: 10,
    title: "Hybrid Events: Bridging Physical and Digital Experiences",
    excerpt: "How to create seamless experiences for both in-person and virtual attendees.",
    date: "January 30, 2024",
    author: "Meera Patel",
    category: "Hybrid Events",
    image: "/assets/images/test-2.png",
    readTime: "9 min read"
  },
  {
    id: 11,
    title: "Event Sponsorship: Creating Win-Win Partnerships",
    excerpt: "Strategies for securing and maintaining valuable sponsor relationships.",
    date: "January 25, 2024",
    author: "Aditya Sharma",
    category: "Sponsorship",
    image: "/assets/images/placeholder.png",
    readTime: "7 min read"
  },
  {
    id: 12,
    title: "Accessibility in Events: Making Your Event Inclusive for All",
    excerpt: "Essential considerations for creating events that everyone can enjoy.",
    date: "January 20, 2024",
    author: "Pooja Verma",
    category: "Accessibility",
    image: "/assets/images/hero.png",
    readTime: "8 min read"
  },
];

// Categories for filtering
const categories = [
  "All",
  "Virtual Events",
  "Technology",
  "Planning",
  "Sustainability",
  "Marketing",
  "Networking",
  "Design",
  "Security",
  "Hybrid Events",
  "Sponsorship",
  "Accessibility"
];

const AllArticlesPage = () => {
  // State for filtering, sorting, and searching
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(allBlogPosts);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Show 6 posts per page

  // Apply filters, sorting, and search whenever dependencies change
  useEffect(() => {
    let result = [...allBlogPosts];
    
    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      if (sortOption === "newest") {
        // Convert dates to timestamp for comparison (assuming date format is "Month DD, YYYY")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortOption === "popular") {
        // For demo purposes, we'll use readTime as a proxy for popularity
        // In a real app, you might have view counts or other metrics
        return parseInt(b.readTime) - parseInt(a.readTime);
      }
      return 0;
    });
    
    setFilteredPosts(result);
  }, [selectedCategory, sortOption, searchQuery]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the page when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination values
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
        <div className="wrapper text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Articles</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our complete collection of event planning insights, tips, and industry trends.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="wrapper">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Filter by:</span>
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="wrapper">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No articles found matching your criteria</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search query</p>
              <Button 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setSelectedCategory("All");
                  setSortOption("newest");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-gray-700 text-sm">{post.author}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">{post.date}</span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination - only show if we have filtered posts and more than one page */}
          {filteredPosts.length > 0 && totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 rounded-md border border-gray-300"
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </Button>
                
                {pageNumbers.map(number => {
                  // Show first page, last page, current page, and pages around current page
                  if (
                    number === 1 || 
                    number === totalPages || 
                    (number >= currentPage - 1 && number <= currentPage + 1)
                  ) {
                    return (
                      <Button 
                        key={number}
                        variant="outline" 
                        size="sm" 
                        className={`h-9 w-9 rounded-md ${
                          currentPage === number 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border border-gray-300'
                        }`}
                        onClick={() => handlePageChange(number)}
                      >
                        {number}
                      </Button>
                    );
                  } else if (
                    (number === currentPage - 2 && currentPage > 3) || 
                    (number === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    // Show ellipsis for skipped pages
                    return <span key={number} className="mx-1">...</span>;
                  }
                  return null;
                })}
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 rounded-md border border-gray-300"
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="sr-only">Next</span>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="wrapper">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Latest Articles</h2>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter and never miss out on the latest event planning tips, trends, and insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-3 rounded-lg flex-grow text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 relative h-48 md:h-64 w-full">
                <Image 
                  src="/assets/images/placeholder.png" 
                  alt="Newsletter" 
                  fill 
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllArticlesPage; 