import { HIGHLIGHTS, SECTIONS } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Eyebrow, BloomSpray, Wave } from './Botanical.jsx';

export function Story() {
  const T = SECTIONS.story;
  const [a, b] = T.images;
  return (
    <section className="story section" id="story" aria-labelledby="story-title">
      <div className="wrap story__grid">
        <div className="story__text">
          <Eyebrow>{T.eyebrow}</Eyebrow>
          <h2 id="story-title">{T.heading}</h2>
          {T.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <p className="story__sign">{T.signature}</p>
        </div>
        <figure className="story__media">
          <BloomSpray className="story__spray" />
          <img
            className="story__img story__img--a"
            src={img(a.img, true)}
            srcSet={`${img(a.img, true)} 800w, ${img(a.img)} 1600w`}
            sizes="(max-width: 900px) 90vw, 40vw"
            alt={a.alt}
            loading="lazy"
            width="800"
            height="533"
          />
          <img
            className="story__img story__img--b"
            src={img(b.img, true)}
            alt={b.alt}
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
  const T = SECTIONS.highlights;
  return (
    <section className="highlights section section--sand" aria-labelledby="hl-title">
      <Wave variant="b" />
      <div className="wrap">
        <div className="section-head">
          <Eyebrow>{T.eyebrow}</Eyebrow>
          <h2 id="hl-title">{T.heading}</h2>
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
