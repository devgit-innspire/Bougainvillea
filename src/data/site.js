// Single source of truth for property facts. Everything here is verified from the
// existing Google Business Profile site — do not add rates or availability.

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '');

export const PROPERTY = {
  name: 'The Bougainvillea Retreat',
  shortName: 'Bougainvillea Retreat',
  tagline: 'Private pool villa in Dehradun',
  description:
    'A quietly luxurious hillside retreat in Bhagwant Pur, Dehradun with 7 rooms — Tara Villa (1 BHK), Valley View rooms (available single or combined as a 3 BHK Villa), a Private Pool Villa and Rustic Cottages. Mountain views, candlelit evenings and rooftop dining. Rated 4.7/5 from 506+ Google reviews.',
  phone: '+919258497632',
  phoneDisplay: '+91 92584 97632',
  whatsapp: '919258497632',
  address: {
    street: '241MI, Mauja, Punkul Gaon, Bhagwant Pur',
    locality: 'Dehradun',
    region: 'Uttarakhand',
    regionCode: 'IN-UT',
    postalCode: '248009',
    country: 'IN'
  },
  geo: { lat: 30.4143969, lng: 78.0687796 },
  rating: { value: 4.7, count: 506 },
  hours: 'Open 24 hours, every day'
};

export const LINKS = {
  googleMaps: 'https://www.google.com/maps/place/?q=place_id:ChIJszFhFZHXCDkRW85IANosYic',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=The+Bougainvillea+Retreat%2C+Bhagwant+Pur%2C+Dehradun&destination_place_id=ChIJszFhFZHXCDkRW85IANosYic',
  mapEmbed: 'https://www.google.com/maps?q=30.4143969,78.0687796&z=14&output=embed',
  bookingEngine: 'https://digibooking.in/H433?utm_source=website',
  booking: 'https://www.booking.com/hotel/in/the-bougainvillea-riverside.html',
  businessSite: 'https://the-bougainvillea-villa.grexa.site/'
};

export const waLink = (text) => `https://wa.me/${PROPERTY.whatsapp}?text=${encodeURIComponent(text)}`;
export const WA_DEFAULT = "Hi! I'd like to enquire about a stay at The Bougainvillea Retreat.";

