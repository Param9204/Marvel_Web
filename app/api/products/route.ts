import { NextRequest, NextResponse } from 'next/server';

const connectDB = require('@/backend/db');

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    console.log('🔵 GET /api/products - Starting...');
    
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    await connectDB();
    console.log('✅ DB Connected');
    
    // Ensure models are registered in correct order
    const Category = require('@/backend/models/category');
    const Product = require('@/backend/models/product');
    
    console.log(`📦 Fetching products (page: ${page}, limit: ${limit})...`);
    
    // Don't use .lean() when we need to process Buffer data
    const products = await Product.find()
      .populate({ path: 'category', model: Category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Product.countDocuments();

    console.log(`✅ Found ${products.length} products (Total: ${total})`);
    
    const formattedProducts = products.map((p: any) => {
      console.log(`Processing product: ${p.productName}, images count: ${p.images?.length || 0}`);
      
      return {
        _id: p._id,
        productName: p.productName,
        price: p.price,
        category: p.category,
        marvelCategory: p.marvelCategory,
        description: p.description,
        status: p.status,
        createdAt: p.createdAt,
        images: (p.images || []).map((img: any) => {
          try {
            // Handle both Buffer objects and objects with data property
            let buffer = img.data;
            if (!buffer) {
              console.warn('No data in image object');
              return null;
            }
            
            // Check if it's a Buffer
            if (Buffer.isBuffer(buffer)) {
              return `data:${img.contentType || 'image/jpeg'};base64,${buffer.toString('base64')}`;
            }
            
            // Check if it has a buffer property
            if (buffer.buffer) {
              return `data:${img.contentType || 'image/jpeg'};base64,${Buffer.from(buffer.buffer).toString('base64')}`;
            }
            
            console.warn('Unexpected image data format:', typeof buffer);
            return null;
          } catch (err: any) {
            console.error('Error processing image:', err.message);
            return null;
          }
        }).filter((img: any) => img !== null),
      };
    });

    return NextResponse.json({
      success: true,
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('❌ Error fetching products:', error.message);
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
    
    // Populate category before returning (explicit model to use Category)
    await product.populate({ path: 'category', model: Category });

    // Format response with base64 images
    const formattedProduct = {
      _id: product._id,
      productName: product.productName,
      price: product.price,
      category: product.category,
      marvelCategory: product.marvelCategory,
      description: product.description,
      status: product.status,
      images: product.images?.map((img: any) => {
        if (img.data && img.data.buffer) {
          return `data:${img.contentType};base64,${Buffer.from(img.data.buffer).toString('base64')}`;
        } else if (img.data) {
          return `data:${img.contentType};base64,${img.data.toString('base64')}`;
        }
        return null;
      }).filter((img: any) => img !== null) || [],
      createdAt: product.createdAt,
    };

    return NextResponse.json(
      { success: true, product: formattedProduct },
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