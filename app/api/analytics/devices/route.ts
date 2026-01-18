import connectDB from '@/backend/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const Visitor = require('@/backend/models/visitor');

    // Get device data from last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const deviceStats = await Visitor.aggregate([
      {
        $match: {
          timestamp: { $gte: last24h },
        },
      },
      {
        $group: {
          _id: '$deviceType',
          users: { $sum: 1 },
        },
      },
      {
        $sort: { users: -1 },
      },
    ]);

    // Map to include percentage and colors
    const colors: Record<string, string> = {
      Desktop: '#ef4444',
      Mobile: '#f59e0b',
      Tablet: '#10b981',
    };

    interface DeviceStat {
        _id: string | null;
        users: number;
    }

    interface EnrichedDeviceData {
        device: string;
        users: number;
        percentage: number;
        color: string;
    }

    const total: number = deviceStats.reduce((sum: number, stat: DeviceStat) => sum + stat.users, 0);
    const enrichedData: EnrichedDeviceData[] = deviceStats.map((stat: DeviceStat): EnrichedDeviceData => ({
      device: stat._id || 'Unknown',
      users: stat.users,
      percentage: total > 0 ? Math.round((stat.users / total) * 100) : 0,
      color: colors[stat._id || ''] || '#6b7280',
    }));

    return NextResponse.json(enrichedData);
  } catch (error: any) {
    console.error('❌ Error fetching device data:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
