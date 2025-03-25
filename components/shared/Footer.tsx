"use client";

import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your API
    console.log("Subscribed with email:", email);
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail("");
  };

  return (
    <footer className="text-white">
      {/* Wave Divider - Improved with smoother transition */}
      <div className="w-full bg-gradient-to-b from-blue-300 to-blue-700 h-24 relative overflow-hidden">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 left-0 w-full"
        >
          <path 
            fill="#1e40af" 
            fillOpacity="1" 
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      {/* Main Footer Content - Now with gradient background */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-800">
        <div className="wrapper py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <div className="bg-white p-4 rounded-lg mb-4 shadow-lg transform transition-transform hover:scale-105 duration-300">
              <Image 
                src="/assets/images/logo1.svg"
                alt="Slot Eventure logo"
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
            <p className="text-sm mt-4 text-blue-100">
              Sloteventure is your go-to platform for seamless event management and booking. 
              Join us to make your event planning effortless and engaging.
            </p>
            
            {/* Social Media Icons - Enhanced with better hover effects */}
            <div className="flex gap-3 mt-4">
              <Link href="https://instagram.com" className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300">
                <Image src="/assets/icons/instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="https://twitter.com" className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300">
                <Image src="/assets/icons/twitter.svg" alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="https://whatsapp.com" className="bg-gradient-to-br from-green-500 to-green-700 p-2 rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300">
                <Image src="/assets/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
              </Link>
            </div>
          </div>
          
          {/* Quick Links - Enhanced with better hover effects */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-blue-500 pb-2 text-blue-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-300"></span>
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section - Enhanced with better visual styling */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-blue-500 pb-2 text-blue-100">Location</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-2 group">
                <div className="mt-1 bg-blue-600 p-1 rounded-full group-hover:bg-blue-500 transition-colors">
                  <Image src="/assets/icons/location.svg" alt="Location" width={16} height={16} className="mt-0" />
                </div>
                <p className="text-blue-200">New India Chamber, 601, Off Mahakali Caves Rd, Andheri East, Mumbai, Maharashtra 400093</p>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="bg-blue-600 p-1 rounded-full group-hover:bg-blue-500 transition-colors">
                  <Image src="/assets/icons/phone.svg" alt="Phone" width={16} height={16} />
                </div>
                <p className="text-blue-200">+91 8169065601</p>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="bg-blue-600 p-1 rounded-full group-hover:bg-blue-500 transition-colors">
                  <Image src="/assets/icons/email.svg" alt="Email" width={16} height={16} />
                </div>
                <p className="text-blue-200">support@sloteventure.com</p>
              </li>
            </ul>
            
            {/* Map - Enhanced with better styling */}
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] duration-300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4981232322556!2d72.86679677513373!3d19.129740982088668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7903b7fd59b%3A0x8f34a85ea5f1d8b6!2sBindra%20Group!5e0!3m2!1sen!2sin!4v1708800000000!5m2!1sen!2sin" 
                width="100%" 
                height="200" 
                className="border-0" 
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter - Enhanced with gradient background */}
      <div className="bg-gradient-to-b from-blue-800 to-blue-900 py-8">
        <div className="wrapper">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-blue-950/50 p-6 rounded-xl">
            <div>
              <h3 className="text-xl font-bold text-white">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-blue-200">Stay updated with our latest events, industry insights, and exclusive offers</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/90 text-black focus:bg-white transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 whitespace-nowrap transition-all duration-300"
              >
                Subscribe Now
              </Button>
            </form>
          </div>
          {subscribed && (
            <div className="flex justify-center mt-4">
              <div className="bg-green-500/20 text-green-300 text-sm py-2 px-4 rounded-full flex items-center gap-2 animate-pulse">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Thank you for subscribing!</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Copyright - Enhanced with subtle gradient */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 py-4 text-center text-sm">
        <div className="wrapper">
          <p className="text-blue-200">&copy; 2025 Sloteventure. All rights reserved. Made with &hearts; in India</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer