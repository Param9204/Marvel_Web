import connectDB from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const Visitor = require('@/backend/models/visitor');

    // Get visitors from last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const locationStats = await Visitor.aggregate([
      {
        $match: {
          timestamp: { $gte: last24h },
          country: { $ne: 'Unknown' },
        },
      },
      {
        $group: {
          _id: { country: '$country', city: '$city', flag: '$flag' },
          users: { $sum: 1 },
        },
      },
      {
        $sort: { users: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          country: '$_id.country',
          city: '$_id.city',
          flag: '$_id.flag',
          users: 1,
        },
      },
    ]);

    // Calculate total for percentages
    interface LocationStat {
        country: string;
        city: string;
        flag: string;
        users: number;
    }

    interface EnrichedLocationStat extends LocationStat {
        percentage: string | number;
    }

    const total: number = locationStats.reduce((sum: number, loc: LocationStat) => sum + loc.users, 0);
    interface EnrichedLocationStat extends LocationStat {
        percentage: string | number;
    }

    const enrichedData: EnrichedLocationStat[] = locationStats.map((loc: LocationStat): EnrichedLocationStat => ({
      ...loc,
      percentage: total > 0 ? ((loc.users / total) * 100).toFixed(1) : 0,
    }));

    return NextResponse.json(enrichedData);
  } catch (error: any) {
    console.error('❌ Error fetching location data:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const Visitor = require('@/backend/models/visitor');

    const body = await req.json();

    // Detect device type from user agent
    const userAgent = req.headers.get('user-agent') || '';
    let deviceType = 'Desktop';
    if (/mobile/i.test(userAgent)) deviceType = 'Mobile';
    if (/tablet|ipad/i.test(userAgent)) deviceType = 'Tablet';

    // Generate or get session ID
    const sessionId = body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const visitor = await Visitor.create({
      lat: body.lat || null,
      lng: body.lng || null,
      country: body.country || 'Unknown',
      city: body.city || 'Unknown',
      flag: body.flag || '🌍',
      deviceType,
      browser: body.browser || 'Unknown',
      page: body.page || '/',
      userAgent,
      sessionId,
      timestamp: new Date(body.timestamp || Date.now()),
    });

    return NextResponse.json({
      success: true,
      visitor,
    });
  } catch (error: any) {
    console.error('❌ Error saving visitor data:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
