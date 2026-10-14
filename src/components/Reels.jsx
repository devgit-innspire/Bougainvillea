import { useEffect, useRef, useState } from 'react';
import { REELS } from '../data/site.js';
import { video, poster } from '../lib/asset.js';
import { Eyebrow, BloomMark, Icon, PetalDrift, Wave } from './Botanical.jsx';
import { useUi, prefersReducedMotion } from '../lib/ui.js';

function ReelCard({ reel, index }) {
  const { openReel } = useUi();
  const vid = useRef(null);
  const [previewing, setPreviewing] = useState(false);
  const canPreview = useRef(false);

  useEffect(() => {
    canPreview.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion();
  }, []);

  const startPreview = () => {
    const v = vid.current;
    if (!canPreview.current || !v) return;
    if (!v.getAttribute('src')) v.src = video(reel.id); // lazy: nothing loads until first hover
    v.play().then(() => setPreviewing(true)).catch(() => {});
  };
  const stopPreview = () => {
    vid.current?.pause();
    setPreviewing(false);
  };

  return (
    <li className="reel-card">
      <button
        className={`reel-card__btn${previewing ? ' is-previewing' : ''}`}
        aria-label={`Play reel: ${reel.title}. ${reel.caption}`}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onClick={(e) => {
          stopPreview();
          openReel(index, e.currentTarget);
        }}
      >
        <span className="reel-card__media">
          <img src={poster(reel.id)} alt="" loading="lazy" width="720" height="1280" />
          <video ref={vid} muted playsInline loop preload="none" aria-hidden="true" tabIndex={-1} />
        </span>
        <span className="reel-card__play" aria-hidden="true"><Icon name="play" className="" /></span>
        <span className="reel-card__meta">
          <span className="reel-card__label"><BloomMark /> {reel.title}</span>
          <span className="reel-card__caption">{reel.caption}</span>
        </span>
      </button>
    </li>
  );
}

export default function Reels() {
  const track = useRef(null);
  const [active, setActive] = useState(0);

  // Mobile carousel position dots.
  useEffect(() => {
    const el = track.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const cards = [...el.children];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(cards.indexOf(e.target))),
      { root: el, threshold: 0.6 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="reels section section--dark" id="reels" aria-labelledby="reels-title">
      <Wave />
      <PetalDrift />
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <Eyebrow light>Reels</Eyebrow>
            <h2 id="reels-title">See the stay in motion</h2>
          </div>
          <p className="section-head__aside">
            From poolside afternoons to candlelit evenings, take a glimpse inside The Bougainvillea Retreat.
          </p>
        </div>

        <div className="reel-rail">
          <ul className="reel-track" ref={track}>
            {REELS.map((r, i) => <ReelCard key={r.id} reel={r} index={i} />)}
          </ul>
          <div className="reel-rail__controls" aria-hidden="true">
            <span className="reel-dots">
              {REELS.map((r, i) => <i key={r.id} className={i === active ? 'is-active' : ''} />)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
