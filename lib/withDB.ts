import connectDB from "@/backend/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Database middleware for Next.js API routes
 * Automatically connects to MongoDB before handling the request
 * 
 * Usage:
 * export const GET = withDB(async (req) => {
 *   // Your handler code here
 * });
 */
export function withDB(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: any) => {
    try {
      await connectDB();
      return await handler(req, context);
    } catch (error: any) {
      console.error("❌ Database connection error:", error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message || "Database connection failed" 
        },
        { status: 500 }
      );
    }
  };
}
