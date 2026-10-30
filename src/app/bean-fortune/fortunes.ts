export const FORTUNES: string[] = [
  'Today you will spill something. Embrace it.',
  'You are the bean everyone wishes they had in their chili.',
  'The coffee is strong today. So are you.',
  "Today's vibe: refried, but in a good way.",
  'Be like a bean: small, mighty, and full of fiber.',
  'Somewhere, a jelly bean believes in you.',
  'Hydrate. Caffeinate. Bean-ificate.',
  'A small bean today becomes a big burrito tomorrow.',
  'You are one bean closer to the weekend.',
  "Don't count your beans before they're counted.",
  'Your hot take will be lukewarm. Serve it anyway.',
  'Today you will crush it. Like garlic.',
  "A has-bean? Never. You're a will-bean.",
  'Life is full of beans. Some of them are jelly. Be the jelly.',
  "Today's forecast: 100% chance of being bean-tastic.",
  'You are simply un-bean-lievable.',
  'Bean kind to yourself today.',
  "Lima tell you something: you're doing great.",
  'You have the heart of a lion and the snack schedule of a raccoon.',
  'Stand tall like a green bean. Lean a little, also like a green bean.',
  "Somebody out there is very proud of you. It's this jar.",
  'Pinto-resting things are about to happen.',
  "Edamame? More like edama-YOU. You're great.",
  'Some beans are counted. You are cherished.',
  'Legume-endary things await you.',
  "You've bean selected for greatness. No take-backs.",
  "Go ahead, take the last cookie. The beans won't tell.",
  'Kidney you not, today is your day.',
  "You're the cool bean in a jar full of regular beans.",
  "You've got a whole lotta soy-ul.",
  "If at first you don't succeed, try, try a-bean.",
  'This fortune was hand-picked by a very small bean in a very small hat.',
  'Every bean you count is a tiny high five.',
  'Good things come in small, bean-shaped packages.',
  'You will find exactly the right number of beans today. That number is "enough."',
];

export const LUCKY_BEANS: string[] = [
  'Pinto', 'Black', 'Kidney', 'Navy', 'Garbanzo', 'Lima', 'Edamame',
  'Cannellini', 'Mung', 'Adzuki', 'Fava', 'Jelly', 'Coffee',
];

export interface Fortune {
  text: string;
  luckyBean: string;
  luckyNumber: number;
}

/** Small deterministic string hash (FNV-1a), so everyone sees the same fortune on the same day. */
export function hashString(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash;
}

export function dateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function dailyFortune(date: Date): Fortune {
  const hash = hashString(dateKey(date));
  return {
    text: FORTUNES[hash % FORTUNES.length],
    luckyBean: LUCKY_BEANS[(hash >>> 8) % LUCKY_BEANS.length],
    luckyNumber: ((hash >>> 16) % 99) + 1,
  };
}
