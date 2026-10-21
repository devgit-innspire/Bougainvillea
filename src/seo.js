import { PROPERTY, LINKS, REELS, GALLERY, ROOMS, TOTAL_ROOMS, roomPhotoPath, SITE_URL } from './data/site.js';

const abs = (path) => `${SITE_URL}/${path.replace(/^\//, '')}`;
const PUBLISHED = '2026-10-14';

export function buildJsonLd() {
  const id = `${SITE_URL}/#lodging`;
  const { address: a } = PROPERTY;

  const lodging = {
    '@type': ['LodgingBusiness', 'Resort'],
    '@id': id,
    name: PROPERTY.name,
    alternateName: 'Bougainvillea Retreat Dehradun',
    description: PROPERTY.description,
    url: `${SITE_URL}/`,
    telephone: PROPERTY.phone,
    image: [abs('assets/img/hero-dusk.jpg'), abs('assets/img/villa-aframe.jpg'), abs('assets/img/indoor-pool.jpg')],
    logo: abs('favicon.svg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country
    },
    geo: { '@type': 'GeoCoordinates', latitude: PROPERTY.geo.lat, longitude: PROPERTY.geo.lng },
    hasMap: LINKS.googleMaps,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: PROPERTY.rating.value,
      reviewCount: PROPERTY.rating.count,
      bestRating: 5
    },
    amenityFeature: ['Private pool', 'Mountain view', 'City view', 'Garden', 'Rooftop restaurant', 'Candlelight dinners'].map(
      (name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })
    ),
    petsAllowed: true,
    numberOfRooms: TOTAL_ROOMS,
    containsPlace: ROOMS.map((r) => ({
      '@type': r.id === 'tara-villa' ? 'Suite' : 'HotelRoom',
      '@id': `${SITE_URL}/#stay-${r.id}`,
      name: `${r.name} — ${PROPERTY.name}`,
      description: r.text,
      url: `${SITE_URL}/#stay-${r.id}`,
      image: r.photos.map((p) => abs(`assets/img/${roomPhotoPath(p)}.jpg`)),
      numberOfRooms: r.units,
      amenityFeature: r.features.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true }))
    })),
    sameAs: [LINKS.bookingEngine, LINKS.googleMaps, LINKS.booking, LINKS.businessSite],
    potentialAction: {
      '@type': 'ReserveAction',
      target: LINKS.bookingEngine,
      name: 'Book a room online'
    }
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: PROPERTY.name,
    inLanguage: 'en-IN',
    publisher: { '@id': id }
  };

  const page = {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: `${PROPERTY.name} · Villa, Cottages & Pool Villa Stays in Dehradun`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': id },
    primaryImageOfPage: abs('assets/img/hero-dusk.jpg'),
    inLanguage: 'en-IN'
  };

  const videos = REELS.map((r) => ({
    '@type': 'VideoObject',
    name: `${r.title} — ${PROPERTY.name}`,
    description: r.longCaption,
    thumbnailUrl: abs(`assets/img/poster-${r.id}.jpg`),
    contentUrl: abs(`assets/video/${r.id}.mp4`),
    uploadDate: PUBLISHED,
    duration: r.duration
  }));

  return { '@context': 'https://schema.org', '@graph': [lodging, website, page, ...videos] };
}

export function buildSitemap() {
  const images = ['hero-dusk', ...new Set([...GALLERY.map((g) => g.img), ...ROOMS.flatMap((r) => r.photos.map(roomPhotoPath))])]
    .map((n) => `    <image:image><image:loc>${abs(`assets/img/${n}.jpg`)}</image:loc></image:image>`)
    .join('\n');
  const videos = REELS.map(
    (r) => `    <video:video>
      <video:thumbnail_loc>${abs(`assets/img/poster-${r.id}.jpg`)}</video:thumbnail_loc>
      <video:title>${r.title.replace('&', '&amp;')} — ${PROPERTY.name}</video:title>
      <video:description>${r.longCaption}</video:description>
      <video:content_loc>${abs(`assets/video/${r.id}.mp4`)}</video:content_loc>
    </video:video>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${PUBLISHED}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${images}
${videos}
  </url>
</urlset>
`;
}

export const buildRobots = () => `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
