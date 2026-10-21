import { TRUST, LINKS } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Eyebrow, Icon, Wave, Bloom } from './Botanical.jsx';

export default function Hero() {
  return (
    <>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <picture className="hero__media">
          <source media="(max-width: 900px)" srcSet={img('hero-dusk-1200')} />
          <img
            src={img('hero-dusk')}
            alt="The Bougainvillea Retreat at dusk, its A-frame villa lit warmly above a candlelit dinner table on the lawn"
            fetchPriority="high"
            width="2400"
            height="1800"
          />
        </picture>
        <div className="hero__shade" aria-hidden="true" />
        <div className="wrap hero__content">
          <Eyebrow light>Villa, cottages &amp; pool villa · Dehradun</Eyebrow>
          <h1 id="hero-title">
            A quiet hillside escape,<br />
            <em>in full bloom.</em>
          </h1>
          <p className="hero__lede">
            Poolside afternoons, mountain light and candlelit evenings — tucked away in Bhagwant Pur, above the Doon valley.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href={LINKS.bookingEngine} target="_blank" rel="noopener">Book now</a>
            <a className="btn btn--ghost-light" href="#reels">Watch the stay <Icon name="play" /></a>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="At a glance">
        <Wave />
        <ul className="wrap trust__list">
          {TRUST.map((t, i) => (
            <li key={t.k}>
              {i > 0 && <Bloom className="trust__sep" />}
              <span className="trust__k">
                {t.star && <Icon name="star" className="ico ico--star" />} {t.k}
              </span>
              <span className="trust__v">{t.v}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