export const NAV = [
  { href: '#story', label: 'The villa' },
  { href: '#stays', label: 'Stays' },
  { href: '#reels', label: 'Reels' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#location', label: 'Location' }
];

export const TRUST = [
  { k: 'Private pool', v: 'In the Private Pool Villa' },
  { k: 'Mountain views', v: 'Doon valley & city lights' },
  { k: '4.7 / 5', v: '506+ Google reviews', star: true },
  { k: '7 rooms', v: 'Five ways to stay' }
];

export const HIGHLIGHTS = [
  { img: 'indoor-pool', title: 'Private pool', text: 'An exclusive pool just for your group — no sharing, no interruptions.', alt: 'Indoor pool with stone wall and loungers', tall: true },
  { img: 'sunset-swing', title: 'Mountain & valley views', text: 'Wake to green hills; watch the city lights come on at night.', alt: 'Garden swing silhouetted against a hillside sunset' },
  { img: 'night-dining', title: 'Terrace of Doon', text: 'Rooftop dining with a 360° view, bonfires and barbecue evenings.', alt: 'Candlelit rooftop dining tables overlooking the city at night' },
  { img: 'bedroom-view', title: 'Spacious, cosy interiors', text: 'Timber ceilings, soft light and corners made for slow mornings.', alt: 'Bright bedroom with a large window looking out to the hills' },
  { img: 'garden-bougainvillea', title: 'Gardens in bloom', text: 'Terraced lawns, swings and bougainvillea everywhere you look.', alt: 'Lawn and garden framed by flowering bougainvillea' }
];

// Room inventory as confirmed by the client (7 physical rooms across 5 stay types,
// including individual 1 BHK / 2 room stays and the combined 3 BHK villa option).
export const ROOMS = [
  {
    id: 'tara-villa',
    name: 'Tara Villa',
    shortName: 'Tara Villa (1 BHK)',
    units: 1,
    unitLabel: '1 BHK villa',
    summaryCount: '1',
    text: 'A self-contained one-bedroom villa with its own kitchen, a sunlit living area and a balcony looking out over the Doon valley. Available on its own, or combined with Valley View rooms as a 3 BHK villa.',
    features: ['1 BHK', 'Private kitchen', 'Living area', 'Valley-view balcony', 'Available single or 3 BHK'],
    photos: [
      { img: 'tara-bedroom', alt: 'Tara Villa bedroom with king bed and bay window overlooking the valley' },
      { img: 'tara-living', alt: 'Tara Villa living area with sofa opening onto a valley-view balcony' },
      { img: 'tara-balcony', alt: 'Tara Villa balcony seating overlooking the hills at sunset' },
      { img: 'tara-kitchen', alt: 'Tara Villa kitchen with hob, chimney, microwave and fridge' },
      { img: 'tara-bath', alt: 'Tara Villa bathroom with blue tiles and vessel basin' },
      { img: 'tara-garden', alt: 'Lawn seating with a swing beside Tara Villa' }
    ]
  },
  {
    id: 'valley-view',
    name: 'Valley View Rooms',
    shortName: 'Valley View Rooms',
    units: 2,
    unitLabel: '2 rooms',
    summaryCount: '2',
    text: 'Bright rooms framed by panoramic windows and garden greenery, opening onto a lawn with open Doon valley views. Available as individual rooms, or combined with Tara Villa as a 3 BHK villa.',
    features: ['Valley views', 'Garden & lawn', 'Lounge seating', 'Available single or 3 BHK'],
    photos: [
      { img: 'valley-bedroom', alt: 'Valley View bedroom with king bed and balcony view across the valley' },
      { img: 'valley-sunset', alt: 'Valley View suite lounge and balcony at sunset overlooking the Doon valley' },
      { img: 'valley-lounge', alt: 'Valley View suite living area with sofa and mountain view' },
      { img: 'valley-room', alt: 'Valley View room with red armchairs and floor-to-ceiling windows' },
      { img: 'valley-lawn', alt: 'Lawn dining table outside the Valley View rooms at sunset' },
      { img: 'valley-outer', alt: 'Courtyard outside the Valley View rooms with bougainvillea' },
      { img: 'valley-garden', alt: 'Garden outside the Valley View rooms at dusk with city lights below' }
    ]
  },
  {
    id: 'three-bhk-villa',
    name: '3 BHK Villa (Tara & Valley View)',
    shortName: '3 BHK Combined Villa',
    units: 3,
    isCombination: true,
    unitLabel: '3 BHK villa · 3 bedrooms',
    summaryCount: '3 BHK',
    text: 'Book the complete 3-bedroom villa — seamlessly combining 1 BHK Tara Villa and both Valley View rooms for families and groups. Includes 3 bedrooms, private kitchen, two living lounges, a valley-facing balcony and private garden lawn. (Also available to book individually as 1 BHK Tara Villa or single Valley View rooms).',
    features: ['3 King bedrooms', 'Private kitchen', '2 Living lounges', 'Valley-view balcony', 'Garden lawn', 'Sleeps up to 9-10'],
    photos: [
      { img: 'tara-bedroom', alt: 'Master bedroom with king bed and valley-view bay window' },
      { img: 'valley-sunset', alt: 'Valley View lounge opening onto the Doon valley balcony at sunset' },
      { img: 'valley-bedroom', alt: 'Valley View second bedroom with king bed and mountain view' },
      { img: 'tara-living', alt: 'Tara Villa living area opening onto the sunset balcony' },
      { img: 'tara-kitchen', alt: 'Self-contained kitchen with hob, chimney, microwave and fridge' },
      { img: 'valley-lounge', alt: 'Spacious second lounge with sofa and panoramic valley windows' },
      { img: 'tara-balcony', alt: 'Private balcony seating overlooking the hills at sunset' },
      { img: 'valley-lawn', alt: 'Private lawn dining table outside with mountain backdrop' },
      { img: 'tara-bath', alt: 'Modern bathroom with blue tiles and vessel basin' }
    ]
  },
  {
    id: 'private-pool-villa',
    name: 'Private Pool Villa',
    shortName: 'Private Pool Villa',
    units: 2,
    unitLabel: '2 rooms',
    summaryCount: '2',
    text: 'Two bedrooms and a private living suite built around an exclusive indoor pool — slow afternoons in the water, with loungers, stone feature wall and no interruptions.',
    features: ['Private indoor pool', '2 Bedrooms', 'Suite lounge', 'Pool deck & loungers'],
    photos: [
      { img: 'pool-villa-pool', alt: 'Private indoor pool with blue lighting and a stone feature wall' },
      { img: 'pool-villa-lounge', alt: 'Private Pool Villa suite lounge with sofa bed, lamp and study desk' },
      { img: 'pool-villa-suite', alt: 'Pool Villa suite bedroom and lounge overlooking the indoor pool stone wall' },
      { img: 'pool-villa-bedroom', alt: 'Pool Villa bedroom with king bed and patterned teal feature wall' },
      { img: 'pool-villa-bedroom2', alt: 'Pool Villa bedroom with king bed, wardrobe and vanity desk' },
      { img: 'pool-villa-seating', alt: 'Lounge seating area beside the private indoor pool glass wall' },
      { img: 'pool-loungers', alt: 'Indoor pool lined with palms and loungers', shared: true },
      { img: 'indoor-pool', alt: 'Private pool with wooden loungers', shared: true }
    ]
  },
  {
    id: 'rustic-cottage',
    name: 'Rustic Cottages',
    shortName: 'Rustic Cottages',
    units: 2,
    unitLabel: '2 rooms',
    summaryCount: '2',
    text: 'Timber A-frame cottages with vaulted wooden ceilings, cosy lounges and a porch terrace looking out to the hills.',
    features: ['Timber A-frame', 'Vaulted ceilings', 'Porch terrace'],
    photos: [
      { img: 'rustic-bedroom', alt: 'Rustic Cottage bedroom under a vaulted timber ceiling' },
      { img: 'rustic-exterior', alt: 'The twin timber A-frame Rustic Cottages at golden hour' },
      { img: 'rustic-living', alt: 'Rustic Cottage lounge with sofas and a hill-view window' },
      { img: 'rustic-bedroom2', alt: 'Rustic Cottage bedroom with patterned bench and wall sconces' },
      { img: 'rustic-porch', alt: 'Rustic Cottage porch terrace with wooden armchairs and valley views' }
    ]
  }
];
export const TOTAL_ROOMS = ROOMS.filter((r) => !r.isCombination).reduce((n, r) => n + r.units, 0);

// Rooms photos live in assets/img/rooms/, except shared shots reused from the main set.
export const roomPhotoPath = (p) => (p.shared ? p.img : `rooms/${p.img}`);

export const REELS = [
  {
    id: 'the-villa',
    title: 'The villa',
    caption: 'Timber gables, terraced gardens and valley views.',
    longCaption: 'Timber gables, terraced gardens and wide valley views.',
    duration: 'PT22S'
  },
  {
    id: 'poolside',
    title: 'Poolside moments',
    caption: 'A private pool to call your own.',
    longCaption: 'A private pool to call your own — slow afternoons, no sharing.',
    duration: 'PT20S'
  },
  {
    id: 'date-nights',
    title: 'Date nights & celebrations',
    caption: 'Candlelit dinners as the valley lights up.',
    longCaption: 'Candlelit dinners on the Terrace of Doon as the valley lights up.',
    duration: 'PT19S'
  }
];

export const EXPERIENCES = [
  { img: 'night-terrace', title: 'Couples', text: 'Romantic stays with peaceful surroundings, cosy interiors and candlelight dinners arranged for two.', alt: 'Lantern-lit terrace seating at night above the city' },
  { img: 'lawn', title: 'Families', text: 'Spacious rooms, open lawns and a safe, relaxed setting for getaways with children and loved ones.', alt: 'Wide green lawn beside the villa with hills behind' },
  { img: 'swing-patio', title: 'Celebrations', text: 'Birthdays, anniversaries and proposals — with beautiful spaces that make every moment memorable.', alt: 'Garden patio with a swing seat under flowering bougainvillea' },
  { img: 'villa-hillside', title: 'Pets welcome', text: 'Your furry companions are part of the family — relax together surrounded by nature.', alt: 'The villa on a green hillside with bougainvillea in bloom' }
];

export const GALLERY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'villa', label: 'Villa & gardens' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'pool', label: 'Pool' },
  { id: 'dining', label: 'Dining & views' }
];

