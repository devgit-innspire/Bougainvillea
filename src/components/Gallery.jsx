import { useRef, useState } from 'react';
import { GALLERY, GALLERY_FILTERS } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Eyebrow, Wave } from './Botanical.jsx';
import Lightbox from './Lightbox.jsx';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(null);
  const trigger = useRef(null);
  const visible = GALLERY.filter((g) => filter === 'all' || g.cat === filter);

  return (
    <section className="gallery section section--sand" id="gallery" aria-labelledby="gal-title">
      <Wave />
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 id="gal-title">Take a closer look.</h2>
          </div>
          <div className="chips" role="group" aria-label="Filter photos">
            {GALLERY_FILTERS.map((f) => (
              <button key={f.id} className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <ul className="gal-grid">
          {visible.map((g, i) => (
            <li key={g.img} className={`g${g.size ? ` g--${g.size}` : ''}`}>
              <button
                aria-label={`Open photo: ${g.alt}`}
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setIndex(i);
                }}
              >
                <img src={img(g.img, true)} alt={g.alt} loading="lazy" width="800" height="533" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={visible.map((g) => ({ src: img(g.img), alt: g.alt }))} index={index} setIndex={setIndex} returnFocus={trigger} />
    </section>
  );
}
