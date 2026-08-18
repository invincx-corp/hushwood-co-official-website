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

// Gallery detail shots (3 unique per theme)
import weddingInvitationsB from '@/assets/gallery/weddingInvitations-b.jpg';
import weddingInvitationsC from '@/assets/gallery/weddingInvitations-c.jpg';
import weddingInvitationsD from '@/assets/gallery/weddingInvitations-d.jpg';
import corporateStationeryB from '@/assets/gallery/corporateStationery-b.jpg';
import corporateStationeryC from '@/assets/gallery/corporateStationery-c.jpg';
import corporateStationeryD from '@/assets/gallery/corporateStationery-d.jpg';
import luxuryPlannerB from '@/assets/gallery/luxuryPlanner-b.jpg';
import luxuryPlannerC from '@/assets/gallery/luxuryPlanner-c.jpg';
import luxuryPlannerD from '@/assets/gallery/luxuryPlanner-d.jpg';
import festivalCardsB from '@/assets/gallery/festivalCards-b.jpg';
import festivalCardsC from '@/assets/gallery/festivalCards-c.jpg';
import festivalCardsD from '@/assets/gallery/festivalCards-d.jpg';
import babyCardsB from '@/assets/gallery/babyCards-b.jpg';
import babyCardsC from '@/assets/gallery/babyCards-c.jpg';
import babyCardsD from '@/assets/gallery/babyCards-d.jpg';
import diwaliHampersB from '@/assets/gallery/diwaliHampers-b.jpg';
import diwaliHampersC from '@/assets/gallery/diwaliHampers-c.jpg';
import diwaliHampersD from '@/assets/gallery/diwaliHampers-d.jpg';
import weddingHampersB from '@/assets/gallery/weddingHampers-b.jpg';
import weddingHampersC from '@/assets/gallery/weddingHampers-c.jpg';
import weddingHampersD from '@/assets/gallery/weddingHampers-d.jpg';
import executiveAwardsB from '@/assets/gallery/executiveAwards-b.jpg';
import executiveAwardsC from '@/assets/gallery/executiveAwards-c.jpg';
import executiveAwardsD from '@/assets/gallery/executiveAwards-d.jpg';
import holiHampersB from '@/assets/gallery/holiHampers-b.jpg';
import holiHampersC from '@/assets/gallery/holiHampers-c.jpg';
import holiHampersD from '@/assets/gallery/holiHampers-d.jpg';
import newyearCorporateB from '@/assets/gallery/newyearCorporate-b.jpg';
import newyearCorporateC from '@/assets/gallery/newyearCorporate-c.jpg';
import newyearCorporateD from '@/assets/gallery/newyearCorporate-d.jpg';
import palaceWeddingDecorB from '@/assets/gallery/palaceWeddingDecor-b.jpg';
import palaceWeddingDecorC from '@/assets/gallery/palaceWeddingDecor-c.jpg';
import palaceWeddingDecorD from '@/assets/gallery/palaceWeddingDecor-d.jpg';
import bollywoodPartyB from '@/assets/gallery/bollywoodParty-b.jpg';
import bollywoodPartyC from '@/assets/gallery/bollywoodParty-c.jpg';
import bollywoodPartyD from '@/assets/gallery/bollywoodParty-d.jpg';
import corporateCeremonyB from '@/assets/gallery/corporateCeremony-b.jpg';
import corporateCeremonyC from '@/assets/gallery/corporateCeremony-c.jpg';
import corporateCeremonyD from '@/assets/gallery/corporateCeremony-d.jpg';
import diwaliDecorationB from '@/assets/gallery/diwaliDecoration-b.jpg';
import diwaliDecorationC from '@/assets/gallery/diwaliDecoration-c.jpg';
import diwaliDecorationD from '@/assets/gallery/diwaliDecoration-d.jpg';
import babyshowerGardenB from '@/assets/gallery/babyshowerGarden-b.jpg';
import babyshowerGardenC from '@/assets/gallery/babyshowerGarden-c.jpg';
import babyshowerGardenD from '@/assets/gallery/babyshowerGarden-d.jpg';
import governmentEventB from '@/assets/gallery/governmentEvent-b.jpg';
import governmentEventC from '@/assets/gallery/governmentEvent-c.jpg';
import governmentEventD from '@/assets/gallery/governmentEvent-d.jpg';
import productLaunchB from '@/assets/gallery/productLaunch-b.jpg';
import productLaunchC from '@/assets/gallery/productLaunch-c.jpg';
import productLaunchD from '@/assets/gallery/productLaunch-d.jpg';
import corporateGiftingProgramB from '@/assets/gallery/corporateGiftingProgram-b.jpg';
import corporateGiftingProgramC from '@/assets/gallery/corporateGiftingProgram-c.jpg';
import corporateGiftingProgramD from '@/assets/gallery/corporateGiftingProgram-d.jpg';
import tradeShowB from '@/assets/gallery/tradeShow-b.jpg';
import tradeShowC from '@/assets/gallery/tradeShow-c.jpg';
import tradeShowD from '@/assets/gallery/tradeShow-d.jpg';
import employeeRecognitionB from '@/assets/gallery/employeeRecognition-b.jpg';
import employeeRecognitionC from '@/assets/gallery/employeeRecognition-c.jpg';
import employeeRecognitionD from '@/assets/gallery/employeeRecognition-d.jpg';

