import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { occasion, flowers } = await req.json();

    if (!occasion || !flowers || flowers.length === 0) {
      return NextResponse.json({ error: 'Missing occasion or flowers' }, { status: 400 });
    }

    if (!process.env.GOOGLE_GENERATION_API_KEY) {
      return NextResponse.json(
        { error: 'AI features require you to configure GOOGLE_GENERATION_API_KEY in your env variables.' },
        { status: 500 }
      );
    }

    const flowerNames = flowers.map((f: any) => f.name).join(', ');

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: `Write 3 different, short, warm, and heartfelt ${occasion} messages for a digital bouquet containing these flowers: ${flowerNames}. Each message should be separated by standard double newlines and no numbering. Keep them under 3 sentences each.`,
    });

    const suggestions = text
      .split('\n\n')
      .map((s) => s.trim().replace(/^[\d\.\-]+\s*/, '')) // remove list prefixes if any
      .filter((s) => s.length > 0)
      .slice(0, 3);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 });
  }
}
