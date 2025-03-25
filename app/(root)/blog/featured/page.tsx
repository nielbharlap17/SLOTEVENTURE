import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FeaturedBlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[500px] w-full">
          <Image 
            src="/assets/images/test.png" 
            alt="Featured post hero" 
            fill 
            className="object-cover brightness-[0.7]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
            <div className="max-w-4xl mx-auto">
              <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">TECHNOLOGY</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">How Event Technology is Transforming the Industry in 2024</h1>
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/assets/images/placeholder.png" 
                    alt="Author" 
                    width={40} 
                    height={40} 
                    className="rounded-full border-2 border-white"
                  />
                  <span>By Rahul Sharma</span>
                </div>
                <span>March 20, 2024</span>
                <span>10 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="wrapper">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl font-medium text-gray-700 mb-8 leading-relaxed">
                From AI-powered attendee matching to immersive virtual experiences, technology is revolutionizing how we plan, 
                execute, and experience events. Discover the key innovations that are setting new standards in the industry.
              </p>

              <div className="my-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Key Takeaways</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>AI-powered attendee matching increases networking effectiveness by 78%</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Virtual and hybrid events are projected to grow by 35% in 2024</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Sustainable event tech can reduce carbon footprint by up to 25%</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-4">The Rise of AI in Event Planning</h2>
              <p>
                Artificial Intelligence is no longer just a buzzword in the event industry—it's becoming an essential tool for planners and organizers. 
                From chatbots that handle attendee inquiries to sophisticated algorithms that match attendees based on interests and goals, 
                AI is streamlining processes and enhancing experiences.
              </p>
              <p>
                One of the most significant applications is in attendee matching. By analyzing registration data, session attendance, 
                and even social media profiles, AI can suggest meaningful connections that might otherwise be missed in a sea of attendees. 
                This technology has shown to increase networking effectiveness by up to 78% at large-scale events.
              </p>

              <div className="my-8 relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src="/assets/images/test-2.png" 
                  alt="AI in event planning" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <p className="text-sm font-medium">AI-powered networking at TechConnect 2023 resulted in 45% more business connections</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-4">Immersive Experiences Through XR Technology</h2>
              <p>
                Extended Reality (XR)—which encompasses Virtual Reality (VR), Augmented Reality (AR), and Mixed Reality (MR)—is 
                transforming how attendees experience events. Whether it's a virtual trade show floor that can be explored from anywhere 
                in the world or AR overlays that provide additional information about physical exhibits, XR is breaking down the 
                limitations of traditional event formats.
              </p>
              <p>
                In 2023, we saw a 42% increase in the use of XR technologies at major conferences and exhibitions. This trend is expected 
                to accelerate in 2024, with more accessible hardware and increasingly sophisticated software solutions making implementation 
                more feasible for events of all sizes.
              </p>

              <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Virtual Reality</h3>
                  <p>Enables fully immersive digital environments, allowing remote attendees to feel present at the event</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Augmented Reality</h3>
                  <p>Overlays digital information onto the physical world, enhancing in-person experiences with additional context</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-4">Sustainable Event Technology</h2>
              <p>
                As sustainability becomes a priority for both organizers and attendees, technology is playing a crucial role in reducing 
                the environmental impact of events. Digital badges and ticketing, virtual participation options, and smart venue systems 
                that optimize energy usage are just a few examples of how technology is making events greener.
              </p>
              <p>
                Studies show that implementing comprehensive sustainable event technology can reduce an event's carbon footprint by up to 25%. 
                This not only benefits the environment but also resonates with the growing segment of environmentally conscious attendees.
              </p>

              <div className="my-8 p-6 bg-green-50 border-l-4 border-green-600 rounded-r-lg">
                <h3 className="text-xl font-bold text-green-800 mb-2">Sustainability Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-green-600 h-4 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="ml-4 font-medium">75% Paper reduction</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-green-600 h-4 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="ml-4 font-medium">60% Travel emissions saved</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-green-600 h-4 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="ml-4 font-medium">40% Energy consumption reduced</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-4">The Future: What's Next?</h2>
              <p>
                Looking ahead, we can expect to see even more integration of emerging technologies in the event space. Blockchain for 
                secure ticketing and credential verification, advanced biometrics for seamless check-in experiences, and increasingly 
                sophisticated data analytics for real-time event optimization are all on the horizon.
              </p>
              <p>
                The most successful event professionals will be those who can strategically implement these technologies to enhance the 
                human elements of events—connection, learning, and inspiration—rather than allowing technology to become a distraction.
              </p>

              <div className="my-10 border-t border-b border-gray-200 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1">About the Author</h3>
                    <div className="flex items-center gap-3">
                      <Image 
                        src="/assets/images/placeholder.png" 
                        alt="Rahul Sharma" 
                        width={60} 
                        height={60} 
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">Rahul Sharma</p>
                        <p className="text-sm text-gray-600">Technology Editor, Event Innovation Magazine</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href="#" className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-100 p-6 rounded-lg">
                <div>
                  <h3 className="text-xl font-bold mb-2">Share this article</h3>
                  <p className="text-gray-600">Help spread the knowledge with your network</p>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-[#1DA1F2] hover:bg-[#1a91da]">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    Twitter
                  </Button>
                  <Button className="bg-[#4267B2] hover:bg-[#365899]">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                    Facebook
                  </Button>
                  <Button className="bg-[#0077B5] hover:bg-[#006699]">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-10">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image 
                      src="/assets/images/test.png" 
                      alt="Related article" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors">
                      <Link href="/blog/1">10 Tips for Hosting a Successful Virtual Event</Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">Learn how to engage your audience and create memorable experiences in the digital space.</p>
                    <span className="text-gray-500 text-xs">March 15, 2024</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image 
                      src="/assets/images/placeholder.png" 
                      alt="Related article" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors">
                      <Link href="/blog/3">How to Choose the Perfect Venue for Your Corporate Event</Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">A comprehensive guide to selecting venues that align with your event goals and budget.</p>
                    <span className="text-gray-500 text-xs">March 5, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-blue-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-700 mb-6">
                Get the latest event planning tips, industry insights, and exclusive content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-lg flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedBlogPage; 