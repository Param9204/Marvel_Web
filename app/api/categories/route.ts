import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/db';
import Category from '@/backend/models/category';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const categories = await Category.find();
    
    return NextResponse.json({
      success: true,
      categories: categories,
    });
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { categoryName } = await req.json();

    if (!categoryName) {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
        { status: 400 }
      );
    }

    const category = new Category({ categoryName });
    await category.save();

    return NextResponse.json(
      { success: true, category },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Error adding category:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
