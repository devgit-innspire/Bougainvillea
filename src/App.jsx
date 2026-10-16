import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UiContext, prefersReducedMotion } from './lib/ui.js';
import { SvgDefs } from './components/Botanical.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { Story, Highlights } from './components/Story.jsx';
import Stays from './components/Stays.jsx';
import Reels from './components/Reels.jsx';
import ReelViewer from './components/ReelViewer.jsx';
import Experiences from './components/Experiences.jsx';
import Gallery from './components/Gallery.jsx';
import Reviews from './components/Reviews.jsx';
import Location from './components/Location.jsx';
import { FinalCta, Footer, FloatingCta } from './components/Closing.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';

const REVEAL_SELECTOR =
  '.section-head, .reviews__head, .story__text, .story__media, .hl, .stay, .reel-card, .exp, .rev, .loc__text, .loc__map';

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryRoom, setEnquiryRoom] = useState(null);
  const [reelIndex, setReelIndex] = useState(null);
  const [floatVisible, setFloatVisible] = useState(false);
  const enquiryTrigger = useRef(null);
  const reelTrigger = useRef(null);

  const openEnquiry = useCallback((trigger, opts) => {
    enquiryTrigger.current = trigger || null;
    setEnquiryRoom(opts?.room || null);
    setEnquiryOpen(true);
  }, []);
  const openReel = useCallback((i, trigger) => {
    reelTrigger.current = trigger || null;
    setReelIndex(i);
  }, []);
  const ui = useMemo(() => ({ openEnquiry, openReel }), [openEnquiry, openReel]);

  // Sticky-nav shadow + floating CTA (hidden over the hero and the final CTA).
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setFloatVisible(true);
    const nav = document.getElementById('nav');
    let heroIn = true;
    let finalIn = false;
    const sync = () => setFloatVisible(!heroIn && !finalIn);
    const heroIo = new IntersectionObserver(([e]) => {
      heroIn = e.isIntersecting;
      nav.classList.toggle('is-scrolled', !heroIn);
      sync();
    }, { rootMargin: '-120px 0px 0px 0px' });
    const finalIo = new IntersectionObserver(([e]) => { finalIn = e.isIntersecting; sync(); });
    heroIo.observe(document.querySelector('.hero'));
    finalIo.observe(document.querySelector('.final-cta'));
    return () => { heroIo.disconnect(); finalIo.disconnect(); };
  }, []);

  // Reveal-on-scroll is added after hydration so prerendered HTML stays fully visible to crawlers.
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) return; // already on screen: don't hide it
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <UiContext.Provider value={ui}>
      <SvgDefs />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Story />
        <Highlights />
        <Stays />
        <Reels />
        <Experiences />
        <Gallery />
        <Reviews />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta visible={floatVisible} />
      <ReelViewer index={reelIndex} onIndex={setReelIndex} onClose={() => setReelIndex(null)} returnFocus={reelTrigger} />
      <EnquiryModal open={enquiryOpen} room={enquiryRoom} onClose={() => setEnquiryOpen(false)} returnFocus={enquiryTrigger} />
    </UiContext.Provider>
  );
}
