import connectDB from '@/backend/db';
import Product from '@/backend/models/product';
import { NextRequest, NextResponse } from 'next/server';

interface ProductType {
  _id: string;
  productName: string;
  price: number;
  category: any;
  marvelCategory: string;
  description: string;
  features?: string[];
  status: string;
  images: { data: Buffer; contentType: string }[];
  createdAt: Date;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById(params.id).populate('category').setOptions({ includeImages: true }) as ProductType | null;

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    const imagesArray: string[] = [];
    
    if (product.images && product.images.length > 0) {
      product.images.forEach((img: any) => {
        try {
          let buffer: Buffer | null = null;
          
          if (Buffer.isBuffer(img.data)) {
            buffer = img.data;
          } else if (img.data instanceof Uint8Array) {
            buffer = Buffer.from(img.data);
          } else if (typeof img.data === 'object' && img.data.buffer) {
            buffer = Buffer.from(img.data.buffer);
          } else if (typeof img.data === 'string') {
            buffer = Buffer.from(img.data, 'base64');
          }
          
          if (buffer) {
            const contentType = img.contentType || 'image/jpeg';
            const base64 = buffer.toString('base64');
            imagesArray.push(`data:${contentType};base64,${base64}`);
          }
        } catch (err) {
          console.error('Error processing image:', err);
        }
      });
    }

    const formattedProduct = {
      _id: product._id,
      productName: product.productName,
      price: product.price,
      category: product.category,
      marvelCategory: product.marvelCategory,
      description: product.description,
      features: product.features,
      status: product.status,
      images: imagesArray,
      createdAt: product.createdAt,
    };

    return NextResponse.json({
      success: true,
      product: formattedProduct,
    });
  } catch (error: any) {
    console.error('❌ Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const formData = await req.formData();

    const productName = formData.get('productName') as string;
    const price = formData.get('price') as string;
    const category = formData.get('category') as string;
    const marvelCategory = formData.get('marvelCategory') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as string;

    const updateData: any = {
      productName,
      price: Number(price),
      category,
      marvelCategory,
      description,
      status: status || 'Active',
    };

    const fileEntries = formData.getAll('images') as File[];
    if (fileEntries.length > 0) {
      const images = [];
      for (const file of fileEntries) {
        const buffer = await file.arrayBuffer();
        images.push({
          data: Buffer.from(buffer),
          contentType: file.type,
        });
      }
      updateData.images = images;
    }

    const product = await Product.findByIdAndUpdate(params.id, updateData, {
      new: true,
      lean: true,
    }).populate('category') as ProductType | null;

    // Format product response with base64 encoded images
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    const formattedProduct = {
      _id: product._id,
      productName: product.productName,
      price: product.price,
      category: product.category,
      marvelCategory: product.marvelCategory,
      description: product.description,
      features: product.features,
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

    return NextResponse.json({
      success: true,
      product: formattedProduct,
    });
  } catch (error: any) {
    console.error('❌ Error updating product:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    console.error('❌ Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
