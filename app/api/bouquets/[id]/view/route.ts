import { NextRequest, NextResponse } from 'next/server';
import { incrementBouquetViews } from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const views = await incrementBouquetViews(id);
    return NextResponse.json({ views }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
