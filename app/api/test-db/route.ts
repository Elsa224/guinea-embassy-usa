import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    console.log('Test DB API - DATABASE_URL present:', !!process.env.DATABASE_URL);
    
    const userCount = await db.user.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      hasDbUrl: !!process.env.DATABASE_URL
    });
  } catch (error: any) {
    console.error('Test DB API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      hasDbUrl: !!process.env.DATABASE_URL
    }, { status: 500 });
  }
}