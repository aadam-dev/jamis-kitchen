import { MapPin, Truck, MessageCircle } from "lucide-react";
import { MapEmbed, MAPS_LINK } from "./MapEmbed";
import { LOCATION } from "@/lib/business";

type PickupLocationPanelProps = {
  mapsHref?: string;
  whatsappOrderHref: string;
};

export function PickupLocationPanel({
  mapsHref = MAPS_LINK,
  whatsappOrderHref,
}: PickupLocationPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.05fr] md:items-stretch">
      <div className="flex flex-col justify-center gap-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)] flex items-center gap-2">
          <MapPin className="w-4 h-4" aria-hidden />
          Pickup & delivery
        </p>
        <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
          Based in Nima, serving Accra
        </h2>
        <p className="text-lg leading-relaxed text-[var(--muted)]">
          Jami&apos;s Kitchen cooks to order from the Nima area. There is no
          dine-in shop yet. Order for{" "}
          <strong className="font-medium text-[var(--foreground)]">pickup</strong>{" "}
          at {LOCATION} or{" "}
          <strong className="font-medium text-[var(--foreground)]">delivery</strong>{" "}
          around Accra via WhatsApp.
        </p>
        <ul className="space-y-3 text-sm text-[var(--muted)]">
          <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-[var(--surface-light)] px-4 py-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
            <span>
              <span className="block font-medium text-[var(--foreground)]">
                Pickup landmark
              </span>
              {LOCATION}
            </span>
          </li>
          <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-[var(--surface-light)] px-4 py-3">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
            <span>
              <span className="block font-medium text-[var(--foreground)]">
                Delivery
              </span>
              Available around Accra. Confirm fee and time on WhatsApp when you
              order.
            </span>
          </li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent-bright)]"
          >
            <MapPin className="w-4 h-4" aria-hidden />
            Get directions
          </a>
          <a
            href={whatsappOrderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            Order on WhatsApp
          </a>
        </div>
      </div>
      <div className="min-h-[280px] overflow-hidden rounded-[20px] shadow-[var(--shadow-dark)] ring-1 ring-white/10">
        <MapEmbed />
      </div>
    </div>
  );
}
