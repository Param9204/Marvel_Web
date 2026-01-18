import connectDB from '@/backend/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).json({});
  }

  try {
    await connectDB();
    const Location = require('@/backend/models/location');

    if (req.method === 'GET') {
      const last7days = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const locationStats = await Location.aggregate([
        { $match: { timestamp: { $gte: last7days } } },
        {
          $group: {
            _id: { country: '$country', city: '$city', flag: '$flag' },
            users: { $sum: 1 },
          },
        },
        { $sort: { users: -1 } },
        { $limit: 10 },
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

      const total = locationStats.reduce((sum: number, loc: any) => sum + (loc.users || 0), 0);
      const enriched = locationStats.map((loc: any) => ({
        country: loc.country || 'Unknown',
        city: loc.city || 'Unknown',
        flag: loc.flag || '🌍',
        users: loc.users || 0,
        percentage: total > 0 ? parseFloat(((loc.users / total) * 100).toFixed(1)) : 0,
      }));

      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).json(enriched);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const locationData = {
        lat: body.lat ?? null,
        lng: body.lng ?? null,
        country: body.country || 'Unknown',
        city: body.city || 'Unknown',
        flag: body.flag || '🌍',
        timestamp: body.timestamp || Date.now(),
      };
      const location = await Location.create(locationData);
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).json({ success: true, location: { id: location._id, country: location.country, city: location.city } });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('Location API error (pages/api):', error?.message || error);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ success: false, message: error?.message || 'Internal Server Error' });
  }
}
