import connectDB from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};



export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    console.log('🔵 Location API GET - Starting...');
    
    await connectDB();
    console.log('✅ DB Connected');
    
    const Location = require('@/backend/models/location');
    console.log('✅ Location model loaded');

    // Get locations from last 7 days
    const last7days = Date.now() - 7 * 24 * 60 * 60 * 1000;
    
    console.log('📊 Querying location data...');
    
    const locationStats = await Location.aggregate([
      {
        $match: {
          timestamp: { $gte: last7days },
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

    // If no data, return empty array
    if (!locationStats || locationStats.length === 0) {
      console.log('⚠️ No location data found, returning empty array');
      return NextResponse.json([], { headers: corsHeaders });
    }

    // Calculate total for percentages
    const total = locationStats.reduce((sum: number, loc: any) => sum + (loc.users || 0), 0);

    const enrichedData = locationStats.map((loc: any) => ({
      country: loc.country || 'Unknown',
      city: loc.city || 'Unknown',
      flag: loc.flag || '🌍',
      users: loc.users || 0,
      percentage: total > 0 ? parseFloat(((loc.users / total) * 100).toFixed(1)) : 0,
    }));

    console.log('✅ Returning enriched location data:', enrichedData);
    return NextResponse.json(enrichedData, { headers: corsHeaders });
  } catch (error: any) {
    console.error('❌ Error fetching location data:', error.message);
    console.error('Stack:', error.stack);
    return NextResponse.json([], { headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Location API POST - Receiving location data...');
    
    await connectDB();
    console.log('✅ DB Connected');
    
    const Location = require('@/backend/models/location');
    console.log('✅ Location model loaded');

    const body = await req.json();
    console.log('📦 Received data:', { 
      country: body.country, 
      city: body.city
    });

    const locationData = {
      lat: body.lat || null,
      lng: body.lng || null,
      country: body.country || 'Unknown',
      city: body.city || 'Unknown',
      flag: body.flag || '🌍',
      timestamp: body.timestamp || Date.now(),
    };

    console.log('💾 Saving location:', locationData);
    const location = await Location.create(locationData);
    console.log('✅ Location saved successfully:', location._id);

    return NextResponse.json({
      success: true,
      location: {
        id: location._id,
        country: location.country,
        city: location.city,
      },
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('❌ Error saving visitor data:', error.message);
    console.error('Stack:', error.stack);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

