import { productImageMap } from './productImages';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  category: 'stationery' | 'gifts' | 'decoration' | 'corporate';
  occasion: string[];
  customizable: boolean;
  venue?: string[];
  requirements?: string[];
  features: string[];
  brochure?: string;
  catalog?: string;
}

const getProductImages = (id: string): string[] => {
  return productImageMap[id] || [productImageMap['stat-001'][0]];
};

export const products: Product[] = [
  // STATIONERY & GRAPHIC DESIGN
  {
    id: 'stat-001',
    title: 'Royal Wedding Invitation Suite',
    description: 'Luxurious handcrafted wedding invitations with 24K gold foiling, laser-cut details, custom calligraphy, and premium Italian paper. Complete with RSVP cards, envelope liners, and wax seals.',
    price: '₹8,000 - ₹25,000',
    images: getProductImages('stat-001'),
    category: 'stationery',
    occasion: ['wedding', 'engagement', 'anniversary'],
    customizable: true,
    venue: ['banquet hall', 'palace', 'outdoor garden', 'resort'],
    features: ['24K Gold Foiling', 'Laser Cut Design', 'Custom Calligraphy', 'Premium Italian Paper', 'Wax Seals', 'Envelope Liners'],
    brochure: '/brochures/royal-wedding-invites.pdf',
    catalog: '/catalogs/wedding-stationery-2024.pdf'
  },
  {
    id: 'stat-015',
    title: 'Haldi Ceremony Design Pack',
    description: 'Bright and joyful haldi stationery and signage pack including invite, welcome board, and theme elements in turmeric-inspired palettes.',
    price: '₹3,000 - ₹12,000',
    images: getProductImages('stat-015'),
    category: 'stationery',
    occasion: ['wedding', 'celebration'],
    customizable: true,
    features: ['Haldi Theme Palette', 'Name Personalization', 'Printable + Digital', 'Welcome Signage', 'Matching Elements'],
    brochure: '/brochures/haldi-design-pack.pdf'
  },
  {
    id: 'stat-016',
    title: 'Mehendi Night Design Pack',
    description: 'Elegant mehendi themed invites, signage, and event branding with traditional motifs and modern finishes.',
    price: '₹3,500 - ₹14,000',
    images: getProductImages('stat-016'),
    category: 'stationery',
    occasion: ['wedding', 'party'],
    customizable: true,
    features: ['Traditional Motifs', 'Modern Layouts', 'Printable + Digital', 'Welcome Signage', 'Matching Posters'],
    brochure: '/brochures/mehendi-design-pack.pdf'
  },
  {
    id: 'stat-017',
    title: 'Sangeet Night Invite & Branding Set',
    description: 'High-energy sangeet invites, couple entry boards, stage branding and digital invites to match your theme and playlist vibe.',
    price: '₹4,000 - ₹18,000',
    images: getProductImages('stat-017'),
    category: 'stationery',
    occasion: ['wedding', 'party'],
    customizable: true,
    features: ['Stage Branding', 'Digital Invite', 'Couple Entry Board', 'Theme Customization', 'Multiple Formats'],
    brochure: '/brochures/sangeet-branding.pdf'
  },
  {
    id: 'stat-018',
    title: 'Wedding Day Signage & Stationery Suite',
    description: 'Complete wedding day signage and stationery including welcome boards, schedule signs, table signage, and thank you notes.',
    price: '₹8,000 - ₹35,000',
    images: getProductImages('stat-018'),
    category: 'stationery',
    occasion: ['wedding'],
    customizable: true,
    features: ['Welcome Signage', 'Table Signage', 'Schedule Board', 'Premium Print', 'Theme Consistency'],
    catalog: '/catalogs/wedding-day-signage.pdf'
  },
  {
    id: 'stat-019',
    title: 'Reception Invite & Welcome Board Set',
    description: 'Reception invitation designs and entrance welcome signage with modern layouts and premium print options.',
    price: '₹3,500 - ₹15,000',
    images: getProductImages('stat-019'),
    category: 'stationery',
    occasion: ['wedding', 'reception'],
    customizable: true,
    features: ['Reception Theme', 'Digital Invite', 'Premium Print Option', 'Welcome Board', 'Photo Integration'],
    brochure: '/brochures/reception-invites.pdf'
  },
  {
    id: 'stat-020',
    title: 'Wedding Pooja Invite & Puja Essentials Signage',
    description: 'Traditional pooja invitation designs with simple, elegant signage suitable for home or venue ceremonies.',
    price: '₹2,000 - ₹8,000',
    images: getProductImages('stat-020'),
    category: 'stationery',
    occasion: ['wedding', 'celebration'],
    customizable: true,
    features: ['Traditional Aesthetics', 'Easy-to-Read Typography', 'Digital Invite', 'Printable Cards', 'Custom Names'],
    brochure: '/brochures/pooja-invites.pdf'
  },
  {
    id: 'stat-021',
    title: 'Engagement Invite & Celebration Branding',
    description: 'Engagement invitation suite with matching posters, welcome signage, and optional ring ceremony signage.',
    price: '₹3,000 - ₹14,000',
    images: getProductImages('stat-021'),
    category: 'stationery',
    occasion: ['engagement', 'wedding', 'celebration'],
    customizable: true,
    features: ['Ring Ceremony Signage', 'Digital Invite', 'Printable + Digital', 'Modern Themes', 'Photo Integration'],
    brochure: '/brochures/engagement-designs.pdf'
  },
  {
    id: 'stat-022',
    title: 'Pre-Wedding Photoshoot Concept & Design Pack',
    description: 'Creative pre-wedding photoshoot concept design pack including mood board, props design suggestions, and printable elements.',
    price: '₹5,000 - ₹25,000',
    images: getProductImages('stat-022'),
    category: 'stationery',
    occasion: ['wedding'],
    customizable: true,
    features: ['Mood Board', 'Props Design Suggestions', 'Theme Customization', 'Printable Elements', 'Digital Delivery'],
    brochure: '/brochures/photoshoot-design-pack.pdf'
  },
  {
    id: 'stat-023',
    title: 'Proposal Setup Invite & Signage Set',
    description: 'Proposal invites and signage including “Will You Marry Me” boards and custom message cards.',
    price: '₹2,500 - ₹12,000',
    images: getProductImages('stat-023'),
    category: 'stationery',
    occasion: ['celebration', 'engagement'],
    customizable: true,
    features: ['Custom Message', 'Premium Print Option', 'Photo Integration', 'Multiple Sizes', 'Digital Invite'],
    brochure: '/brochures/proposal-signage.pdf'
  },
  {
    id: 'stat-024',
    title: 'Bridal Shower Invite & Games Printables',
    description: 'Bridal shower invitation design pack with games printables, welcome board, and cute themed cards.',
    price: '₹2,500 - ₹10,000',
    images: getProductImages('stat-024'),
    category: 'stationery',
    occasion: ['wedding', 'party', 'birthday', 'other'],
    customizable: true,
    features: ['Games Printables', 'Digital Invite', 'Welcome Signage', 'Theme Customization', 'Printable Bundle'],
    brochure: '/brochures/bridal-shower-pack.pdf'
  },
  {
    id: 'stat-025',
    title: 'Bachelorette Night Invite & Props Print Pack',
    description: 'Bachelorette night design pack with invites, posters, photo booth props, and party signage.',
    price: '₹3,000 - ₹12,000',
    images: getProductImages('stat-025'),
    category: 'stationery',
    occasion: ['party', 'birthday', 'other'],
    customizable: true,
    features: ['Photo Booth Props', 'Party Posters', 'Digital Invite', 'Theme Colors', 'Printable Pack'],
    brochure: '/brochures/bachelorette-pack.pdf'
  },
  {
    id: 'stat-026',
    title: 'After Party Invite & Night Branding',
    description: 'After party invite designs and nightlife-themed signage for a fun post-event vibe.',
    price: '₹2,500 - ₹10,000',
    images: getProductImages('stat-026'),
    category: 'stationery',
    occasion: ['party', 'celebration', 'birthday', 'other'],
    customizable: true,
    features: ['Night Theme', 'Digital Invite', 'Neon-style Posters', 'Custom Names', 'Multiple Formats'],
    brochure: '/brochures/after-party-pack.pdf'
  },
  {
    id: 'stat-027',
    title: 'Party Nights Invite & Poster Set',
    description: 'Party nights invitation and poster designs suitable for sangeet afterparties, bachelor/bachelorette, or cocktail parties.',
    price: '₹2,000 - ₹9,000',
    images: getProductImages('stat-027'),
    category: 'stationery',
    occasion: ['party', 'birthday', 'other'],
    customizable: true,
    features: ['Modern Posters', 'Digital Invites', 'Theme Customization', 'Quick Delivery', 'Multiple Sizes'],
    brochure: '/brochures/party-nights-designs.pdf'
  },
  {
    id: 'stat-028',
    title: 'Customized Invitations (All Wedding Events)',
    description: 'Fully customized invitation designs for each wedding event in your itinerary with cohesive branding across all functions.',
    price: '₹6,000 - ₹35,000',
    images: getProductImages('stat-028'),
    category: 'stationery',
    occasion: ['wedding', 'engagement', 'celebration'],
    customizable: true,
    features: ['Multiple Events', 'Cohesive Branding', 'Printable + Digital', 'Revisions Included', 'Premium Options'],
    brochure: '/brochures/custom-wedding-invitations.pdf'
  },
  {
    id: 'stat-029',
    title: 'Customized Video Invites (All Wedding Events)',
    description: 'Short animated invite videos for WhatsApp and social sharing for every wedding function and celebration.',
    price: '₹8,000 - ₹50,000',
    images: getProductImages('stat-029'),
    category: 'stationery',
    occasion: ['wedding', 'engagement', 'party'],
    customizable: true,
    features: ['Animated Video', 'Music & Text Options', 'Multiple Formats', 'Theme Matching', 'Revisions Included'],
    brochure: '/brochures/custom-wedding-video-invites.pdf'
  },
  {
    id: 'stat-030',
    title: 'Customized Online Designs (RSVP + Wedding Website)',
    description: 'Customized online invite designs including RSVP pages and wedding website-style layouts for easy guest communication.',
    price: '₹12,000 - ₹75,000',
    images: getProductImages('stat-030'),
    category: 'stationery',
    occasion: ['wedding', 'engagement'],
    customizable: true,
    features: ['RSVP Page', 'Custom Theme', 'Mobile Friendly', 'Event Schedule Section', 'Shareable Link'],
    brochure: '/brochures/online-invites.pdf'
  },
  {
    id: 'stat-031',
    title: 'Customized Props Design (All Wedding Events)',
    description: 'Custom props design for every wedding function including photo booth props, standees, and themed signages.',
    price: '₹5,000 - ₹45,000',
    images: getProductImages('stat-031'),
    category: 'stationery',
    occasion: ['wedding', 'party', 'celebration'],
    customizable: true,
    features: ['Photo Booth Props', 'Standee Designs', 'Theme Matching', 'Print-ready Files', 'Multiple Events'],
    brochure: '/brochures/custom-props-design.pdf'
  },
  {
    id: 'stat-032',
    title: 'Save the Date (Wedding) Digital & Print',
    description: 'Save the date designs for weddings with digital and print options, matching your wedding branding and palette.',
    price: '₹2,500 - ₹10,000',
    images: getProductImages('stat-032'),
    category: 'stationery',
    occasion: ['wedding', 'engagement'],
    customizable: true,
    features: ['Digital + Print', 'Theme Matching', 'Custom Fonts', 'Multiple Sizes', 'Quick Delivery'],
    brochure: '/brochures/save-the-date.pdf'
  },
  {
    id: 'stat-033',
    title: 'Thank You Cards (Wedding)',
    description: 'Thank you cards for wedding guests with premium finishes and personalized messages.',
    price: '₹150 - ₹500 per piece',
    images: getProductImages('stat-033'),
    category: 'stationery',
    occasion: ['wedding', 'celebration'],
    customizable: true,
    features: ['Personal Messages', 'Premium Finish', 'Bulk Discounts', 'Theme Matching', 'Multiple Sizes'],
    brochure: '/brochures/wedding-thank-you-cards.pdf'
  },
  {
    id: 'stat-002',
    title: 'Corporate Brand Identity Package',
    description: 'Complete corporate stationery suite including letterheads, business cards, brochures, folders, and presentation materials with consistent brand identity.',
    price: '₹15,000 - ₹50,000',
    images: getProductImages('stat-002'),
    category: 'stationery',
    occasion: ['corporate', 'business', 'launch'],
    customizable: true,
    venue: ['office premises', 'convention center'],
    features: ['Brand Consistency', 'Premium Print Quality', 'Multiple Formats', 'Digital Assets', 'Logo Design'],
    brochure: '/brochures/corporate-identity.pdf'
  },
  {
    id: 'stat-003',
    title: 'Luxury Planner Collection',
    description: 'Handbound leather planners with gold embossing, custom layouts, motivational quotes, and premium paper. Available in multiple sizes and colors.',
    price: '₹2,500 - ₹8,000',
    images: getProductImages('stat-003'),
    category: 'stationery',
    occasion: ['personal', 'corporate', 'student', 'new year'],
    customizable: true,
    features: ['Leather Binding', 'Gold Embossing', 'Custom Layouts', 'Premium Paper', 'Multiple Sizes', 'Gift Box'],
    catalog: '/catalogs/planner-collection.pdf'
  },
  {
    id: 'stat-004',
    title: 'Festival Greeting Cards',
    description: 'Handmade greeting cards for Indian festivals with traditional motifs, gold accents, and personalized messages. Available in bulk for corporate gifting.',
    price: '₹150 - ₹500 per piece',
    images: getProductImages('stat-004'),
    category: 'stationery',
    occasion: ['diwali', 'holi', 'navratri', 'festivals'],
    customizable: true,
    features: ['Handmade Paper', 'Traditional Motifs', 'Gold Accents', 'Personal Messages', 'Bulk Discounts'],
    brochure: '/brochures/festival-cards.pdf'
  },
  {
    id: 'stat-005',
    title: 'Baby Announcement Cards',
    description: 'Adorable baby announcement and naming ceremony invitations with cute illustrations, soft colors, and premium finishes.',
    price: '₹3,000 - ₹12,000',
    images: getProductImages('stat-005'),
    category: 'stationery',
    occasion: ['baby shower', 'naming ceremony', 'celebration'],
    customizable: true,
    venue: ['home', 'banquet hall', 'garden'],
    features: ['Cute Illustrations', 'Soft Color Palette', 'Premium Finish', 'Photo Integration', 'Thank You Cards'],
    catalog: '/catalogs/baby-stationery.pdf'
  },
  {
    id: 'stat-006',
    title: "Kid's Birthday Theme Kit (Invites + Welcome Board)",
    description: "A playful kid's birthday stationery kit including invitation design, welcome board, and matching elements in the same theme.",
    price: '₹2,500 - ₹9,000',
    images: getProductImages('stat-006'),
    category: 'stationery',
    occasion: ['birthday', 'celebration', 'party'],
    customizable: true,
    features: ['Theme-based Design', 'Name Personalization', 'Printable + Digital', 'Fast Turnaround', 'Multiple Formats'],
    brochure: '/brochures/birthday-theme-kit.pdf'
  },
  {
    id: 'stat-007',
    title: "Adult's Birthday Invitation & Branding Set",
    description: "Elegant adult birthday invitation suite with matching welcome signage and social media invite design for a cohesive party look.",
    price: '₹2,500 - ₹10,000',
    images: getProductImages('stat-007'),
    category: 'stationery',
    occasion: ['birthday', 'party'],
    customizable: true,
    features: ['Modern Minimal Design', 'Custom Colors', 'Printable + Digital', 'WhatsApp Invite', 'Welcome Signage'],
    brochure: '/brochures/adult-birthday-invites.pdf'
  },
  {
    id: 'stat-008',
    title: "Senior Citizen's Birthday Invite Suite",
    description: "Warm and classic birthday invitation designs for senior citizens with photo integration and easy-to-read typography.",
    price: '₹2,000 - ₹8,000',
    images: getProductImages('stat-008'),
    category: 'stationery',
    occasion: ['birthday', 'celebration'],
    customizable: true,
    features: ['Photo Integration', 'Classic Themes', 'Large Typography', 'Digital Invite', 'Optional Thank You Card'],
    brochure: '/brochures/senior-birthday-invites.pdf'
  },
  {
    id: 'stat-009',
    title: "Pet's Birthday Party Invite Pack",
    description: "Cute and quirky pet birthday invites and welcome signage with paw-print motifs and personalized pet details.",
    price: '₹1,500 - ₹6,000',
    images: getProductImages('stat-009'),
    category: 'stationery',
    occasion: ['birthday', 'party'],
    customizable: true,
    features: ['Pet Photo Integration', 'Paw-print Motifs', 'Digital Invite', 'Name Personalization', 'Theme Variations'],
    brochure: '/brochures/pet-birthday-invites.pdf'
  },
  {
    id: 'stat-010',
    title: "Friend's Birthday Digital Invite + Poster",
    description: "Trendy digital invites and posters for your friend's birthday party with bold typography and modern colors.",
    price: '₹1,200 - ₹5,500',
    images: getProductImages('stat-010'),
    category: 'stationery',
    occasion: ['birthday', 'party'],
    customizable: true,
    features: ['Trendy Typography', 'Instagram Story Invite', 'Printable Poster', 'Color Customization', 'Quick Delivery'],
    brochure: '/brochures/friends-birthday-invite.pdf'
  },
  {
    id: 'stat-011',
    title: 'Nature Themed Birthday Design Pack',
    description: 'Nature-inspired birthday designs with floral, jungle, or earthy aesthetics for invitations, welcome signage, and posters.',
    price: '₹2,500 - ₹9,500',
    images: getProductImages('stat-011'),
    category: 'stationery',
    occasion: ['birthday', 'celebration'],
    customizable: true,
    features: ['Floral/Jungle Themes', 'Custom Colors', 'Printable + Digital', 'Welcome Signage', 'Matching Posters'],
    brochure: '/brochures/nature-birthday-designs.pdf'
  },
  {
    id: 'stat-012',
    title: 'Cartoon Themed Birthday Design Pack',
    description: 'Cartoon-themed birthday invitation and signage pack designed around your child’s favorite characters and colors.',
    price: '₹3,000 - ₹12,000',
    images: getProductImages('stat-012'),
    category: 'stationery',
    occasion: ['birthday', 'party'],
    customizable: true,
    features: ['Character-inspired Art', 'Name & Age Personalization', 'Printable + Digital', 'Multiple Variants', 'Fast Turnaround'],
    brochure: '/brochures/cartoon-birthday-designs.pdf'
  },
  {
    id: 'stat-013',
    title: 'Movie Themed Birthday Design Pack',
    description: 'A cinematic birthday party design pack including ticket-style invites, posters, and welcome boards inspired by your favorite movie theme.',
    price: '₹3,500 - ₹15,000',
    images: getProductImages('stat-013'),
    category: 'stationery',
    occasion: ['birthday', 'party'],
    customizable: true,
    features: ['Ticket-style Invites', 'Poster Design', 'Welcome Board', 'Theme Customization', 'Digital Delivery'],
    brochure: '/brochures/movie-birthday-designs.pdf'
  },
  {
    id: 'stat-014',
    title: 'Customized Invitations & Videos',
    description: 'Premium customized invitation designs along with short animated invite videos for WhatsApp and social sharing.',
    price: '₹4,000 - ₹25,000',
    images: getProductImages('stat-014'),
    category: 'stationery',
    occasion: ['birthday', 'celebration', 'party'],
    customizable: true,
    features: ['Animated Invite Video', 'Custom Illustrations', 'Music & Text Options', 'Multiple Formats', 'Revisions Included'],
    brochure: '/brochures/custom-invites-videos.pdf'
  },
  {
    id: 'stat-034',
    title: 'Housewarming (Griha Pravesh) Invite + Welcome Kit',
    description: 'Housewarming invitation design with matching welcome board, direction signage, and simple labeling elements for a cohesive setup.',
    price: '₹3,500 - ₹18,000',
    images: getProductImages('stat-034'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Traditional + Modern Themes', 'Welcome Board', 'Direction Signage', 'Printable + Digital', 'Name Personalization'],
    brochure: '/brochures/housewarming-kit.pdf'
  },
  {
    id: 'stat-035',
    title: 'Pooja Ceremony Invite + Signage Pack',
    description: 'Traditional invitation and signage pack for home pooja events including schedule/itinerary board and labels for essentials.',
    price: '₹2,500 - ₹12,000',
    images: getProductImages('stat-035'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Traditional Aesthetics', 'Schedule Board', 'Essentials Labels', 'Printable + Digital', 'Custom Names'],
    brochure: '/brochures/pooja-signage-pack.pdf'
  },
  {
    id: 'stat-036',
    title: 'Mundan Ceremony Invite + Theme Pack',
    description: 'Invitation and theme-based printables for mundan/first haircut ceremonies with cute motifs and photo integration.',
    price: '₹3,000 - ₹14,000',
    images: getProductImages('stat-036'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Cute Theme Motifs', 'Photo Integration', 'Printable + Digital', 'Welcome Board Option', 'Multiple Formats'],
    brochure: '/brochures/mundan-invite-pack.pdf'
  },
  {
    id: 'stat-037',
    title: 'Naming Ceremony Premium Invite Suite',
    description: 'Premium naming ceremony invite designs with matching welcome signage and thank you card options.',
    price: '₹3,500 - ₹18,000',
    images: getProductImages('stat-037'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Premium Finish Options', 'Photo Integration', 'Welcome Signage', 'Thank You Card Option', 'Printable + Digital'],
    brochure: '/brochures/naming-ceremony-premium.pdf'
  },
  {
    id: 'stat-038',
    title: 'Anniversary Invite + Photo Timeline Board',
    description: 'Anniversary invitation designs with a “timeline of memories” photo board and optional table signage.',
    price: '₹4,000 - ₹22,000',
    images: getProductImages('stat-038'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Photo Timeline Board', 'Theme Matching', 'Printable + Digital', 'Custom Message', 'Premium Print Option'],
    brochure: '/brochures/anniversary-timeline.pdf'
  },
  {
    id: 'stat-039',
    title: 'Milestone Birthday (50/60/70) Classic Pack',
    description: 'Classic invitation + welcome board designs for milestone family birthdays with elegant typography and photo options.',
    price: '₹3,500 - ₹18,000',
    images: getProductImages('stat-039'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Classic Themes', 'Photo Integration', 'Welcome Board', 'Printable + Digital', 'Custom Names'],
    brochure: '/brochures/milestone-birthday-pack.pdf'
  },
  {
    id: 'stat-040',
    title: 'Family Get-together Digital Invite + Poster',
    description: 'Digital invite plus a printable poster for family get-togethers, reunions, and home celebrations.',
    price: '₹1,500 - ₹7,500',
    images: getProductImages('stat-040'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Digital Invite', 'Printable Poster', 'Photo Collage Option', 'Quick Delivery', 'Multiple Formats'],
    brochure: '/brochures/family-gettogether-invite.pdf'
  },
  {
    id: 'stat-041',
    title: 'Retirement/Farewell Family Celebration Pack',
    description: 'Farewell invites and a memory wall / message board design set for a warm family celebration.',
    price: '₹4,000 - ₹20,000',
    images: getProductImages('stat-041'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Memory Wall Design', 'Custom Message Cards', 'Printable + Digital', 'Photo Integration', 'Theme Matching'],
    brochure: '/brochures/retirement-farewell-pack.pdf'
  },
  {
    id: 'stat-042',
    title: 'Graduation / Convocation Family Celebration Board',
    description: 'Congrats board and welcome poster design for graduation/convocation family celebrations.',
    price: '₹2,000 - ₹9,000',
    images: getProductImages('stat-042'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Congrats Board', 'Photo Integration', 'Printable Files', 'Multiple Sizes', 'Fast Turnaround'],
    brochure: '/brochures/graduation-celebration-board.pdf'
  },
  {
    id: 'stat-043',
    title: 'Success Party (Promotion / Milestone) Branding Pack',
    description: 'Event branding for family success celebrations with welcome signage, posters, and social sharing templates.',
    price: '₹3,000 - ₹15,000',
    images: getProductImages('stat-043'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Welcome Signage', 'Poster Design', 'Social Templates', 'Theme Matching', 'Multiple Formats'],
    brochure: '/brochures/success-party-branding.pdf'
  },
  {
    id: 'stat-044',
    title: 'Family Function Food Labels + Table Tent Cards',
    description: 'Buffet labels, table tent cards, and small signage for food counters and family function setups.',
    price: '₹1,200 - ₹6,000',
    images: getProductImages('stat-044'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Food Labels', 'Table Tent Cards', 'Theme Matching', 'Print-ready Files', 'Bulk Options'],
    brochure: '/brochures/food-labels-tents.pdf'
  },
  {
    id: 'stat-045',
    title: 'Thank You Cards + Return Gift Tags (Family Events)',
    description: 'Thank you cards and gift tags for return gifts/prasad with consistent event branding and bulk-friendly pricing.',
    price: '₹150 - ₹500 per piece',
    images: getProductImages('stat-045'),
    category: 'stationery',
    occasion: ['family_events'],
    customizable: true,
    features: ['Bulk Discounts', 'Custom Names', 'Premium Finish Options', 'Theme Matching', 'Multiple Sizes'],
    brochure: '/brochures/family-thankyou-tags.pdf'
  },

  // PERSONALIZED GIFT HAMPERS
  {
    id: 'gift-001',
    title: 'Premium Diwali Corporate Hampers',
    description: 'Luxurious Diwali gift hampers with premium sweets from renowned shops, dry fruits, silver artifacts, diyas, and custom corporate branding. Available in multiple price ranges.',
    price: '₹2,500 - ₹15,000',
    images: getProductImages('gift-001'),
    category: 'gifts',
    occasion: ['diwali', 'festivals', 'corporate', 'appreciation'],
    customizable: true,
    features: ['Premium Sweets', 'Dry Fruits', 'Silver Artifacts', 'Custom Branding', 'Luxury Packaging', 'Bulk Discounts'],
    brochure: '/brochures/diwali-corporate-hampers.pdf',
    catalog: '/catalogs/festival-hampers-2024.pdf'
  },
  {
    id: 'gift-006',
    title: "Gifting - Kid's Birthday",
    description: "Birthday gifting hampers for kids with chocolates, activity goodies, stationery surprises, and theme-based packaging.",
    price: '₹800 - ₹4,500',
    images: getProductImages('gift-006'),
    category: 'gifts',
    occasion: ['birthday', 'celebration'],
    customizable: true,
    features: ['Theme-based Packaging', 'Kid-friendly Items', 'Name Tag', 'Add-ons Available', 'Bulk Options'],
    catalog: '/catalogs/birthday-gifting.pdf'
  },
  {
    id: 'gift-007',
    title: "Gifting - Senior Citizen's Birthday",
    description: "Thoughtful birthday hampers for senior citizens featuring wellness items, premium snacks, and elegant packaging.",
    price: '₹1,500 - ₹6,500',
    images: getProductImages('gift-007'),
    category: 'gifts',
    occasion: ['birthday', 'celebration'],
    customizable: true,
    features: ['Wellness-focused Items', 'Premium Snacks', 'Elegant Packaging', 'Personal Note', 'Custom Add-ons'],
    catalog: '/catalogs/birthday-gifting.pdf'
  },
  {
    id: 'gift-008',
    title: "Gifting - Adult's Birthday",
    description: "Premium birthday gift hampers for adults with gourmet items, accessories, and luxury wrapping.",
    price: '₹1,800 - ₹9,000',
    images: getProductImages('gift-008'),
    category: 'gifts',
    occasion: ['birthday', 'party'],
    customizable: true,
    features: ['Gourmet Selection', 'Premium Accessories', 'Luxury Wrapping', 'Custom Message Card', 'Multiple Price Tiers'],
    catalog: '/catalogs/birthday-gifting.pdf'
  },
  {
    id: 'gift-009',
    title: "Gifting - Friend's Birthday",
    description: "Fun and trendy birthday hampers for friends with personalized goodies and cute packaging.",
    price: '₹1,000 - ₹5,500',
    images: getProductImages('gift-009'),
    category: 'gifts',
    occasion: ['birthday', 'party'],
    customizable: true,
    features: ['Personalized Add-ons', 'Trendy Packaging', 'Gourmet Treats', 'Cute Notes', 'Quick Dispatch'],
    catalog: '/catalogs/birthday-gifting.pdf'
  },
  {
    id: 'gift-012',
    title: 'Housewarming Return Gift Hampers',
    description: 'Return gift hampers for housewarming with utility + traditional combinations and elegant packaging options.',
    price: '₹350 - ₹3,500 per piece',
    images: getProductImages('gift-012'),
    category: 'gifts',
    occasion: ['family_events'],
    customizable: true,
    features: ['Utility + Traditional Mix', 'Custom Tags', 'Bulk Discounts', 'Multiple Themes', 'Premium Packaging'],
    catalog: '/catalogs/family-events-gifting.pdf'
  },
  {
    id: 'gift-013',
    title: 'Pooja Return Gifts (Prasad + Packaging)',
    description: 'Prasad packaging and return gifts for pooja ceremonies with custom labels and coordinated packaging.',
    price: '₹250 - ₹2,500 per piece',
    images: getProductImages('gift-013'),
    category: 'gifts',
    occasion: ['family_events'],
    customizable: true,
    features: ['Prasad Packaging', 'Custom Labels', 'Bulk Options', 'Theme Matching', 'Neat Presentation'],
    catalog: '/catalogs/family-events-gifting.pdf'
  },
  {
    id: 'gift-014',
    title: 'Mundan / Naming Ceremony Return Gifts',
    description: 'Cute return gifts for child ceremonies with personalized tags, themed packaging and bulk-friendly options.',
    price: '₹300 - ₹2,500 per piece',
    images: getProductImages('gift-014'),
    category: 'gifts',
    occasion: ['family_events'],
    customizable: true,
    features: ['Cute Theme Packaging', 'Personalized Tags', 'Bulk Discounts', 'Multiple Price Tiers', 'Add-on Notes'],
    catalog: '/catalogs/family-events-gifting.pdf'
  },
  {
    id: 'gift-015',
    title: 'Anniversary Return Hampers',
    description: 'Elegant anniversary return hampers featuring gourmet items and thoughtful keepsakes in premium packaging.',
    price: '₹500 - ₹5,000 per piece',
    images: getProductImages('gift-015'),
    category: 'gifts',
    occasion: ['family_events'],
    customizable: true,
    features: ['Gourmet Items', 'Keepsake Options', 'Premium Packaging', 'Custom Message Card', 'Bulk Options'],
    catalog: '/catalogs/family-events-gifting.pdf'
  },
  {
    id: 'gift-016',
    title: 'Family Reunion Welcome Hampers',
    description: 'Welcome hampers for family reunions and get-togethers with personalized notes and themed packaging.',
    price: '₹500 - ₹4,500 per piece',
    images: getProductImages('gift-016'),
    category: 'gifts',
    occasion: ['family_events'],
    customizable: true,
    features: ['Personalized Notes', 'Theme-based Packaging', 'Multiple Price Tiers', 'Bulk Options', 'Quick Planning'],
    catalog: '/catalogs/family-events-gifting.pdf'
  },
  {
    id: 'gift-017',
    title: 'Premium Elders Gift Hamper',
    description: 'Premium gifting for parents/grandparents with wellness, premium snacks, and thoughtful keepsakes.',
    price: '₹1,000 - ₹10,000',
    images: getProductImages('gift-017'),
    category: 'gifts',
    occasion: ['family_events'],
    customizable: true,
    features: ['Wellness-focused Items', 'Premium Snacks', 'Keepsake Options', 'Elegant Packaging', 'Personal Note'],
    catalog: '/catalogs/family-events-gifting.pdf'
  },
  {
    id: 'gift-002',
    title: 'Wedding Welcome Gift Baskets',
    description: 'Elegant welcome hampers for wedding guests featuring traditional Indian sweets, aromatic candles, premium tea, and personalized thank-you notes.',
    price: '₹800 - ₹3,500',
    images: getProductImages('gift-002'),
    category: 'gifts',
    occasion: ['wedding', 'engagement', 'celebration'],
    customizable: true,
    venue: ['banquet hall', 'resort', 'palace', 'outdoor garden'],
    features: ['Traditional Sweets', 'Aromatic Candles', 'Premium Tea', 'Thank You Notes', 'Elegant Packaging'],
    catalog: '/catalogs/wedding-hampers.pdf'
  },
  {
    id: 'gift-010',
    title: 'Customized Gift Hampers (Wedding Events)',
    description: 'Customized gift hampers for haldi, mehendi, sangeet, wedding and reception with theme-based packaging and personalized notes.',
    price: '₹1,000 - ₹10,000 per piece',
    images: getProductImages('gift-010'),
    category: 'gifts',
    occasion: ['wedding', 'engagement', 'celebration'],
    customizable: true,
    features: ['Theme-based Packaging', 'Personalized Notes', 'Multiple Price Tiers', 'Bulk Options', 'Custom Branding'],
    catalog: '/catalogs/wedding-hampers.pdf'
  },
  {
    id: 'gift-011',
    title: 'Wedding Favours & Return Gifts',
    description: 'Premium wedding favours and return gifts with custom packaging, tags, and thank you notes for guests.',
    price: '₹250 - ₹2,500 per piece',
    images: getProductImages('gift-011'),
    category: 'gifts',
    occasion: ['wedding', 'celebration'],
    customizable: true,
    features: ['Custom Tags', 'Premium Packaging', 'Bulk Discounts', 'Multiple Themes', 'Add-on Notes'],
    catalog: '/catalogs/wedding-favours.pdf'
  },
  {
    id: 'gift-003',
    title: 'Executive Achievement Awards',
    description: 'Sophisticated gift hampers for corporate achievements including premium accessories, gourmet items, branded merchandise, and appreciation certificates.',
    price: '₹5,000 - ₹25,000',
    images: getProductImages('gift-003'),
    category: 'gifts',
    occasion: ['corporate', 'achievement', 'recognition', 'appreciation'],
    customizable: true,
    venue: ['office premises', 'hotel', 'convention center'],
    features: ['Premium Accessories', 'Gourmet Items', 'Branded Merchandise', 'Certificates', 'Executive Packaging'],
    brochure: '/brochures/executive-awards.pdf'
  },
  {
    id: 'gift-004',
    title: 'Holi Celebration Hampers',
    description: 'Vibrant Holi gift sets with organic colors, traditional sweets, silver vessels, and festive accessories for a complete celebration experience.',
    price: '₹1,200 - ₹6,000',
    images: getProductImages('gift-004'),
    category: 'gifts',
    occasion: ['holi', 'festivals', 'celebration'],
    customizable: true,
    features: ['Organic Colors', 'Traditional Sweets', 'Silver Vessels', 'Festive Accessories', 'Eco-friendly Packaging'],
    brochure: '/brochures/holi-hampers.pdf'
  },
  {
    id: 'gift-005',
    title: 'New Year Corporate Gifting',
    description: 'Sophisticated New Year hampers with premium wine, gourmet snacks, desk accessories, and motivational books for corporate clients and employees.',
    price: '₹3,500 - ₹18,000',
    images: getProductImages('gift-005'),
    category: 'gifts',
    occasion: ['new year', 'corporate', 'appreciation'],
    customizable: true,
    features: ['Premium Wine', 'Gourmet Snacks', 'Desk Accessories', 'Motivational Books', 'Corporate Branding'],
    catalog: '/catalogs/corporate-new-year.pdf'
  },

  // VENUE DECORATION
  {
    id: 'deco-001',
    title: 'Royal Palace Wedding Decoration',
    description: 'Opulent wedding decorations inspired by Indian palaces with marigold arrangements, crystal chandeliers, royal drapes, and grand mandaps with traditional elements.',
    price: '₹5,00,000 - ₹25,00,000',
    images: getProductImages('deco-001'),
    category: 'decoration',
    occasion: ['wedding', 'engagement', 'reception'],
    venue: ['palace', 'banquet hall', 'resort', 'heritage venue'],
    customizable: true,
    requirements: ['permits', 'security', 'catering coordination'],
    features: ['Marigold Arrangements', 'Crystal Chandeliers', 'Royal Drapes', 'Grand Mandap', 'LED Lighting', 'Traditional Elements'],
    catalog: '/catalogs/royal-wedding-decor.pdf'
  },
  {
    id: 'deco-002',
    title: 'Bollywood Theme Birthday Party',
    description: 'Glamorous Bollywood-themed birthday decorations with movie posters, red carpet setup, gold and red color scheme, and dramatic lighting.',
    price: '₹25,000 - ₹1,50,000',
    images: getProductImages('deco-002'),
    category: 'decoration',
    occasion: ['birthday', 'celebration', 'party'],
    venue: ['banquet hall', 'restaurant', 'home', 'hotel'],
    customizable: true,
    features: ['Movie Posters', 'Red Carpet Setup', 'Dramatic Lighting', 'Photo Booth', 'Themed Props', 'Sound System'],
    brochure: '/brochures/bollywood-birthday.pdf'
  },
  {
    id: 'deco-003',
    title: 'Corporate Award Ceremony Decoration',
    description: 'Professional and elegant decorations for corporate award ceremonies with stage backdrop, lighting effects, and branded elements.',
    price: '₹1,50,000 - ₹8,00,000',
    images: getProductImages('deco-003'),
    category: 'decoration',
    occasion: ['corporate', 'achievement', 'award ceremony'],
    venue: ['convention center', 'auditorium', 'hotel'],
    customizable: true,
    requirements: ['audio visual', 'security', 'media coverage'],
    features: ['Stage Backdrop', 'Professional Lighting', 'Corporate Branding', 'VIP Seating', 'Photo Areas'],
    catalog: '/catalogs/corporate-events.pdf'
  },
  {
    id: 'deco-004',
    title: 'Traditional Diwali Celebration Decor',
    description: 'Authentic Diwali decorations with thousands of diyas, rangoli designs, marigold garlands, and traditional motifs for grand celebrations.',
    price: '₹50,000 - ₹3,00,000',
    images: getProductImages('deco-004'),
    category: 'decoration',
    occasion: ['diwali', 'festivals', 'celebration'],
    venue: ['community hall', 'open ground', 'temple', 'home'],
    customizable: true,
    features: ['Thousands of Diyas', 'Rangoli Designs', 'Marigold Garlands', 'Traditional Motifs', 'LED Integration'],
    brochure: '/brochures/diwali-celebrations.pdf'
  },
  {
    id: 'deco-005',
    title: 'Baby Shower Garden Theme',
    description: 'Enchanting garden-themed baby shower decorations with pastel colors, floral arrangements, cute animal props, and dreamy lighting.',
    price: '₹35,000 - ₹1,25,000',
    images: getProductImages('deco-005'),
    category: 'decoration',
    occasion: ['baby shower', 'celebration'],
    venue: ['garden', 'banquet hall', 'home', 'resort'],
    customizable: true,
    features: ['Pastel Color Scheme', 'Floral Arrangements', 'Animal Props', 'Fairy Lights', 'Photo Booth'],
    catalog: '/catalogs/baby-shower-themes.pdf'
  },

  // CORPORATE SOLUTIONS
  {
    id: 'corp-001',
    title: 'Government Scheme Launch Events',
    description: 'Complete event management for government scheme launches including stage setup, audio-visual equipment, security coordination, and media management.',
    price: '₹10,00,000 - ₹1,00,00,000',
    images: getProductImages('corp-001'),
    category: 'corporate',
    occasion: ['government', 'launch', 'scheme', 'public program'],
    venue: ['auditorium', 'convention center', 'open ground', 'stadium'],
    requirements: ['permits', 'security', 'media coverage', 'transportation'],
    customizable: true,
    features: ['Stage Setup', 'Audio Visual Systems', 'Security Coordination', 'Media Management', 'VIP Arrangements'],
    brochure: '/brochures/government-events.pdf'
  },
  {
    id: 'corp-002',
    title: 'Product Launch & Marketing Events',
    description: 'Professional product launch events with brand activation, interactive displays, influencer management, and comprehensive marketing support.',
    price: '₹2,50,000 - ₹15,00,000',
    images: getProductImages('corp-002'),
    category: 'corporate',
    occasion: ['product launch', 'marketing', 'brand activation'],
    venue: ['hotel', 'convention center', 'mall', 'office premises'],
    customizable: true,
    requirements: ['permits', 'media coverage', 'photography'],
    features: ['Brand Activation', 'Interactive Displays', 'Influencer Management', 'Live Streaming', 'Social Media Integration'],
    catalog: '/catalogs/product-launches.pdf'
  },
  {
    id: 'corp-003',
    title: 'Annual Corporate Gifting Program',
    description: 'Year-round corporate gifting solutions for festivals, employee appreciation, client relationships, and special occasions with inventory management.',
    price: '₹1,000 - ₹10,000 per piece',
    images: getProductImages('corp-003'),
    category: 'corporate',
    occasion: ['festivals', 'appreciation', 'client relations', 'employee recognition'],
    customizable: true,
    features: ['Inventory Management', 'Bulk Pricing', 'Custom Branding', 'Quality Assurance', 'Timely Delivery', 'Storage Solutions'],
    brochure: '/brochures/annual-corporate-gifting.pdf'
  },
  {
    id: 'corp-004',
    title: 'Trade Show & Exhibition Setup',
    description: 'Complete trade show booth design and setup with interactive displays, product showcases, branding elements, and lead generation systems.',
    price: '₹3,00,000 - ₹20,00,000',
    images: getProductImages('corp-004'),
    category: 'corporate',
    occasion: ['trade show', 'exhibition', 'business'],
    venue: ['convention center', 'exhibition hall'],
    customizable: true,
    requirements: ['permits', 'transportation', 'security'],
    features: ['Booth Design', 'Interactive Displays', 'Product Showcases', 'Lead Generation', 'Brand Integration'],
    catalog: '/catalogs/trade-show-solutions.pdf'
  },
  {
    id: 'corp-005',
    title: 'Employee Recognition Programs',
    description: 'Comprehensive employee recognition and award programs with custom trophies, certificates, gift packages, and ceremony management.',
    price: '₹5,00,000 - ₹25,00,000',
    images: getProductImages('corp-005'),
    category: 'corporate',
    occasion: ['employee recognition', 'achievement', 'appreciation'],
    venue: ['office premises', 'hotel', 'auditorium'],
    customizable: true,
    features: ['Custom Trophies', 'Certificates', 'Gift Packages', 'Ceremony Management', 'Photography', 'Video Production'],
    brochure: '/brochures/employee-recognition.pdf'
  }
];

export const occasions = [
  'wedding', 'engagement', 'birthday', 'anniversary', 'diwali', 'holi', 'navratri', 
  'festivals', 'corporate', 'government', 'achievement', 'appreciation', 'launch', 
  'celebration', 'personal', 'business', 'student', 'baby shower', 'naming ceremony',
  'new year', 'reception', 'party', 'marketing', 'brand activation', 'client relations',
  'employee recognition', 'trade show', 'exhibition', 'public program', 'scheme',
  'product launch', 'award ceremony'
];

export const venues = [
  'banquet hall', 'outdoor garden', 'palace', 'home', 'restaurant', 'hall', 
  'community hall', 'open ground', 'temple', 'auditorium', 'convention center', 
  'office premises', 'hotel', 'resort', 'heritage venue', 'garden', 'stadium',
  'mall', 'exhibition hall'
];

export const requirements = [
  'permits', 'security', 'media coverage', 'catering', 'entertainment', 
  'photography', 'transportation', 'accommodation', 'audio visual',
  'catering coordination'
];