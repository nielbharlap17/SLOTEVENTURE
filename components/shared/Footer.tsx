"use client";

import Image from "next/image"
import Link from "next/link"
import SponsorSlider from "./SponsorSlider";
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
    <footer className="bg-blue-900 text-white">
      {/* Sponsor Section */}
      <SponsorSlider />
      
      {/* Wave Divider */}
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>
      
      {/* Main Footer Content */}
      <div className="wrapper py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-start">
          <div className="bg-white p-4 rounded-lg mb-4">
            <Image 
              src="/assets/images/logo1.svg"
              alt="Slot Eventure logo"
              width={150}
              height={80}
              className="object-contain"
            />
          </div>
          <p className="text-sm mt-4">
            Sloteventure is your go-to platform for seamless event management and booking. 
            Join us to make your event planning effortless and engaging.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-2 mt-4">
            <Link href="https://instagram.com" className="bg-pink-500 p-2 rounded-full hover:opacity-80 transition-opacity">
              <Image src="/assets/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://twitter.com" className="bg-blue-400 p-2 rounded-full hover:opacity-80 transition-opacity">
              <Image src="/assets/icons/twitter.svg" alt="Twitter" width={24} height={24} />
            </Link>
            <Link href="https://whatsapp.com" className="bg-green-500 p-2 rounded-full hover:opacity-80 transition-opacity">
              <Image src="/assets/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
            </Link>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-blue-700 pb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
            {/* <li><Link href="/events" className="hover:text-blue-300 transition-colors">Events</Link></li> */}
            <li><Link href="/faq" className="hover:text-blue-300 transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
            <li><Link href="/newsletter" className="hover:text-blue-300 transition-colors">Newsletter</Link></li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-blue-700 pb-2">Contact Us</h3>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2">
              <Image src="/assets/icons/location.svg" alt="Location" width={20} height={20} className="mt-1" />
              <p>New India Chamber, 601, Off Mahakali Caves Rd, Andheri East, Mumbai, Maharashtra 400093</p>
            </li>
            <li className="flex items-center gap-2">
              <Image src="/assets/icons/phone.svg" alt="Phone" width={20} height={20} />
              <p>+91 8169065601</p>
            </li>
            <li className="flex items-center gap-2">
              <Image src="/assets/icons/email.svg" alt="Email" width={20} height={20} />
              <p>support@sloteventure.com</p>
            </li>
          </ul>
          
          {/* Map */}
          <div className="mt-4">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4981232322556!2d72.86679677513373!3d19.129740982088668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7903b7fd59b%3A0x8f34a85ea5f1d8b6!2sBindra%20Group!5e0!3m2!1sen!2sin!4v1708800000000!5m2!1sen!2sin" 
              width="100%" 
              height="200" 
              className="border-0 rounded-lg shadow-lg" 
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-blue-800 py-8">
        <div className="wrapper">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
              <p className="text-sm text-blue-200">Stay updated with our latest events, industry insights, and exclusive offers</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap">
                Subscribe Now
              </Button>
            </form>
          </div>
          {subscribed && (
            <p className="text-green-400 text-sm text-center mt-2">Thank you for subscribing!</p>
          )}
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-blue-950 py-4 text-center text-sm">
        <div className="wrapper">
          <p>© 2025 Sloteventure. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer