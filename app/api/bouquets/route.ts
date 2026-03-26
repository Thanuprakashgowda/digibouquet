import { NextRequest, NextResponse } from 'next/server';
import { createBouquet } from '@/lib/db';
import { Occasion, CardStyle, SelectedFlower } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { occasion, title, flowers, message, style } = body as {
      occasion: Occasion;
      title?: string;
      flowers: SelectedFlower[];
      message: string;
      style: CardStyle;
    };

    if (!occasion || !flowers?.length || !message?.trim() || !style) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (flowers.length < 1 || flowers.length > 7) {
      return NextResponse.json(
        { error: 'Please select 1–7 flowers' },
        { status: 400 }
      );
    }

    const bouquet = await createBouquet({ 
      occasion, 
      title, 
      flowers, 
      message, 
      style,
      arrangement: body.arrangement,
      greenery: body.greenery,
    });

    const host = req.headers.get('host') ?? 'localhost:3000';
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const shareUrl = `${protocol}://${host}/b/${bouquet.id}`;

    return NextResponse.json({ id: bouquet.id, shareUrl }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
