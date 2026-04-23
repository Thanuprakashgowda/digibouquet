import { notFound } from 'next/navigation';
import { getBouquet } from '@/lib/db';
import BouquetViewerClient from './BouquetViewerClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const bouquet = await getBouquet(id);
  if (!bouquet) return { title: 'Bouquet not found – PocketPetals' };
  return {
    title: `${bouquet.title || 'A bouquet for you'} – PocketPetals`,
    description: bouquet.message.slice(0, 120),
  };
}

export default async function BouquetPage({ params }: Props) {
  const { id } = await params;
  const bouquet = await getBouquet(id);

  if (!bouquet) {
    notFound();
  }

  return <BouquetViewerClient bouquet={bouquet} />;
}
