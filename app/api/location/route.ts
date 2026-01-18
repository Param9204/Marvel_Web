import connectDB from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    console.log('🔵 Location API GET - Starting...');
    
    await connectDB();
    console.log('✅ DB Connected');
    
    const Visitor = require('@/backend/models/visitor');
    console.log('✅ Visitor model loaded');

    // Get visitors from last 7 days (expanded for better data)
    const last7days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    console.log('📊 Querying visitor data...');
    
    const locationStats = await Visitor.aggregate([
      {
        $match: {
          timestamp: { $gte: last7days },
          country: { $exists: true, $nin: ['Unknown', null, ''] },
        },
      },
      {
        $group: {
          _id: { 
            country: '$country', 
            city: '$city', 
            flag: '$flag' 
          },
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

    console.log(`✅ Found ${locationStats.length} location groups`);

    // If no data, return empty array (no static fallback)
    if (!locationStats || locationStats.length === 0) {
      console.log('⚠️ No location data found, returning empty array');
      return NextResponse.json([]);
    }

    // Calculate total for percentages
    const total = locationStats.reduce((sum: number, loc: { users: number }) => sum + (loc.users || 0), 0);

    interface LocationStat {
        country: string;
        city: string;
        flag: string;
        users: number;
        percentage: number;
    }

    const enrichedData: LocationStat[] = locationStats.map((loc: { country: string; city: string; flag: string; users: number }) => ({
        country: loc.country || 'Unknown',
        city: loc.city || 'Unknown',
        flag: loc.flag || '🌍',
        users: loc.users || 0,
        percentage: total > 0 ? parseFloat(((loc.users / total) * 100).toFixed(1)) : 0,
    }));

    console.log('✅ Returning enriched location data');
    return NextResponse.json(enrichedData);
  } catch (error: any) {
    console.error('❌ Error fetching location data:', error.message);
    console.error('Stack:', error.stack);
    // Return empty array instead of error to prevent 500
    return NextResponse.json([]);
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
