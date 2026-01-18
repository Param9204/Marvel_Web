import connectDB from '@/backend/db';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const Visitor = require('@/backend/models/visitor');

    // Get latest visitors from last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const visitors = await Visitor.find({
      timestamp: { $gte: last24h },
    })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

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
    console.error('❌ Error fetching visitors data:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

import { NextRequest } from 'next/server';
