import { PROPERTY, LINKS, NAV, waLink, WA_DEFAULT } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Icon, PetalDrift, BloomRule } from './Botanical.jsx';
import { Brand } from './Header.jsx';

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <img src={img('city-lights', true)} alt="" loading="lazy" aria-hidden="true" />
      <div className="final-cta__shade" aria-hidden="true" />
      <PetalDrift />
      <div className="wrap final-cta__inner">
        <BloomRule className="bloom-rule--light" />
        <h2 id="cta-title">Planning a quiet escape?</h2>
        <p>Book online directly or get in touch with our team.</p>
        <div className="hero__ctas">
          <a className="btn btn--light" href={LINKS.bookingEngine} target="_blank" rel="noopener">Book your stay</a>
          <a className="btn btn--ghost-light" href={waLink(WA_DEFAULT)} target="_blank" rel="noopener">
            <Icon name="whatsapp" /> WhatsApp us
          </a>
        </div>
        <a className="final-cta__booking" href={LINKS.booking} target="_blank" rel="noopener">
          Prefer Booking.com? View our listing ↗
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  const { address: a } = PROPERTY;
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <Brand light />
          <p className="footer__tag">A private pool villa in the Doon hills.</p>
        </div>
        <div>
          <h3>Visit</h3>
          <p>{a.street},<br />{a.locality}, {a.region} {a.postalCode}</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>
            <a href={`tel:${PROPERTY.phone}`}>{PROPERTY.phoneDisplay}</a><br />
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener">WhatsApp</a><br />
            {PROPERTY.hours}
          </p>
        </div>
        <div>
          <h3>Find us on</h3>
          <ul className="footer__links">
            <li><a href={LINKS.bookingEngine} target="_blank" rel="noopener">Book direct (Best rate)</a></li>
            <li><a href={LINKS.googleMaps} target="_blank" rel="noopener">Google Maps &amp; reviews</a></li>
            <li><a href={LINKS.booking} target="_blank" rel="noopener">Booking.com</a></li>
            <li><a href={LINKS.businessSite} target="_blank" rel="noopener">Business profile site</a></li>
          </ul>
        </div>
      </div>
      <nav className="wrap footer__nav" aria-label="Footer">
        {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <div className="wrap footer__base">
        <p>© 2026 {PROPERTY.name}, Dehradun</p>
        <p>Best rates guaranteed on direct booking.</p>
      </div>
    </footer>
  );
}

export function FloatingCta({ visible }) {
  return (
    <div className={`float-cta${visible ? ' is-visible' : ''}`}>
      <a className="float-cta__wa" href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" aria-label="Enquire on WhatsApp">
        <Icon name="whatsapp" className="" /><span>WhatsApp</span>
      </a>
      <a className="btn btn--primary" href={LINKS.bookingEngine} target="_blank" rel="noopener">Book now</a>
    </div>
  );
}
