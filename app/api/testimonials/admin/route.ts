import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDatabase } from '@/lib/database';
import Testimonial from '@/lib/database/models/testimonial.model';
import User from '@/lib/database/models/user.model';

// Helper function to check if user is admin
const isUserAdmin = async (userId: string) => {
  try {
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) return false;
    
    // In a real app, you would check user roles in the database
    // For demo purposes, we'll use a simple check based on email
    // You should implement proper role-based access control
    const clerk = await auth();
    const email = clerk.sessionClaims?.email as string;
    
    return email?.includes('admin') || email?.endsWith('@evently.com');
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const admin = await isUserAdmin(userId);
    
    if (!admin) {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      );
    }

    // Connect to the database
    await connectToDatabase();
    
    // Get all testimonials
    const testimonials = await Testimonial.find()
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 });
    
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