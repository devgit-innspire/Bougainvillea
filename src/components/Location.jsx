import { useEffect, useRef, useState } from 'react';
import { PROPERTY, LINKS } from '../data/site.js';
import { Eyebrow, Wave, BloomSpray } from './Botanical.jsx';

export default function Location() {
  const { address: a } = PROPERTY;
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

  // Only load the Google Maps iframe when the section approaches the viewport.
  useEffect(() => {
    const el = mapRef.current;
    if (!el || !('IntersectionObserver' in window)) return setShowMap(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShowMap(true); io.disconnect(); }
    }, { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="location section section--sand" id="location" aria-labelledby="loc-title">
      <Wave />
      <div className="wrap loc-grid">
        <div className="loc__text">
          <Eyebrow>Location</Eyebrow>
          <h2 id="loc-title">Above the valley, close to the city.</h2>
          <p>A peaceful hillside setting in Bhagwant Pur — away from the crowds, yet an easy drive from Dehradun.</p>
          <address>
            {PROPERTY.name}<br />
            {a.street}<br />
            {a.locality}, {a.region} {a.postalCode}
          </address>
          <div className="loc__ctas">
            <a className="btn btn--primary" href={LINKS.directions} target="_blank" rel="noopener">Get directions</a>
            <a className="btn btn--outline" href={`tel:${PROPERTY.phone}`}>Call {PROPERTY.phoneDisplay}</a>
          </div>
        </div>
        <div className="loc__map" ref={mapRef}>
          <BloomSpray className="loc__spray" flip />
          <div className="loc__frame">
            {showMap ? (
              <iframe
                title={`Map showing ${PROPERTY.name} in Bhagwant Pur, Dehradun`}
                src={LINKS.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <a className="loc__placeholder" href={LINKS.googleMaps} target="_blank" rel="noopener">View on Google Maps</a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
