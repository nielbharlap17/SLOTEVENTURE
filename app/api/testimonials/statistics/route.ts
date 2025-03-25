import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Statistics from '@/lib/database/models/statistics.model';

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get statistics
    let statistics = await Statistics.findOne();
    
    // If no statistics document exists yet, create one with default values
    if (!statistics) {
      statistics = await Statistics.create({
        totalTestimonials: 0,
        approvedTestimonials: 0,
        pendingTestimonials: 0,
        rejectedTestimonials: 0,
        totalDollarsGenerated: 0,
        lastUpdated: new Date()
      });
    }
    
    return NextResponse.json(
      { statistics },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error fetching testimonial statistics:', error);
    return NextResponse.json(
      { message: 'Failed to fetch testimonial statistics' },
      { status: 500 }
    );
  }
}
