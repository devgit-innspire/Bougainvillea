import { useRef, useState } from 'react';
import { INSTA_POSTS, LINKS, SECTIONS, fill } from '../data/site.js';
import { asset } from '../lib/asset.js';
import { Eyebrow, Icon } from './Botanical.jsx';
import Lightbox from './Lightbox.jsx';

const src = (name, small = false) => asset(`assets/img/insta/${name}${small ? '-sm' : ''}.jpg`);

export default function Instagram() {
  const T = SECTIONS.instagram;
  const [index, setIndex] = useState(null);
  const trigger = useRef(null);

  return (
    <section className="insta section section--sand" id="instagram" aria-labelledby="insta-title">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <Eyebrow>{T.eyebrow}</Eyebrow>
            <h2 id="insta-title">{T.heading}</h2>
          </div>
          <a className="btn btn--outline btn--sm" href={LINKS.instagram} target="_blank" rel="noopener">
            {T.followLabel} <Icon name="right" />
          </a>
        </div>
        <ul className="insta-grid">
          {INSTA_POSTS.map((p, i) => (
            <li key={p.img} className="insta-post">
              <button
                aria-label={fill(T.openPhotoAriaLabel, { alt: p.alt })}
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setIndex(i);
                }}
              >
                <img src={src(p.img, true)} alt={p.alt} loading="lazy" width="480" height="600" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox
        items={INSTA_POSTS.map((p) => ({ src: src(p.img), alt: p.alt }))}
        index={index}
        setIndex={setIndex}
        returnFocus={trigger}
      />
    </section>
  );
}