// Unique hero shots per product
const productHeroes = import.meta.glob('@/assets/products/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const heroById: Record<string, string> = Object.fromEntries(
  Object.entries(productHeroes).map(([path, url]) => [
    path.split('/').pop()!.replace('.jpg', ''),
    url,
  ])
);

type Theme = {
  base: string;
  details: [string, string, string];
};

const themes = {
  weddingInvitations: { base: weddingInvitations, details: [weddingInvitationsB, weddingInvitationsC, weddingInvitationsD] },
  corporateStationery: { base: corporateStationery, details: [corporateStationeryB, corporateStationeryC, corporateStationeryD] },
  luxuryPlanner: { base: luxuryPlanner, details: [luxuryPlannerB, luxuryPlannerC, luxuryPlannerD] },
  festivalCards: { base: festivalCards, details: [festivalCardsB, festivalCardsC, festivalCardsD] },
  babyCards: { base: babyCards, details: [babyCardsB, babyCardsC, babyCardsD] },
  diwaliHampers: { base: diwaliHampers, details: [diwaliHampersB, diwaliHampersC, diwaliHampersD] },
  weddingHampers: { base: weddingHampers, details: [weddingHampersB, weddingHampersC, weddingHampersD] },
  executiveAwards: { base: executiveAwards, details: [executiveAwardsB, executiveAwardsC, executiveAwardsD] },
  holiHampers: { base: holiHampers, details: [holiHampersB, holiHampersC, holiHampersD] },
  newyearCorporate: { base: newyearCorporate, details: [newyearCorporateB, newyearCorporateC, newyearCorporateD] },
  palaceWeddingDecor: { base: palaceWeddingDecor, details: [palaceWeddingDecorB, palaceWeddingDecorC, palaceWeddingDecorD] },
  bollywoodParty: { base: bollywoodParty, details: [bollywoodPartyB, bollywoodPartyC, bollywoodPartyD] },
  corporateCeremony: { base: corporateCeremony, details: [corporateCeremonyB, corporateCeremonyC, corporateCeremonyD] },
  diwaliDecoration: { base: diwaliDecoration, details: [diwaliDecorationB, diwaliDecorationC, diwaliDecorationD] },
  babyshowerGarden: { base: babyshowerGarden, details: [babyshowerGardenB, babyshowerGardenC, babyshowerGardenD] },
  governmentEvent: { base: governmentEvent, details: [governmentEventB, governmentEventC, governmentEventD] },
  productLaunch: { base: productLaunch, details: [productLaunchB, productLaunchC, productLaunchD] },
  corporateGiftingProgram: { base: corporateGiftingProgram, details: [corporateGiftingProgramB, corporateGiftingProgramC, corporateGiftingProgramD] },
  tradeShow: { base: tradeShow, details: [tradeShowB, tradeShowC, tradeShowD] },
  employeeRecognition: { base: employeeRecognition, details: [employeeRecognitionB, employeeRecognitionC, employeeRecognitionD] },
} satisfies Record<string, Theme>;

type ThemeKey = keyof typeof themes;

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
    const theme = themes[themeKey];
    const hero = heroById[id] ?? theme.base;
    return [id, [hero, ...theme.details]];
  })
);
