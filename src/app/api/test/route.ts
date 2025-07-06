import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    path: req.nextUrl.pathname
  });
}
