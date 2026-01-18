import { NextRequest, NextResponse } from 'next/server';

const connectDB = require('@/backend/db');

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // Ensure models are registered in correct order
    const Category = require('@/backend/models/category');
    const Product = require('@/backend/models/product');
    
    const products = await Product.find()
      .populate('category')
      .sort({ createdAt: -1 });

    const formattedProducts = products.map((p: any) => ({
      _id: p._id,
      productName: p.productName,
      price: p.price,
      category: p.category,
      marvelCategory: p.marvelCategory,
      description: p.description,
      status: p.status,
      images: p.images.map((img: any) =>
        `data:${img.contentType};base64,${img.data.toString('base64')}`
      ),
      createdAt: p.createdAt,
    }));

    return NextResponse.json({
      success: true,
      products: formattedProducts,
    });
  } catch (error: any) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Ensure models are registered in correct order
    const Category = require('@/backend/models/category');
    const Product = require('@/backend/models/product');
    
    const formData = await req.formData();

    const productName = formData.get('productName') as string;
    const price = formData.get('price') as string;
    const category = formData.get('category') as string;
    const marvelCategory = formData.get('marvelCategory') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as string;

    if (!productName || !price || !category || !marvelCategory || !description) {
      return NextResponse.json(
        { success: false, message: 'All fields required' },
        { status: 400 }
      );
    }

    const images = [];
    const fileEntries = formData.getAll('images') as File[];
    for (const file of fileEntries) {
      const buffer = await file.arrayBuffer();
      images.push({
        data: Buffer.from(buffer),
        contentType: file.type,
      });
    }

    const product = new Product({
      productName,
      price: Number(price),
      category,
      marvelCategory,
      description,
      images,
      status: status || 'Active',
    });
    await product.save();
    
    // Populate category before returning
    await product.populate('category');

    return NextResponse.json(
      { success: true, product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Error adding product:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
