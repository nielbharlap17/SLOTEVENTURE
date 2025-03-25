import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 font-sans shadow-lg">
      <div className="wrapper flex items-center justify-between px-8 py-6">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/assets/images/logo.svg" 
            width={170} 
            height={50}
            alt="SlotEventure Logo" 
            className="transition-transform duration-300 hover:scale-110"
          />
        </Link>

        {/* Desktop Navigation */}
        <SignedIn>
          <nav className="hidden md:flex gap-6 items-center text-xl font-semibold">
            <Button asChild className="border-1 border-gray-800 px-6 py-3 text-xl font-bold bg-transparent text-blue-950 hover:bg-gray-800 hover:text-white transition-all shadow-lg">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild className="border-1 border-gray-800 px-6 py-3 text-xl font-bold bg-transparent text-blue-950 hover:bg-gray-800 hover:text-white transition-all shadow-lg">
              <Link href="/profile">Profile</Link>
            </Button>
            <Button asChild className="border-1 border-gray-800 px-6 py-3 text-xl font-bold bg-transparent text-blue-950 hover:bg-gray-800 hover:text-white transition-all shadow-lg">
              <Link href="/events/create">Create Event</Link>
            </Button>
            <Button asChild className="border-1 border-gray-800 px-6 py-3 text-xl font-bold bg-transparent text-blue-950 hover:bg-gray-800 hover:text-white transition-all shadow-lg">
              <Link href="/about">About Us</Link>
            </Button>
            <Button asChild className="border-1 border-gray-800 px-6 py-3 text-xl font-bold bg-transparent text-blue-950 hover:bg-gray-800 hover:text-white transition-all shadow-lg">
              <Link href="/blog">Blog</Link>
            </Button>
            <Button asChild className="border-1 border-gray-800 px-6 py-3 text-xl font-bold bg-transparent text-blue-950 hover:bg-gray-800 hover:text-white transition-all shadow-lg">
              <Link href="/faq">FAQ</Link>
            </Button>
          </nav>
        </SignedIn>

        {/* Right Section: Authentication & Mobile Menu */}
        <div className="flex items-center gap-6">
          <SignedIn>
            {/* Bigger My Account Button */}
            <div className="scale-125">
              <UserButton afterSignOutUrl="/" />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </SignedIn>

          <SignedOut>
            {/* Login and Sign Up Buttons */}
            <div className="flex items-center gap-3">
              <Button asChild className="border-2 border-indigo-600 px-6 py-3 text-xl font-bold bg-transparent text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-lg">
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild className="border-2 border-indigo-600 px-6 py-3 text-xl font-bold bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 transition-all shadow-lg">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
