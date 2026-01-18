import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Visitor tracking removed - using Location model only
  return NextResponse.json([]);
}

