// Product image mappings
// Each product gets a unique hero shot plus themed detail shots.
import weddingInvitations from '@/assets/wedding-invitations.jpg';
import corporateStationery from '@/assets/corporate-stationery.jpg';
import luxuryPlanner from '@/assets/luxury-planner.jpg';
import festivalCards from '@/assets/festival-cards.jpg';
import babyCards from '@/assets/baby-cards.jpg';
import diwaliHampers from '@/assets/diwali-hampers.jpg';
import weddingHampers from '@/assets/wedding-hampers.jpg';
import executiveAwards from '@/assets/executive-awards.jpg';
import holiHampers from '@/assets/holi-hampers.jpg';
import newyearCorporate from '@/assets/newyear-corporate.jpg';
import palaceWeddingDecor from '@/assets/palace-wedding-decor.jpg';
import bollywoodParty from '@/assets/bollywood-party.jpg';
import corporateCeremony from '@/assets/corporate-ceremony.jpg';
import diwaliDecoration from '@/assets/diwali-decoration.jpg';
import babyshowerGarden from '@/assets/babyshower-garden.jpg';
import governmentEvent from '@/assets/government-event.jpg';
import productLaunch from '@/assets/product-launch.jpg';
import corporateGiftingProgram from '@/assets/corporate-gifting-program.jpg';
import tradeShow from '@/assets/trade-show.jpg';
import employeeRecognition from '@/assets/employee-recognition.jpg';

// Unique hero shots per product
const productHeroes = import.meta.glob('../assets/products/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const heroById: Record<string, string> = Object.fromEntries(
  Object.entries(productHeroes).map(([path, url]) => [
    path.split('/').pop()!.replace('.jpg', ''),
    url,
  ])
);

// Themed detail shots (gallery/<theme>-b.jpg ... <theme>-f.jpg)
const galleryShots = import.meta.glob('../assets/gallery/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const detailsByTheme: Record<string, string[]> = {};
Object.entries(galleryShots)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([path, url]) => {
    const name = path.split('/').pop()!.replace('.jpg', '');
    const theme = name.replace(/-[a-z]$/, '');
    (detailsByTheme[theme] ??= []).push(url);
  });

const baseByTheme = {
  weddingInvitations,
  corporateStationery,
  luxuryPlanner,
  festivalCards,
  babyCards,
  diwaliHampers,
  weddingHampers,
  executiveAwards,
  holiHampers,
  newyearCorporate,
  palaceWeddingDecor,
  bollywoodParty,
  corporateCeremony,
  diwaliDecoration,
  babyshowerGarden,
  governmentEvent,
  productLaunch,
  corporateGiftingProgram,
  tradeShow,
  employeeRecognition,
};

type ThemeKey = keyof typeof baseByTheme;

const range = (prefix: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `${prefix}-${String(from + i).padStart(3, '0')}`);

const productThemes: Record<string, ThemeKey> = {
  'stat-001': 'weddingInvitations',
  'stat-002': 'corporateStationery',
  'stat-003': 'luxuryPlanner',
  'stat-004': 'festivalCards',
  'stat-005': 'babyCards',
  ...Object.fromEntries(range('stat', 6, 14).map((id) => [id, 'bollywoodParty' as ThemeKey])),
  ...Object.fromEntries(range('stat', 15, 24).map((id) => [id, 'weddingInvitations' as ThemeKey])),
  ...Object.fromEntries(range('stat', 25, 27).map((id) => [id, 'bollywoodParty' as ThemeKey])),
  ...Object.fromEntries(range('stat', 28, 35).map((id) => [id, 'weddingInvitations' as ThemeKey])),
  'stat-036': 'babyCards',
  'stat-037': 'babyCards',
  ...Object.fromEntries(range('stat', 38, 40).map((id) => [id, 'weddingInvitations' as ThemeKey])),
  ...Object.fromEntries(range('stat', 41, 43).map((id) => [id, 'employeeRecognition' as ThemeKey])),
  'stat-044': 'weddingInvitations',
  'stat-045': 'weddingInvitations',
  'gift-001': 'diwaliHampers',
  'gift-002': 'weddingHampers',
  'gift-003': 'executiveAwards',
  'gift-004': 'holiHampers',
  'gift-005': 'newyearCorporate',
  ...Object.fromEntries(range('gift', 6, 17).map((id) => [id, 'weddingHampers' as ThemeKey])),
  'deco-001': 'palaceWeddingDecor',
  'deco-002': 'bollywoodParty',
  'deco-003': 'corporateCeremony',
  'deco-004': 'diwaliDecoration',
  'deco-005': 'babyshowerGarden',
  'corp-001': 'governmentEvent',
  'corp-002': 'productLaunch',
  'corp-003': 'corporateGiftingProgram',
  'corp-004': 'tradeShow',
  'corp-005': 'employeeRecognition',
};

export const productImageMap: Record<string, string[]> = Object.fromEntries(
  Object.entries(productThemes).map(([id, themeKey]) => {
    const base = baseByTheme[themeKey];
    const details = detailsByTheme[themeKey] ?? [];
    const hero = heroById[id] ?? base;
    const images = [hero, ...details];
    if (hero !== base) images.push(base);
    return [id, Array.from(new Set(images))];
  })
);
