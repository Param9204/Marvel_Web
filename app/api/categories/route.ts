import { NextRequest, NextResponse } from 'next/server';

const connectDB = require('@/backend/db');

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    console.log('🔵 GET /api/categories - Starting...');
    
    await connectDB();
    console.log('✅ DB Connected');
    
    // Ensure model is registered
    const Category = require('@/backend/models/category');
    
    console.log('📦 Fetching categories...');
    const categories = await Category.find();
    
    console.log(`✅ Found ${categories.length} categories`);
    
    return NextResponse.json({
      success: true,
      categories: categories,
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error.message);
    console.error('Stack:', error.stack);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error', error: error.toString() },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Ensure model is registered
    const Category = require('@/backend/models/category');
    
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const category = new Category({ name });
    await category.save();

    return NextResponse.json(
      { success: true, category },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error adding category:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
