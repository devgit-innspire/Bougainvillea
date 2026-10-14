import { createContext, useContext, useEffect, useRef } from 'react';

export const UiContext = createContext({ openEnquiry: () => {}, openReel: () => {} });
export const useUi = () => useContext(UiContext);

/**
 * Drives a native <dialog> as a modal from React state.
 * Native showModal() gives us focus trapping, Esc-to-close and an inert background.
 * Focus returns to `returnFocus` (or the previously focused element) on close.
 */
export function useModal(open, onClose, returnFocus) {
  const ref = useRef(null);
  const lastFocus = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      lastFocus.current = returnFocus?.current || document.activeElement;
      d.showModal();
      document.body.classList.add('has-modal');
    } else if (!open && d.open) {
      d.close();
    }
  }, [open, returnFocus]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const handleClose = () => {
      if (![...document.querySelectorAll('dialog')].some((x) => x.open)) {
        document.body.classList.remove('has-modal');
      }
      onCloseRef.current?.();
      const el = lastFocus.current;
      if (el && document.contains(el) && !el.closest('dialog')) el.focus();
    };
    // Clicking the backdrop (the dialog element itself) closes it.
    const handleClick = (e) => { if (e.target === d) d.close(); };
    d.addEventListener('close', handleClose);
    d.addEventListener('click', handleClick);
    return () => {
      d.removeEventListener('close', handleClose);
      d.removeEventListener('click', handleClick);
    };
  }, []);

  return ref;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
