import { REVIEWS, PROPERTY, LINKS, SECTIONS, fill } from '../data/site.js';
import { Eyebrow, Icon, Bloom, Wave } from './Botanical.jsx';

export default function Reviews() {
  const { value, count } = PROPERTY.rating;
  const T = SECTIONS.reviews;
  return (
    <section className="reviews section" id="reviews" aria-labelledby="rev-title">
      <Wave variant="b" />
      <div className="wrap">
        <div className="reviews__head">
          <div>
            <Eyebrow>{T.eyebrow}</Eyebrow>
            <h2 id="rev-title">{T.heading}</h2>
          </div>
          <a className="score" href={LINKS.googleMaps} target="_blank" rel="noopener" aria-label={fill(T.scoreAriaLabel, { value, count })}>
            <span className="score__num">{value}</span>
            <span className="score__meta">
              <span className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" className="" />)}
              </span>
              {fill(T.scoreLabel, { count })}
            </span>
          </a>
        </div>
        <ul className="rev-grid">
          {REVIEWS.map((r) => (
            <li key={r.by} className={`rev${r.feature ? ' rev--feature' : ''}`}>
              {r.feature && <Bloom className="rev__bloom" />}
              <blockquote>“{r.quote}”</blockquote>
              <p className="rev__by">{r.by} <span>{fill(T.reviewSource, { date: r.date })}</span></p>
            </li>
          ))}
        </ul>
        <a className="link-arrow" href={LINKS.googleMaps} target="_blank" rel="noopener">
          {T.readAllLabel} <Icon name="right" />
        </a>
      </div>
    </section>
  );
}
