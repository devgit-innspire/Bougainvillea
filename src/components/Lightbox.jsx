import { useRef } from 'react';
import { Icon } from './Botanical.jsx';
import { useModal } from '../lib/ui.js';

/** Full-screen photo viewer. `items` are { src, alt }; `index` null means closed. */
export default function Lightbox({ items, index, setIndex, returnFocus, title }) {
  const open = index !== null;
  const dialog = useModal(open, () => setIndex(null), returnFocus);
  const touchX = useRef(0);
  const item = open ? items[index] : null;
  const go = (d) => setIndex((index + d + items.length) % items.length);

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={title ? `${title} photos` : 'Photo viewer'}
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
      {item && <img src={item.src} alt={item.alt} />}
      {item && (
        <p className="lightbox__cap">
          {title && <strong>{title} · </strong>}
          {item.alt} · {index + 1} / {items.length}
        </p>
      )}
      <button className="icon-btn lightbox__close" aria-label="Close photo viewer" onClick={() => dialog.current.close()} autoFocus>
        <Icon name="close" className="" />
      </button>
      {items.length > 1 && (
        <>
          <button className="icon-btn viewer__nav viewer__nav--prev" aria-label="Previous photo" onClick={() => go(-1)}>
            <Icon name="left" className="" />
          </button>
          <button className="icon-btn viewer__nav viewer__nav--next" aria-label="Next photo" onClick={() => go(1)}>
            <Icon name="right" className="" />
          </button>
        </>
      )}
    </dialog>
  );
}
