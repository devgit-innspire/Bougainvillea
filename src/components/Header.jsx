import { NAV, PROPERTY, LINKS, SECTIONS, fill } from '../data/site.js';
import { BloomMark, Icon } from './Botanical.jsx';

const T = SECTIONS.header;

export function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand--light' : ''}`} href="#top" aria-label={fill(T.brandAriaLabel, { name: PROPERTY.name })}>
      <svg className="brand__mark" aria-hidden="true">
        <use href="#bloom" />
      </svg>
      <span className="brand__name">
        {T.brandName}<em>{T.brandNameEmphasis}</em>
      </span>
    </a>
  );
}

export default function Header() {
  return (
    <>
      <div className="topbar">
        <div className="wrap topbar__inner">
          <span><Icon name="pin" /> {T.location}</span>
          <span className="topbar__mid"><BloomMark className="bloom-mark bloom-mark--xs" /> {T.frontDesk}</span>
          <a href={`tel:${PROPERTY.phone}`}>{PROPERTY.phoneDisplay}</a>
        </div>
      </div>
      <header className="nav" id="nav">
        <div className="wrap nav__inner">
          <Brand />
          <nav aria-label={T.navAriaLabel}>
            <ul className="nav__links">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <a
            className="btn btn--primary btn--sm"
            href={LINKS.bookingEngine}
            target="_blank"
            rel="noopener"
          >
            {T.bookLabel}
          </a>
        </div>
      </header>
    </>
  );
}