export const GALLERY = [
  { img: 'villa-steps', cat: 'villa', size: 'wide', alt: 'Stone steps leading up to the A-frame villa at golden hour' },
  { img: 'pool-loungers', cat: 'pool', alt: 'Indoor pool lined with palms and loungers' },
  { img: 'aframe-bedroom', cat: 'rooms', size: 'tall', alt: 'Rustic Cottage bedroom under a timber A-frame ceiling' },
  { img: 'terrace-view', cat: 'dining', alt: 'Open terrace with umbrella seating and a misty valley view' },
  { img: 'living-room', cat: 'rooms', alt: 'Living room with cushioned sofas and hill views' },
  { img: 'city-lights', cat: 'dining', size: 'wide', alt: 'Dehradun city lights glittering across the valley at night' },
  { img: 'swing-patio', cat: 'villa', alt: 'Swing seat on a tiled patio beneath bougainvillea' },
  { img: 'indoor-pool', cat: 'pool', size: 'tall', alt: 'Indoor pool with a stone feature wall' },
  { img: 'suite', cat: 'rooms', alt: 'Suite with pink curtains and a timber ceiling' },
  { img: 'garden-bougainvillea', cat: 'villa', alt: 'Garden lawn with flowering bougainvillea' },
  { img: 'night-dining', cat: 'dining', size: 'wide', alt: 'Candlelit rooftop tables above the city at night' },
  { img: 'lounge', cat: 'rooms', alt: 'Lounge with sectional sofa and valley view' },
  { img: 'bathroom', cat: 'rooms', alt: 'Modern bathroom with vessel basin and glass shower' },
  { img: 'sunset-swing', cat: 'villa', alt: 'Swing silhouetted at sunset over the hills' }
];

// Verbatim Google reviews (light punctuation fixes only); names shortened.
export const REVIEWS = [
  { quote: 'Amazing place to visit. We experienced candle night dinner which was amazing, they have arranged it so nice which was looking too pretty as well. Must visit place.', by: 'M. Aqil', date: 'Sep 2026', feature: true },
  { quote: 'Good accommodating service and tidy rooms. Sandeep Bhaiya is very polite and kind. Perfect person for hospitality. Would love to come back :)', by: 'Mudita S.', date: 'Sep 2026' },
  { quote: "Loved the experience. Came with my family on my father's birthday and it was a wholesome experience.", by: 'Aman R.', date: 'Sep 2026' },
  { quote: 'Great experience… had arranged a custom candle night dinner. It was beautiful.', by: 'Pallabi S.', date: 'Oct 2026' }
];
