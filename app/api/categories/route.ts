import { NextRequest, NextResponse } from 'next/server';

const connectDB = require('@/backend/db');

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // Ensure model is registered
    const Category = require('@/backend/models/category');
    
    const categories = await Category.find();
    
    return NextResponse.json({
      success: true,
      categories: categories,
    });
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
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
        { status: 400 }
      );
    }

    const category = new Category({ name });
    await category.save();

    return NextResponse.json(
      { success: true, category },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Error adding category:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
