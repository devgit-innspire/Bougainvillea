import { PROPERTY, LINKS, REELS, GALLERY, INSTA_POSTS, ROOMS, TOTAL_ROOMS, roomPhotoPath, SITE_URL, SEO } from './data/site.js';

const abs = (path) => `${SITE_URL}/${path.replace(/^\//, '')}`;
const imgUrl = (name) => abs(`assets/img/${name}.jpg`);
// Both dates live in content.json (seo.published / seo.lastUpdated).
// Bump lastUpdated when page content changes; it is used as the sitemap <lastmod>.
const PUBLISHED = SEO.published;
const LAST_UPDATED = SEO.lastUpdated;

export function buildJsonLd() {
  const id = `${SITE_URL}/#lodging`;
  const { address: a } = PROPERTY;

  const lodging = {
    '@type': ['LodgingBusiness', 'Resort'],
    '@id': id,
    name: PROPERTY.name,
    alternateName: SEO.alternateNames,
    slogan: PROPERTY.tagline,
    description: PROPERTY.description,
    url: `${SITE_URL}/`,
    telephone: PROPERTY.phone,
    image: SEO.images.map(imgUrl),
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
      dayOfWeek: SEO.openingHours.days,
      opens: SEO.openingHours.opens,
      closes: SEO.openingHours.closes
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: PROPERTY.rating.value,
      reviewCount: PROPERTY.rating.count,
      bestRating: 5
    },
    amenityFeature: SEO.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    petsAllowed: SEO.petsAllowed,
    numberOfRooms: TOTAL_ROOMS,
    containsPlace: ROOMS.map((r) => ({
      '@type': r.id === 'tara-villa' || r.id === 'three-bhk-villa' ? 'Suite' : 'HotelRoom',
      '@id': `${SITE_URL}/#stay-${r.id}`,
      name: `${r.name} — ${PROPERTY.name}`,
      description: r.text,
      url: `${SITE_URL}/#stay-${r.id}`,
      image: r.photos.map((p) => abs(`assets/img/${roomPhotoPath(p)}.jpg`)),
      numberOfRooms: r.units,
      amenityFeature: r.features.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true }))
    })),
    sameAs: [LINKS.googleMaps, LINKS.instagram, LINKS.booking, LINKS.businessSite],
    potentialAction: {
      '@type': 'ReserveAction',
      target: LINKS.bookingEngine,
      name: SEO.bookOnlineActionName
    }
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: PROPERTY.name,
    inLanguage: SEO.language,
    publisher: { '@id': id }
  };

  const page = {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: SEO.title,
    description: PROPERTY.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': id },
    primaryImageOfPage: imgUrl(SEO.images[0]),
    inLanguage: SEO.language
  };

  const videos = REELS.map((r) => ({
    '@type': 'VideoObject',
    name: `${r.title} — ${PROPERTY.name}`,
    description: r.longCaption,
    thumbnailUrl: abs(`assets/img/poster-${r.id}.jpg`),
    contentUrl: abs(`assets/video/${r.id}.mp4`),
    uploadDate: r.uploadDate || PUBLISHED,
    duration: r.duration
  }));

  return { '@context': 'https://schema.org', '@graph': [lodging, website, page, ...videos] };
}

export function buildSitemap() {
  const images = [SEO.images[0], ...new Set([...GALLERY.map((g) => g.img), ...ROOMS.flatMap((r) => r.photos.map(roomPhotoPath))])]
    .concat(INSTA_POSTS.map((p) => `insta/${p.img}`))
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
    <lastmod>${LAST_UPDATED}</lastmod>
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
