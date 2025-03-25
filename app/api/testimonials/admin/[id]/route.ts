import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { connectToDatabase } from '@/lib/database';
import Testimonial from '@/lib/database/models/testimonial.model';
import User from '@/lib/database/models/user.model';
import Statistics from '@/lib/database/models/statistics.model';

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Get request body
    const { status } = await req.json();
    
    // Validate status
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }
    
    // Get the current testimonial to check its previous status
    const currentTestimonial = await Testimonial.findById(params.id);
    
    if (!currentTestimonial) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    const previousStatus = currentTestimonial.status;
    
    // Update testimonial
    const testimonial = await Testimonial.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );
    
    // Update statistics based on status change
    const statsUpdate: any = {
      lastUpdated: new Date()
    };
    
    // Initialize the increment object
    statsUpdate.$inc = {};
    
    // Decrement the count for previous status
    if (previousStatus === 'pending') {
      statsUpdate.$inc.pendingTestimonials = -1;
    } else if (previousStatus === 'approved') {
      statsUpdate.$inc.approvedTestimonials = -1;
    } else if (previousStatus === 'rejected') {
      statsUpdate.$inc.rejectedTestimonials = -1;
    }
    
    // Increment the count for new status
    if (status === 'approved') {
      statsUpdate.$inc.approvedTestimonials = (statsUpdate.$inc.approvedTestimonials || 0) + 1;
    } else if (status === 'rejected') {
      statsUpdate.$inc.rejectedTestimonials = (statsUpdate.$inc.rejectedTestimonials || 0) + 1;
    }
    
    // Update statistics
    await Statistics.findOneAndUpdate(
      {}, // Find the first document
      statsUpdate,
      { upsert: true, new: true }
    );
    
    return NextResponse.json(
      { 
        message: `Testimonial ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
        testimonial 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { message: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}