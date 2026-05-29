"use client";

import { useEffect, useState } from "react";

const BRAND_NAME = "Jami's Kitchen";
const LOGO_PATH = "/jamis/logo.png";

type JamisLogoProps = {
  className?: string;
  /** Visual scale: nav ~36, hero ~120, footer ~64 */
  size?: number;
  dark?: boolean;
  /** stacked = hero/footer, inline = nav */
  layout?: "stacked" | "inline" | "auto";
  /** When false, show only the mark (monogram or logo image). Use on hero where the h1 carries the name. */
  showWordmark?: boolean;
};

export function JamisLogo({
  className = "",
  size = 48,
  dark = false,
  layout = "auto",
  showWordmark = true,
}: JamisLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const resolvedLayout =
    layout === "auto" ? (size >= 80 ? "stacked" : "inline") : layout;
  const scale = size / 48;

  useEffect(() => {
    let cancelled = false;
    fetch(LOGO_PATH, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setLogoUrl(LOGO_PATH);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={showWordmark ? BRAND_NAME : `${BRAND_NAME} logo`}
        width={size}
        height={size}
        className={`rounded-full bg-white object-contain p-1 shadow-[0_4px_20px_rgba(196,30,58,0.25)] ${className}`}
      />
    );
  }

  if (!showWordmark) {
    return (
      <span className={`inline-flex ${className}`} aria-hidden>
        <BrandMonogram
          scale={resolvedLayout === "stacked" ? scale * 1.35 : scale}
          dark={dark}
        />
      </span>
    );
  }

  const jamisSize = Math.round(14 * scale);
  const kitchenSize = Math.round(10 * scale);
  const gap = Math.max(0, Math.round(2 * scale));

  const jamisClass = dark
    ? "text-[var(--accent-bright)]"
    : "text-[var(--accent-bright)]";
  const kitchenClass = dark ? "text-[var(--foreground)]" : "text-white";

  const outlineStyle = {
    textShadow: [
      "0 0 1px #9e182e",
      "0 0 1px #9e182e",
      "1px 1px 0 #9e182e",
      "-1px 1px 0 #9e182e",
      "1px -1px 0 #9e182e",
      "-1px -1px 0 #9e182e",
      "0 2px 8px rgba(0,0,0,0.35)",
    ].join(", "),
  };

  if (resolvedLayout === "inline") {
    return (
      <span
        className={`inline-flex items-center gap-2 ${className}`}
        aria-label={BRAND_NAME}
      >
        <BrandMonogram scale={scale} dark={dark} />
        <span className="inline-flex flex-col leading-none">
          <span
            className={`font-serif font-bold uppercase tracking-[0.06em] ${jamisClass}`}
            style={{ fontSize: jamisSize, ...outlineStyle }}
          >
            Jami&apos;s
          </span>
          <span
            className={`font-sans font-semibold uppercase tracking-[0.28em] ${kitchenClass}`}
            style={{ fontSize: kitchenSize, marginTop: gap }}
          >
            Kitchen
          </span>
        </span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center text-center ${className}`}
      aria-label={BRAND_NAME}
    >
      <BrandMonogram scale={scale * 1.35} dark={dark} />
      <span
        className={`mt-3 font-serif font-bold uppercase tracking-[0.08em] ${jamisClass}`}
        style={{ fontSize: jamisSize * 1.35, ...outlineStyle }}
      >
        Jami&apos;s
      </span>
      <span
        className={`font-sans font-semibold uppercase tracking-[0.32em] ${kitchenClass}`}
        style={{ fontSize: kitchenSize * 1.15, marginTop: gap + 2 }}
      >
        Kitchen
      </span>
    </div>
  );
}

function BrandMonogram({ scale, dark }: { scale: number; dark: boolean }) {
  const box = Math.round(36 * scale);
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c41e3a] to-[#9e182e] shadow-[0_4px_16px_rgba(196,30,58,0.45)] ring-2 ring-[#f5c518]/80"
      style={{ width: box, height: box }}
      aria-hidden
    >
      <span
        className={`font-serif font-bold ${dark ? "text-white" : "text-[#f5c518]"}`}
        style={{ fontSize: Math.round(18 * scale), lineHeight: 1 }}
      >
        J
      </span>
      <svg
        viewBox="0 0 24 24"
        className="absolute -right-0.5 -top-1 text-white drop-shadow"
        style={{ width: Math.round(14 * scale), height: Math.round(14 * scale) }}
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M6 17c0-2.2 1.8-4 4-4h4c1.1 0 2-.9 2-2V9H6v8zm2-10h8l-1.5-3h-5L8 7z"
        />
      </svg>
    </span>
  );
}
