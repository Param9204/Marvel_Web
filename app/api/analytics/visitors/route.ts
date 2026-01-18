import connectDB from '@/backend/db';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Define the VisitorDocument interface globally
interface VisitorDocument extends mongoose.Document {
  lat: number | null;
  lng: number | null;
  country: string;
  city: string;
  flag: string;
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  page: string;
  userAgent: string | null;
  timestamp: Date;
  sessionId?: string;
}

// Define the Visitor model inline to avoid require() issues
const getVisitorModel = () => {
  if (mongoose.models.Visitor) {
    return mongoose.models.Visitor;
  }

  const visitorSchema = new mongoose.Schema<VisitorDocument>(
    {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
      country: { type: String, default: 'Unknown' },
      city: { type: String, default: 'Unknown' },
      flag: { type: String, default: '🌍' },
      deviceType: { type: String, enum: ['Desktop', 'Mobile', 'Tablet'], default: 'Desktop' },
      browser: { type: String, default: 'Unknown' },
      page: { type: String, default: '/' },
      userAgent: { type: String, default: null },
      timestamp: { type: Date, default: Date.now, index: true },
      sessionId: { type: String, index: true },
    },
    { timestamps: true }
  );

  return mongoose.model('Visitor', visitorSchema);
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const Visitor = getVisitorModel() as mongoose.Model<VisitorDocument>;

    // Get latest visitors from last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const visitors = await Visitor.find({
      timestamp: { $gte: last24h },
    })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    // If no visitors, return empty array
    if (!visitors || visitors.length === 0) {
      return NextResponse.json([]);
    }

    const formattedVisitors = visitors.map((visitor: any, idx: number) => ({
      id: visitor._id.toString(),
      location: `${visitor.city}, ${visitor.country}`,
      city: visitor.city,
      country: visitor.country,
      flag: visitor.flag,
      timestamp: visitor.timestamp,
      device: visitor.deviceType,
      browser: visitor.browser,
      page: visitor.page,
    }));

    return NextResponse.json(formattedVisitors);
  } catch (error: any) {
    console.error('❌ Error fetching visitors data:', error.message);
    console.error('Stack:', error.stack);
    // Return empty array instead of error
    return NextResponse.json([]);
  }
}
