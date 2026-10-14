import { useEffect, useRef, useState } from 'react';
import { REELS } from '../data/site.js';
import { video, poster } from '../lib/asset.js';
import { BloomMark, Icon } from './Botanical.jsx';
import { useModal, useUi } from '../lib/ui.js';

const pad = (n) => String(n).padStart(2, '0');

export default function ReelViewer({ index, onIndex, onClose, returnFocus }) {
  const open = index !== null;
  const dialog = useModal(open, onClose, returnFocus);
  const vid = useRef(null);
  const closeBtn = useRef(null);
  const { openEnquiry } = useUi();
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touch = useRef(null);

  const reel = open ? REELS[index] : null;
  const go = (delta) => onIndex((index + delta + REELS.length) % REELS.length);

  // Always start muted when the viewer opens; keep the visitor's choice while browsing.
  useEffect(() => {
    if (open) {
      setMuted(true);
      closeBtn.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (!open) {
      v.pause();
      v.removeAttribute('src');
      v.load();
      return;
    }
    setProgress(0);
    v.src = video(REELS[index].id);
    v.play().catch(() => setPaused(true));
  }, [open, index]);

  useEffect(() => {
    if (vid.current) vid.current.muted = muted;
  }, [muted]);

  const toggle = () => {
    const v = vid.current;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
    else if (e.key === 'm' || e.key === 'M') setMuted((m) => !m);
    else if (e.key === 'k' || (e.key === ' ' && e.target.tagName !== 'BUTTON')) { e.preventDefault(); toggle(); }
  };

  // Swipe: left/up → next, right/down → previous.
  const onTouchStart = (e) => {
    const t = e.changedTouches[0];
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e) => {
    const s = touch.current;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Date.now() - s.t > 800 || Math.max(Math.abs(dx), Math.abs(dy)) < 50) return;
    if (Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else go(dy < 0 ? 1 : -1);
  };

  return (
    <dialog ref={dialog} className="viewer" aria-labelledby="viewer-title" aria-describedby="viewer-caption" onKeyDown={onKeyDown}>
      <div className="viewer__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <video
          ref={vid}
          className="viewer__video"
          playsInline
          muted
          preload="metadata"
          poster={reel ? poster(reel.id) : undefined}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onEnded={() => go(1)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress((v.currentTime / v.duration) * 100);
          }}
        />
        <div className="viewer__progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
        <div className="viewer__top">
          <span className="viewer__count">{open && `${pad(index + 1)} / ${pad(REELS.length)}`}</span>
          <div className="viewer__top-actions">
            <button className="icon-btn" aria-pressed={!muted} aria-label={muted ? 'Unmute' : 'Mute'} onClick={() => setMuted((m) => !m)}>
              <Icon name={muted ? 'muted' : 'sound'} className="" />
            </button>
            <button ref={closeBtn} className="icon-btn" aria-label="Close reel viewer" onClick={() => dialog.current.close()}>
              <Icon name="close" className="" />
            </button>
          </div>
        </div>
        <button className={`viewer__tap${paused ? ' is-paused' : ''}`} aria-label={paused ? 'Play' : 'Pause'} onClick={toggle} />
        <div className="viewer__overlay">
          <p className="viewer__label"><BloomMark /> <span id="viewer-title">{reel?.title}</span></p>
          <p className="viewer__caption" id="viewer-caption">{reel?.longCaption}</p>
          <button
            className="btn btn--light btn--sm"
            onClick={() => {
              dialog.current.close();
              openEnquiry(null);
            }}
          >
            Check availability
          </button>
        </div>
      </div>
      <button className="viewer__nav viewer__nav--prev icon-btn" aria-label="Previous reel" onClick={() => go(-1)}>
        <Icon name="left" className="" />
      </button>
      <button className="viewer__nav viewer__nav--next icon-btn" aria-label="Next reel" onClick={() => go(1)}>
        <Icon name="right" className="" />
      </button>
      <p className="sr-only" aria-live="polite">{reel && `Reel ${index + 1} of ${REELS.length}: ${reel.title}`}</p>
    </dialog>
  );
}
