import { NextRequest, NextResponse } from 'next/server';
import { getBouquet } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bouquet = await getBouquet(id);
  if (!bouquet) {
    return NextResponse.json({ error: 'Bouquet not found' }, { status: 404 });
  }
  return NextResponse.json(bouquet);
}
