import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import Newsletter from '@/lib/database/models/newsletter.model';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get request body
    const { name, email, preferences } = await req.json();
    
    // Validate request body
    if (!name || !email || !preferences) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if email already exists in newsletter subscribers
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      // Update existing subscriber preferences
      existingSubscriber.name = name;
      existingSubscriber.preferences = preferences;
      await existingSubscriber.save();
      
      return NextResponse.json(
        { 
          message: 'Your newsletter preferences have been updated',
          subscriber: existingSubscriber
        },
        { status: 200 }
      );
    }
    
    // Create new newsletter subscriber
    const newSubscriber = await Newsletter.create({
      name,
      email,
      preferences,
      subscribedAt: new Date()
    });
    
    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        subscriber: newSubscriber
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { message: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // This endpoint would be protected in a real app
    // For demo purposes, we'll allow access
    
    // Connect to the database
    await connectToDatabase();
    
    // Get total subscriber count
    const subscriberCount = await Newsletter.countDocuments();
    
    // Get preference statistics
    const stats = await Newsletter.aggregate([
      {
        $group: {
          _id: null,
          eventAlerts: { $sum: { $cond: ["$preferences.eventAlerts", 1, 0] } },
          monthlyCalendar: { $sum: { $cond: ["$preferences.monthlyCalendar", 1, 0] } },
          industryInsights: { $sum: { $cond: ["$preferences.industryInsights", 1, 0] } },
          exclusiveOffers: { $sum: { $cond: ["$preferences.exclusiveOffers", 1, 0] } }
        }
      }
    ]);
    
    return NextResponse.json(
      { 
        subscriberCount,
        preferenceStats: stats.length > 0 ? stats[0] : {
          eventAlerts: 0,
          monthlyCalendar: 0,
          industryInsights: 0,
          exclusiveOffers: 0
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error fetching newsletter stats:', error);
    return NextResponse.json(
      { message: 'Failed to fetch newsletter statistics' },
      { status: 500 }
    );
  }
} 