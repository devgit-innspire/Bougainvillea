import { useRef, useState } from 'react';
import { ROOMS, TOTAL_ROOMS, roomPhotoPath, LINKS, SECTIONS, fill } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Eyebrow, BloomMark, Icon, Wave } from './Botanical.jsx';
import Lightbox from './Lightbox.jsx';

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const word = (n) => WORDS[n] || String(n);
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const T = SECTIONS.stays;

function StayCard({ room, onPhotos }) {
  const [cover, ...rest] = room.photos;
  const thumbs = rest.slice(0, 3);
  const more = room.photos.length - 1 - thumbs.length;

  return (
    <article className="stay" id={`stay-${room.id}`} aria-labelledby={`stay-${room.id}-title`}>
      <div className="stay__media">
        <button className="stay__cover" onClick={(e) => onPhotos(room, 0, e.currentTarget)} aria-label={fill(T.viewPhotosAriaLabel, { name: room.name })}>
          <img
            src={img(roomPhotoPath(cover), true)}
            srcSet={`${img(roomPhotoPath(cover), true)} 800w, ${img(roomPhotoPath(cover))} 1600w`}
            sizes="(max-width: 900px) 92vw, 46vw"
            alt={cover.alt}
            loading="lazy"
            width="800"
            height="533"
          />
          <span className="stay__count"><BloomMark /> {room.unitLabel}</span>
        </button>
        {thumbs.length > 0 && (
          <ul className="stay__thumbs">
            {thumbs.map((p, i) => (
              <li key={p.img}>
                <button onClick={(e) => onPhotos(room, i + 1, e.currentTarget)} aria-label={fill(T.openPhotoAriaLabel, { alt: p.alt })}>
                  <img src={img(roomPhotoPath(p), true)} alt="" loading="lazy" width="800" height="533" />
                  {i === thumbs.length - 1 && more > 0 && <span className="stay__more" aria-hidden="true">+{more}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="stay__body">
        <h3 id={`stay-${room.id}-title`}>{room.name}</h3>
        <p>{room.text}</p>
        <ul className="stay__features" aria-label={fill(T.featuresAriaLabel, { name: room.name })}>
          {room.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <div className="stay__ctas">
          <a className="btn btn--primary btn--sm" href={LINKS.bookingEngine} target="_blank" rel="noopener">
            {T.bookLabel}
          </a>
          <button className="stay__link" onClick={(e) => onPhotos(room, 0, e.currentTarget)}>
            {fill(T.viewPhotosLabel, { count: room.photos.length })} <Icon name="right" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Stays() {
  const [active, setActive] = useState(null); // { room, index }
  const trigger = useRef(null);

  const openPhotos = (room, index, el) => {
    trigger.current = el;
    setActive({ room, index });
  };

  return (
    <section className="stays section" id="stays" aria-labelledby="stays-title">
      <Wave />
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <Eyebrow>{T.eyebrow}</Eyebrow>
            <h2 id="stays-title">{cap(fill(T.heading, { totalRooms: word(TOTAL_ROOMS), stayTypes: word(ROOMS.length) }))}</h2>
          </div>
          <p className="section-head__aside section-head__aside--dark">
            {T.intro}
          </p>
        </div>

        <ul className="stays__summary" aria-label={T.summaryAriaLabel}>
          {ROOMS.map((r) => (
            <li key={r.id}><a href={`#stay-${r.id}`}><strong>{r.summaryCount || r.units}</strong> {r.shortName || r.name}</a></li>
          ))}
          <li className="stays__total"><strong>{TOTAL_ROOMS}</strong> {T.totalLabel}</li>
        </ul>

        <div className="stays__grid">
          {ROOMS.map((r) => <StayCard key={r.id} room={r} onPhotos={openPhotos} />)}
        </div>
      </div>

      <Lightbox
        title={active?.room.name}
        items={(active?.room.photos || []).map((p) => ({ src: img(roomPhotoPath(p)), alt: p.alt }))}
        index={active ? active.index : null}
        setIndex={(i) => setActive((a) => (i === null ? null : { ...a, index: typeof i === 'function' ? i(a.index) : i }))}
        returnFocus={trigger}
      />
    </section>
  );
}
