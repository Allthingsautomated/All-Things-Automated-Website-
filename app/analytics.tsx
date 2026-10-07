"use client";

import { useEffect } from "react";

// Sends tel_click and book_click events to Plausible. lead_submit / builder_submit are sent by the lead form.
export function ClickEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link) return;
      const plausible = (window as unknown as { plausible?: (name: string) => void }).plausible;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) plausible?.("tel_click");
      else if (href === "/book" || href.includes("as.me")) plausible?.("book_click");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
