import { ImageResponse } from 'next/og';
import { getBouquet } from '@/lib/db';

export const alt = 'A digital bouquet';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Keep Next.js page params type matching Next 13+ standard for OG routes
export default async function Image({ params }: { params: { id: string } }) {
  const bouquet = await getBouquet(params.id);

  if (!bouquet) {
    return new ImageResponse(
      (
        <div style={{ fontSize: 64, background: '#fafaf9', color: '#a8a29e', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Bouquet not found - PocketPetals
        </div>
      ),
      { ...size }
    );
  }

  const emojis = bouquet.flowers.map((f) => f.emoji).join(' ');
  const title = bouquet.title || 'A custom bouquet for you';
  const message = bouquet.message.length > 100 ? bouquet.message.substring(0, 100) + '...' : bouquet.message;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #fff1f2, #ffe4e6)', // rose-50 to rose-100
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: '120px', marginBottom: '40px' }}>
          {emojis.length > 20 ? emojis.slice(0, 20) + '...' : emojis}
        </div>
        <h1 style={{ fontSize: '72px', color: '#44403c', marginBottom: '20px', fontFamily: 'serif', textAlign: 'center' }}>
          {title}
        </h1>
        <p style={{ fontSize: '36px', color: '#78716c', textAlign: 'center', maxWidth: '800px', lineHeight: 1.4 }}>
          "{message}"
        </p>
        <p style={{ fontSize: '28px', color: '#a8a29e', marginTop: 'auto', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Sent via PocketPetals
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
