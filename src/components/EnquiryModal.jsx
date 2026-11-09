import { useEffect, useState } from 'react';
import { LINKS, ROOMS, waLink, SECTIONS, fill } from '../data/site.js';
import { Eyebrow, Icon, BloomSpray } from './Botanical.jsx';
import { useModal } from '../lib/ui.js';

const T = SECTIONS.enquiry;
const MSG = T.whatsappMessage;

const isoToday = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};
const pretty = (v) =>
  new Date(`${v}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// Digits, spaces, +, (, ) and -; at least 8 characters.
const PHONE_RE = /^[+0-9 ()-]{8,}$/;
// Same rule for the input's `pattern` attribute (escaped so it is valid under the `v` regex flag browsers use).
const PHONE_PATTERN = String.raw`[+0-9 \(\)\-]{8,}`;

export default function EnquiryModal({ open, onClose, returnFocus, room }) {
  const dialog = useModal(open, onClose, returnFocus);
  const [error, setError] = useState('');
  const [stay, setStay] = useState(T.anyStayOption);

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
      setError(T.errors.datesMissing);
      (checkin ? f.checkout : f.checkin).focus();
      return;
    }
    if (checkout <= checkin) {
      setError(T.errors.checkoutBeforeCheckin);
      f.checkout.focus();
      return;
    }
    const phone = f.phone.value.trim();
    if (!PHONE_RE.test(phone)) {
      setError(T.errors.phoneInvalid);
      f.phone.focus();
      return;
    }
    setError('');
    const name = f.name.value.trim();
    const note = f.note.value.trim();
    const guests = f.guests.value;
    const occasion = f.occasion.value;
    const lines = [
      MSG.greeting,
      '',
      fill(MSG.dates, { checkin: pretty(checkin), checkout: pretty(checkout) }),
      fill(MSG.stay, { stay }),
      fill(MSG.guests, { guests: guests || '—' }),
      fill(MSG.occasion, { occasion })
    ];
    if (name) lines.push(fill(MSG.name, { name }));
    lines.push(fill(MSG.phone, { phone }));
    if (note) lines.push(fill(MSG.note, { note }));
    window.sa?.('lead', { source: 'enquiry', channel: 'whatsapp', name, phone, checkin, checkout, stay, guests, occasion, note });
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    dialog.current.close();
  };

  return (
    <dialog ref={dialog} className="enquiry" aria-labelledby="enq-title">
      <form className="enquiry__form" onSubmit={submit} noValidate>
        <BloomSpray className="enquiry__spray" />
        <button type="button" className="icon-btn enquiry__close" aria-label={T.closeAriaLabel} onClick={() => dialog.current.close()}>
          <Icon name="close" className="" />
        </button>
        <Eyebrow>{T.eyebrow}</Eyebrow>
        <h2 id="enq-title">{T.heading}</h2>
        <p className="enquiry__lede">{T.intro}</p>
        <div className="field-row">
          <label className="field">
            <span>{T.checkinLabel}</span>
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
            <span>{T.checkoutLabel}</span>
            <input type="date" name="checkout" min={checkin || today} value={checkout} onChange={(e) => setCheckout(e.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>{T.stayLabel}</span>
          <select name="stay" value={stay} onChange={(e) => setStay(e.target.value)}>
            <option>{T.anyStayOption}</option>
            {ROOMS.map((r) => (
              <option key={r.id} value={r.name}>{r.name} ({r.unitLabel})</option>
            ))}
          </select>
        </label>
        <div className="field-row">
          <label className="field"><span>{T.guestsLabel}</span><input type="number" name="guests" min="1" max="30" defaultValue="2" inputMode="numeric" /></label>
          <label className="field">
            <span>{T.occasionLabel}</span>
            <select name="occasion" defaultValue={T.occasions[0]}>
              {T.occasions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
        </div>
        <label className="field"><span>{T.nameLabel}</span><input type="text" name="name" autoComplete="name" /></label>
        <label className="field">
          <span>{T.phoneLabel}</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
            pattern={PHONE_PATTERN}
            placeholder={T.phonePlaceholder}
          />
        </label>
        <label className="field">
          <span>{T.noteLabel} <em>{T.optionalLabel}</em></span>
          <textarea name="note" rows="2" placeholder={T.notePlaceholder} />
        </label>
        <p className="enquiry__error" role="alert">{error}</p>
        <button type="submit" className="btn btn--primary btn--block"><Icon name="whatsapp" /> {T.submitLabel}</button>
        <p className="enquiry__alt">
          {T.orLabel} <a href={LINKS.bookingEngine} target="_blank" rel="noopener">{T.bookDirectLabel}</a>
          <br />
          <a href={LINKS.booking} target="_blank" rel="noopener">{T.bookingComLabel}</a>
        </p>
      </form>
    </dialog>
  );
}
