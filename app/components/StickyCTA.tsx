"use client";

import { useEffect, useState } from "react";
import { useCart } from "./cart/CartProvider";

const PHONE_PRIMARY = "tel:+233535494913";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Nima+Shell+Filling+Station+Free+Pipe+Accra+Ghana";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const { openCart, itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-2 border-t border-[var(--border)] bg-[var(--card)]/95 px-3 py-3 shadow-lg backdrop-blur sm:hidden"
      role="group"
      aria-label="Quick actions"
    >
      <button
        type="button"
        onClick={() => openCart("cart")}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
      >
        <span aria-hidden>🛒</span>
        Cart{itemCount > 0 ? ` (${itemCount})` : ""}
      </button>
      <a
        href={PHONE_PRIMARY}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[var(--accent)] px-3 py-3 text-sm font-semibold text-[var(--accent-bright)] transition hover:bg-[var(--accent)]/10"
      >
        <span aria-hidden>📞</span> Call
      </a>
      <a
        href={MAPS}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full border-2 border-white/20 px-3 py-3 text-[var(--foreground)]"
        aria-label="Directions"
      >
        <span aria-hidden>📍</span>
      </a>
    </div>
  );
}
