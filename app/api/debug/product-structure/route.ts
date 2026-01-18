import { NextRequest, NextResponse } from 'next/server';

const connectDB = require('@/backend/db');

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const Product = require('@/backend/models/product');
    
    // Get first product and check its structure
    const product = await Product.findOne().exec();
    
    if (!product) {
      return NextResponse.json({
        success: false,
        message: 'No products in database',
      });
    }
    
    const debug = {
      productName: product.productName,
      hasImages: !!product.images,
      imagesCount: product.images ? product.images.length : 0,
      firstImageStructure: product.images && product.images[0] ? {
        keys: Object.keys(product.images[0]),
        dataType: product.images[0].data ? typeof product.images[0].data : 'undefined',
        isBuffer: Buffer.isBuffer(product.images[0].data),
        contentType: product.images[0].contentType,
        dataLength: product.images[0].data ? product.images[0].data.length : 0,
      } : null,
    };
    
    return NextResponse.json({
      success: true,
      debug,
      productId: product._id,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
