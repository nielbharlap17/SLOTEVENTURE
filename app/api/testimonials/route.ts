import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDatabase } from '@/lib/database';
import Testimonial from '@/lib/database/models/testimonial.model';
import User from '@/lib/database/models/user.model';
import Order from '@/lib/database/models/order.model';
import Event from '@/lib/database/models/event.model';
import Statistics from '@/lib/database/models/statistics.model';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();
    
    // Get request body
    const { testimonialText, userRole, rating } = await req.json();
    
    // Validate request body
    if (!testimonialText || !userRole || !rating) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get user from database
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if user has created events or purchased tickets
    const hasCreatedEvents = await Event.exists({ organizer: user._id });
    const hasPurchasedTickets = await Order.exists({ buyer: user._id });
    
    // Only allow users who have created events or purchased tickets to submit testimonials
    if (!hasCreatedEvents && !hasPurchasedTickets) {
      return NextResponse.json(
        { message: 'You must create an event or purchase a ticket to submit a testimonial' },
        { status: 403 }
      );
    }
    
    // Create new testimonial
    const newTestimonial = await Testimonial.create({
      user: user._id,
      text: testimonialText,
      role: userRole,
      rating,
      status: 'pending', // Testimonials need approval before being displayed
    });
    
    // Dollar value per testimonial
    const dollarsPerTestimonial = 5;
    
    // Update statistics - increment total and pending testimonials count
    await Statistics.findOneAndUpdate(
      {}, // Find the first document (we'll only have one statistics document)
      { 
        $inc: { 
          totalTestimonials: 1,
          pendingTestimonials: 1,
          totalDollarsGenerated: dollarsPerTestimonial
        },
        lastUpdated: new Date()
      },
      { upsert: true, new: true } // Create if doesn't exist, return updated document
    );
    
    return NextResponse.json(
      { 
        message: 'Testimonial submitted successfully',
        testimonial: newTestimonial 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return NextResponse.json(
      { message: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get approved testimonials
    const testimonials = await Testimonial.find({ status: 'approved' })
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(10);
    
    return NextResponse.json(
      { testimonials },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}