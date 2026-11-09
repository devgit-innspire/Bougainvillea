import { TRUST, LINKS, SECTIONS } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Eyebrow, Icon, Wave, Bloom } from './Botanical.jsx';

const T = SECTIONS.hero;

export default function Hero() {
  return (
    <>
      <section className="hero" id="top" aria-labelledby="hero-title">
        {/* hero-dusk is also preloaded in index.html, so its image ID stays in code. */}
        <picture className="hero__media">
          <source media="(max-width: 900px)" srcSet={img('hero-dusk-1200')} />
          <img
            src={img('hero-dusk')}
            alt={T.imageAlt}
            fetchPriority="high"
            width="2400"
            height="1800"
          />
        </picture>
        <div className="hero__shade" aria-hidden="true" />
        <div className="wrap hero__content">
          <h1 id="hero-title">
            <Eyebrow light as="span">{T.eyebrow}</Eyebrow>
            <span className="hero__tagline">
              {T.headingLine1}<br />
              <em>{T.headingLine2}</em>
            </span>
          </h1>
          <p className="hero__lede">
            {T.intro}
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href={LINKS.bookingEngine} target="_blank" rel="noopener">{T.bookLabel}</a>
            <a className="btn btn--ghost-light" href="#reels">{T.watchLabel} <Icon name="play" /></a>
          </div>
        </div>
      </section>

      <section className="trust" aria-label={SECTIONS.trust.ariaLabel}>
        <Wave />
        <ul className="wrap trust__list">
          {TRUST.map((t, i) => (
            <li key={t.title}>
              {i > 0 && <Bloom className="trust__sep" />}
              <span className="trust__k">
                {t.showStar && <Icon name="star" className="ico ico--star" />} {t.title}
              </span>
              <span className="trust__v">{t.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
