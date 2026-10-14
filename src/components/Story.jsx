import { HIGHLIGHTS } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Eyebrow, BloomSpray, Wave } from './Botanical.jsx';

export function Story() {
  return (
    <section className="story section" id="story" aria-labelledby="story-title">
      <div className="wrap story__grid">
        <div className="story__text">
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story-title">Slow mornings, warm evenings, and room to breathe.</h2>
          <p>
            The Bougainvillea Retreat sits on a quiet hillside in Bhagwant Pur, far from city noise yet an easy drive from
            Dehradun. Timber A-frame roofs, terraced gardens and walls draped in bougainvillea frame wide views across the valley.
          </p>
          <p>
            Come for a romantic weekend, a family getaway or a celebration with the people who matter — and let the days unfold
            around the pool, the garden and the long golden hour.
          </p>
          <p className="story__sign">— Bhagwant Pur, Dehradun</p>
        </div>
        <figure className="story__media">
          <BloomSpray className="story__spray" />
          <img
            className="story__img story__img--a"
            src={img('villa-aframe', true)}
            srcSet={`${img('villa-aframe', true)} 800w, ${img('villa-aframe')} 1600w`}
            sizes="(max-width: 900px) 90vw, 40vw"
            alt="Timber A-frame gables of the villa with potted flowers along the terrace"
            loading="lazy"
            width="800"
            height="533"
          />
          <img
            className="story__img story__img--b"
            src={img('bougainvillea-entrance', true)}
            alt="Bougainvillea arching over the garden entrance and seating area"
            loading="lazy"
            width="800"
            height="533"
          />
        </figure>
      </div>
    </section>
  );
}

export function Highlights() {
  return (
    <section className="highlights section section--sand" aria-labelledby="hl-title">
      <Wave variant="b" />
      <div className="wrap">
        <div className="section-head">
          <Eyebrow>Villa highlights</Eyebrow>
          <h2 id="hl-title">Everything you need to do very little.</h2>
        </div>
        <ul className="hl-grid">
          {HIGHLIGHTS.map((h) => (
            <li key={h.title} className={`hl${h.tall ? ' hl--tall' : ''}`}>
              <img src={img(h.img, true)} alt={h.alt} loading="lazy" width="800" height="533" />
              <div className="hl__body">
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
