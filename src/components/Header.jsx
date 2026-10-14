import { NAV, PROPERTY } from '../data/site.js';
import { BloomMark, Icon } from './Botanical.jsx';
import { useUi } from '../lib/ui.js';

export function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand--light' : ''}`} href="#top" aria-label={`${PROPERTY.name}, home`}>
      <svg className="brand__mark" aria-hidden="true">
        <use href="#bloom" />
      </svg>
      <span className="brand__name">
        The Bougainvillea<em>Retreat</em>
      </span>
    </a>
  );
}

export default function Header() {
  const { openEnquiry } = useUi();
  return (
    <>
      <div className="topbar">
        <div className="wrap topbar__inner">
          <span><Icon name="pin" /> Bhagwant Pur, Dehradun</span>
          <span className="topbar__mid"><BloomMark className="bloom-mark bloom-mark--xs" /> Front desk open 24 hours</span>
          <a href={`tel:${PROPERTY.phone}`}>{PROPERTY.phoneDisplay}</a>
        </div>
      </div>
      <header className="nav" id="nav">
        <div className="wrap nav__inner">
          <Brand />
          <nav aria-label="Primary">
            <ul className="nav__links">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <button className="btn btn--primary btn--sm" onClick={(e) => openEnquiry(e.currentTarget)}>
            Check availability
          </button>
        </div>
      </header>
    </>
  );
}
