// Bougainvillea visual signature: one shared SVG sprite plus small composable pieces.
// Real bougainvillea "flowers" are three papery bracts around three tiny cream florets —
// the shapes below follow that anatomy so the motif reads as the plant, not a generic flower.

const BRACT = 'M0-2C-8-5-13-13-11-21-9-27-4-30 0-31 4-30 9-27 11-21 13-13 8-5 0-2Z';
const VEINS = 'M0-3V-28M0-11-6-17M0-11 6-17M0-19-4-24M0-19 4-24';
const LEAF = 'M0 0C7-7 19-7 26 0 19 7 7 7 0 0Z';

export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="g-bract" cx="0" cy="0" r="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8A2A3B" />
          <stop offset=".45" stopColor="#B94758" />
          <stop offset="1" stopColor="#E38394" />
        </radialGradient>
        <linearGradient id="g-bract-solo" x1="0" y1="0" x2="0" y2="-31" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9C3245" />
          <stop offset="1" stopColor="#E58A9A" />
        </linearGradient>
        <linearGradient id="g-leaf" x1="0" y1="0" x2="26" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5F7D5A" />
          <stop offset="1" stopColor="#9AAE93" />
        </linearGradient>
      </defs>

      {/* Full-colour bloom */}
      <symbol id="bloom" viewBox="-33 -33 66 66">
        {[0, 120, 240].map((r, i) => (
          <g key={r} transform={`rotate(${r + (i === 1 ? 6 : i === 2 ? -4 : 0)}) scale(${i === 0 ? 1 : i === 1 ? 0.94 : 0.97})`}>
            <path d={BRACT} fill="url(#g-bract)" />
            <path d={VEINS} stroke="#F6C9D1" strokeWidth=".7" strokeLinecap="round" fill="none" opacity=".45" />
          </g>
        ))}
        {[-90, 30, 150].map((a) => {
          const x = Math.cos((a * Math.PI) / 180) * 3.6;
          const y = Math.sin((a * Math.PI) / 180) * 3.6;
          return (
            <g key={a} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`}>
              <circle r="2.4" fill="#FBF3E6" />
              <circle r=".8" fill="#E6C26E" />
            </g>
          );
        })}
      </symbol>

      {/* Flat single-colour mark for labels, favicon-scale use */}
      <symbol id="bloom-mark" viewBox="-33 -33 66 66">
        {[0, 120, 240].map((r) => (
          <path key={r} d={BRACT} fill="currentColor" transform={`rotate(${r})`} />
        ))}
        <circle r="4.6" fill="#F7F1E7" />
        <circle r="1.8" fill="currentColor" opacity=".55" />
      </symbol>

      {/* A single fallen bract, for drifting petals */}
      <symbol id="bract" viewBox="-14 -33 28 34">
        <path d={BRACT} fill="url(#g-bract-solo)" />
        <path d={VEINS} stroke="#F6C9D1" strokeWidth=".7" strokeLinecap="round" fill="none" opacity=".4" />
      </symbol>

      <symbol id="leaf" viewBox="0 -8 26 16">
        <path d={LEAF} fill="url(#g-leaf)" />
        <path d="M1 0H24" stroke="#EFE5D5" strokeWidth=".6" opacity=".5" />
      </symbol>

      {/* UI icons */}
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></symbol>
      <symbol id="i-left" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></symbol>
      <symbol id="i-right" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></symbol>
      <symbol id="i-muted" viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" /><path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></symbol>
      <symbol id="i-sound" viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" /><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" /></symbol>
      <symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 00-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1012 2.2zm0 17.7c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.3z" /></symbol>
      <symbol id="i-star" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0C18.5 15.4 12 21 12 21z" /><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.7" /></symbol>
    </svg>
  );
}

export function Icon({ name, className = 'ico' }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Small flat mark used beside labels and headings. */
export function BloomMark({ className = 'bloom-mark' }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href="#bloom-mark" />
    </svg>
  );
}

/** Full-colour bloom. */
export function Bloom({ className = 'bloom', style }) {
  return (
    <svg className={className} style={style} aria-hidden="true" focusable="false">
      <use href="#bloom" />
    </svg>
  );
}

/** A thin flowering branch: stem, leaves, two open blooms and a bud. */
export function BloomSpray({ className = '', flip = false }) {
  return (
    <svg
      className={`spray ${className}`}
      viewBox="0 0 240 150"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path className="spray__stem" d="M4 140C40 120 70 96 104 82s74-22 98-52" fill="none" strokeWidth="1.6" strokeLinecap="round" />
      <path className="spray__stem" d="M104 82c6-18 2-34-8-48M156 62c16 4 30 18 36 34" fill="none" strokeWidth="1.2" strokeLinecap="round" />
      <use href="#leaf" x="30" y="116" width="30" height="18" transform="rotate(-38 45 125)" />
      <use href="#leaf" x="62" y="96" width="28" height="17" transform="rotate(22 76 104)" />
      <use href="#leaf" x="122" y="66" width="30" height="18" transform="rotate(-28 137 75)" />
      <use href="#leaf" x="170" y="70" width="26" height="16" transform="rotate(48 183 78)" />
      <use href="#leaf" x="86" y="40" width="24" height="15" transform="rotate(-70 98 48)" />
      <use href="#bloom" x="178" y="4" width="52" height="52" />
      <use href="#bloom" x="80" y="14" width="36" height="36" transform="rotate(-20 98 32)" />
      <use href="#bloom" x="178" y="86" width="30" height="30" transform="rotate(35 193 101)" />
      <use href="#bract" x="10" y="122" width="10" height="13" transform="rotate(-60 15 128)" />
    </svg>
  );
}

/** Slow-falling petals for dark, atmospheric sections. Purely decorative. */
const PETALS = [
  { left: '6%', size: 26, delay: 0, dur: 21, rot: -20 },
  { left: '24%', size: 18, delay: 7, dur: 25, rot: 30 },
  { left: '46%', size: 22, delay: 13, dur: 23, rot: 10 },
  { left: '64%', size: 16, delay: 3, dur: 27, rot: -40 },
  { left: '82%', size: 24, delay: 9, dur: 22, rot: 50 },
  { left: '94%', size: 15, delay: 16, dur: 26, rot: -10 }
];
export function PetalDrift() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <svg
          key={i}
          className="petals__p"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.2,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.dur}s`,
            '--r': `${p.rot}deg`
          }}
        >
          <use href="#bract" />
        </svg>
      ))}
    </div>
  );
}

/** Organic top edge for a section; fills with the section's own background. */
export function Wave({ variant = 'a' }) {
  const d =
    variant === 'a'
      ? 'M0 42C180 12 360 6 560 26s420 34 620 10c120-14 200-20 260-14V60H0Z'
      : 'M0 20C220 48 420 52 640 30S1080 0 1260 18c70 7 130 18 180 26V60H0Z';
  return (
    <svg className="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

/** Centered ornament: hairline — bloom — hairline. */
export function BloomRule({ className = '' }) {
  return (
    <div className={`bloom-rule ${className}`} aria-hidden="true">
      <span />
      <Bloom className="bloom-rule__bloom" />
      <span />
    </div>
  );
}

/** Section eyebrow label with the flat bloom mark. */
export function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>
      <BloomMark />
      {children}
    </p>
  );
}
