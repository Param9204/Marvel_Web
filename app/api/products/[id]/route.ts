import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/backend/db';
import Product from '@/backend/models/product';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById(params.id).populate('category');

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
      images: product.images.map((img: any) =>
        `data:${img.contentType};base64,${img.data.toString('base64')}`
      ),
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
    }).populate('category');

    return NextResponse.json({
      success: true,
      product,
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
