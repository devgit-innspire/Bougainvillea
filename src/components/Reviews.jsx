import { REVIEWS, PROPERTY, LINKS } from '../data/site.js';
import { Eyebrow, Icon, Bloom, Wave } from './Botanical.jsx';

export default function Reviews() {
  const { value, count } = PROPERTY.rating;
  return (
    <section className="reviews section" id="reviews" aria-labelledby="rev-title">
      <Wave variant="b" />
      <div className="wrap">
        <div className="reviews__head">
          <div>
            <Eyebrow>Guest reviews</Eyebrow>
            <h2 id="rev-title">Loved by guests.</h2>
          </div>
          <a className="score" href={LINKS.googleMaps} target="_blank" rel="noopener" aria-label={`Rated ${value} out of 5 from ${count} plus Google reviews — open on Google`}>
            <span className="score__num">{value}</span>
            <span className="score__meta">
              <span className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" className="" />)}
              </span>
              {count}+ Google reviews
            </span>
          </a>
        </div>
        <ul className="rev-grid">
          {REVIEWS.map((r) => (
            <li key={r.by} className={`rev${r.feature ? ' rev--feature' : ''}`}>
              {r.feature && <Bloom className="rev__bloom" />}
              <blockquote>“{r.quote}”</blockquote>
              <p className="rev__by">{r.by} <span>· Google review, {r.date}</span></p>
            </li>
          ))}
        </ul>
        <a className="link-arrow" href={LINKS.googleMaps} target="_blank" rel="noopener">
          Read all reviews on Google <Icon name="right" />
        </a>
      </div>
    </section>
  );
}
