export type ArrangementId = 'circle' | 'fan' | 'cascade' | 'bunch' | 'diamond';
export type GreeneryId    = 'soft' | 'lush' | 'minimal' | 'tropical' | 'none';

export type Occasion =
  | 'birthday'
  | 'love'
  | 'apology'
  | 'congratulations'
  | 'sympathy'
  | 'friendship'
  | 'gratitude'
  | 'general';

export interface Flower {
  code: string;
  name: string;
  emoji: string;
  color: string;       // tailwind bg color class or hex
  meaning: string;
  bestForOccasions: Occasion[];
}

export interface SelectedFlower {
  code: string;
  name: string;
  emoji: string;
  color: string;
  meaning: string;
}

export type CardStyle = {
  id: string;
  label: string;
  bg: string;          // tailwind gradient/bg class
  accent: string;      // tailwind text colour
};

export interface Bouquet {
  id: string;
  occasion: Occasion;
  title?: string;
  flowers: SelectedFlower[];
  message: string;
  recipient?: string;
  style: CardStyle;
  arrangement?: ArrangementId;
  greenery?: GreeneryId;
  views: number;
  createdAt: string;
}
