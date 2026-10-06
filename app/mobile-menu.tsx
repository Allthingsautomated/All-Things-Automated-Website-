"use client";

import { useEffect, useRef, useState } from "react";

type Link = { href: string; label: string };

// Menu button and full-screen panel for screens ≤1080px, where the desktop nav is hidden.
export function MobileMenu({ links, phone, bookHref }: { links: Link[]; phone: { display: string; tel: string }; bookHref: string }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  function close() {
    setOpen(false);
    button.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("nav a")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      // Keep focus inside the panel.
      const focusable = [...panel.current.querySelectorAll<HTMLElement>("a, button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    function onResize() {
      if (window.innerWidth > 1080) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className="menuBtn"
        aria-controls="mobileNav"
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <div ref={panel} id="mobileNav" className="mobileNav" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <button type="button" className="menuClose" aria-label="Close menu" onClick={close}>Close <span aria-hidden="true">×</span></button>
        <nav aria-label="Mobile navigation">
          {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        </nav>
        <div className="mobileNavActions">
          <a className="button dark" href={bookHref} onClick={() => setOpen(false)}>Book assessment <span aria-hidden="true">↗</span></a>
          <a className="phone" href={`tel:${phone.tel}`}>Call {phone.display}</a>
        </div>
      </div>
    </>
  );
}
