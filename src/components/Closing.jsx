import { PROPERTY, LINKS, NAV, waLink, WA_DEFAULT, SECTIONS, fill } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Icon, PetalDrift, BloomRule } from './Botanical.jsx';
import { Brand } from './Header.jsx';

export function FinalCta() {
  const T = SECTIONS.finalCta;
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <img src={img(T.backgroundImg, true)} alt="" loading="lazy" aria-hidden="true" />
      <div className="final-cta__shade" aria-hidden="true" />
      <PetalDrift />
      <div className="wrap final-cta__inner">
        <BloomRule className="bloom-rule--light" />
        <h2 id="cta-title">{T.heading}</h2>
        <p>{T.text}</p>
        <div className="hero__ctas">
          <a className="btn btn--light" href={LINKS.bookingEngine} target="_blank" rel="noopener">{T.bookLabel}</a>
          <a className="btn btn--ghost-light" href={waLink(WA_DEFAULT)} target="_blank" rel="noopener">
            <Icon name="whatsapp" /> {T.whatsappLabel}
          </a>
        </div>
        <a className="final-cta__booking" href={LINKS.booking} target="_blank" rel="noopener">
          {T.bookingComLabel}
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  const { address: a } = PROPERTY;
  const T = SECTIONS.footer;
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <Brand light />
          <p className="footer__tag">{T.tagline}</p>
        </div>
        <div>
          <h3>{T.visitHeading}</h3>
          <p>{a.street},<br />{a.locality}, {a.region} {a.postalCode}</p>
        </div>
        <div>
          <h3>{T.contactHeading}</h3>
          <p>
            <a href={`tel:${PROPERTY.phone}`}>{PROPERTY.phoneDisplay}</a><br />
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener">{T.whatsappLabel}</a><br />
            {PROPERTY.hours}
          </p>
        </div>
        <div>
          <h3>{T.findUsHeading}</h3>
          {/* Keys are names from "links"; values are the labels shown. */}
          <ul className="footer__links">
            {Object.entries(T.findUsLinks).map(([key, label]) => (
              <li key={key}><a href={LINKS[key]} target="_blank" rel="noopener">{label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <nav className="wrap footer__nav" aria-label={T.navAriaLabel}>
        {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <div className="wrap footer__base">
        <p>{fill(T.copyright, { name: PROPERTY.name })}</p>
        <p>{T.bestRateNote}</p>
      </div>
    </footer>
  );
}

export function FloatingCta({ visible }) {
  const T = SECTIONS.floatingCta;
  return (
    <div className={`float-cta${visible ? ' is-visible' : ''}`}>
      <a className="float-cta__wa" href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" aria-label={T.whatsappAriaLabel}>
        <Icon name="whatsapp" className="" /><span>{T.whatsappLabel}</span>
      </a>
      <a className="btn btn--primary" href={LINKS.bookingEngine} target="_blank" rel="noopener">{T.bookLabel}</a>
    </div>
  );
}
