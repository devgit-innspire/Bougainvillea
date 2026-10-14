import { useRef, useState } from 'react';
import { GALLERY, GALLERY_FILTERS } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Eyebrow, Icon, Wave } from './Botanical.jsx';
import { useModal } from '../lib/ui.js';

function Lightbox({ items, index, setIndex, returnFocus }) {
  const open = index !== null;
  const dialog = useModal(open, () => setIndex(null), returnFocus);
  const touchX = useRef(0);
  const item = open ? items[index] : null;
  const go = (d) => setIndex((index + d + items.length) % items.length);

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label="Photo viewer"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        else if (e.key === 'ArrowLeft') go(-1);
      }}
      onTouchStart={(e) => { touchX.current = e.changedTouches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      {item && <img src={img(item.img)} alt={item.alt} />}
      {item && <p className="lightbox__cap">{item.alt} · {index + 1} / {items.length}</p>}
      <button className="icon-btn lightbox__close" aria-label="Close photo viewer" onClick={() => dialog.current.close()} autoFocus>
        <Icon name="close" className="" />
      </button>
      <button className="icon-btn viewer__nav viewer__nav--prev" aria-label="Previous photo" onClick={() => go(-1)}>
        <Icon name="left" className="" />
      </button>
      <button className="icon-btn viewer__nav viewer__nav--next" aria-label="Next photo" onClick={() => go(1)}>
        <Icon name="right" className="" />
      </button>
    </dialog>
  );
}

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
      <Lightbox items={visible} index={index} setIndex={setIndex} returnFocus={trigger} />
    </section>
  );
}
