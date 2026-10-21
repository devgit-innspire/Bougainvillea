import { useEffect, useState } from 'react';
import { LINKS, ROOMS, waLink } from '../data/site.js';
import { Eyebrow, Icon, BloomSpray } from './Botanical.jsx';
import { useModal } from '../lib/ui.js';

const isoToday = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};
const pretty = (v) =>
  new Date(`${v}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const ANY_STAY = 'No preference';

export default function EnquiryModal({ open, onClose, returnFocus, room }) {
  const dialog = useModal(open, onClose, returnFocus);
  const [error, setError] = useState('');
  const [stay, setStay] = useState(ANY_STAY);

  // Preselect the stay the visitor enquired from; otherwise keep their last choice.
  useEffect(() => {
    if (open && room) setStay(room);
  }, [open, room]);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const today = open ? isoToday() : undefined;

  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget.elements;
    if (!checkin || !checkout) {
      setError('Please choose your check-in and check-out dates.');
      (checkin ? f.checkout : f.checkin).focus();
      return;
    }
    if (checkout <= checkin) {
      setError('Check-out needs to be after check-in.');
      f.checkout.focus();
      return;
    }
    setError('');
    const lines = [
      "Hi! I'd like to check availability at The Bougainvillea Retreat.",
      '',
      `Dates: ${pretty(checkin)} → ${pretty(checkout)}`,
      `Stay: ${stay}`,
      `Guests: ${f.guests.value || '—'}`,
      `Occasion: ${f.occasion.value}`
    ];
    if (f.name.value.trim()) lines.push(`Name: ${f.name.value.trim()}`);
    if (f.note.value.trim()) lines.push(`Note: ${f.note.value.trim()}`);
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    dialog.current.close();
  };

  return (
    <dialog ref={dialog} className="enquiry" aria-labelledby="enq-title">
      <form className="enquiry__form" onSubmit={submit} noValidate>
        <BloomSpray className="enquiry__spray" />
        <button type="button" className="icon-btn enquiry__close" aria-label="Close enquiry form" onClick={() => dialog.current.close()}>
          <Icon name="close" className="" />
        </button>
        <Eyebrow>Enquire for availability</Eyebrow>
        <h2 id="enq-title">Plan your stay</h2>
        <p className="enquiry__lede">Share your dates and our team will reply on WhatsApp with availability.</p>
        <div className="field-row">
          <label className="field">
            <span>Check-in</span>
            <input
              type="date"
              name="checkin"
              min={today}
              value={checkin}
              autoFocus
              onChange={(e) => {
                setCheckin(e.target.value);
                if (checkout && checkout <= e.target.value) setCheckout('');
              }}
            />
          </label>
          <label className="field">
            <span>Check-out</span>
            <input type="date" name="checkout" min={checkin || today} value={checkout} onChange={(e) => setCheckout(e.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>Stay</span>
          <select name="stay" value={stay} onChange={(e) => setStay(e.target.value)}>
            <option>{ANY_STAY}</option>
            {ROOMS.map((r) => (
              <option key={r.id} value={r.name}>{r.name} ({r.unitLabel})</option>
            ))}
          </select>
        </label>
        <div className="field-row">
          <label className="field"><span>Guests</span><input type="number" name="guests" min="1" max="30" defaultValue="2" inputMode="numeric" /></label>
          <label className="field">
            <span>Occasion</span>
            <select name="occasion" defaultValue="Getaway">
              <option>Getaway</option>
              <option>Couple stay</option>
              <option>Family trip</option>
              <option>Celebration</option>
              <option>Travelling with pets</option>
            </select>
          </label>
        </div>
        <label className="field"><span>Your name</span><input type="text" name="name" autoComplete="name" /></label>
        <label className="field">
          <span>Anything else? <em>(optional)</em></span>
          <textarea name="note" rows="2" placeholder="Candlelight dinner, early check-in…" />
        </label>
        <p className="enquiry__error" role="alert">{error}</p>
        <button type="submit" className="btn btn--primary btn--block"><Icon name="whatsapp" /> Send on WhatsApp</button>
        <p className="enquiry__alt">
          or <a href={LINKS.bookingEngine} target="_blank" rel="noopener">book directly on DigiBooking ↗</a>
          <br />
          <a href={LINKS.booking} target="_blank" rel="noopener">view our Booking.com listing ↗</a>
        </p>
      </form>
    </dialog>
  );
}
