// Thin layer over content.json — the single file the admin panel edits. All copy and
// property facts live there; this module only re-exports them under the names the
// components already use, plus a few derived helpers. Do not add rates or availability.
import content from './content.json';

export const CONTENT = content;
export const SEO = content.seo;
export const SECTIONS = content.sections;

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '');

export const PROPERTY = content.property;
export const LINKS = content.links;
export const NAV = content.nav;
export const WA_DEFAULT = content.whatsappDefaultMessage;
export const waLink = (text) => `https://wa.me/${PROPERTY.whatsapp}?text=${encodeURIComponent(text)}`;

export const TRUST = content.sections.trust.items;
export const HIGHLIGHTS = content.sections.highlights.items;
export const ROOMS = content.sections.stays.rooms;
export const REELS = content.sections.reels.items;
export const EXPERIENCES = content.sections.experiences.items;
export const GALLERY_FILTERS = content.sections.gallery.filters;
export const GALLERY = content.sections.gallery.items;
export const INSTA_POSTS = content.sections.instagram.posts;
export const REVIEWS = content.sections.reviews.items;

// Physical rooms only — the 3 BHK villa is a combination of other rooms.
export const TOTAL_ROOMS = ROOMS.filter((r) => !r.isCombination).reduce((n, r) => n + r.units, 0);

// Room photos live in assets/img/rooms/, except shared shots reused from the main set.
export const roomPhotoPath = (p) => (p.shared ? p.img : `rooms/${p.img}`);

/** Replaces `{token}` placeholders in a content string, e.g. fill('Call {phone}', { phone }). */
export const fill = (text, vars) => text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
