"use client";

import { useEffect, useState } from "react";
import { SectionReveal } from "./components/SectionReveal";
import { HeroBackground } from "./components/HeroBackground";
import { JamisLogo } from "./components/JamisLogo";
import { MapEmbed, MAPS_LINK } from "./components/MapEmbed";
import { CartButton } from "./components/cart/CartButton";
import { MenuOrderSection } from "./components/cart/MenuOrderSection";
import { useCart } from "./components/cart/CartProvider";
import {
  FEATURED_ITEMS,
  getServing,
  fmtGHS,
} from "@/lib/menu";
import {
  LOCATION,
  TAGLINE,
  SLOGAN,
  MENU_PLACEHOLDER_NOTE,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY_DISPLAY,
  PHONE_PRIMARY_TEL,
  PHONE_SECONDARY_TEL,
  WHATSAPP_INQUIRY,
  WHATSAPP_SECONDARY,
} from "@/lib/business";
import {
  MapPin,
  Phone,
  MessageCircle,
  Utensils,
  Truck,
  Clock,
  ShoppingBag,
} from "lucide-react";

const MAPS = MAPS_LINK;

const EXPERIENCE_PILLARS = [
  {
    title: "Delicious & filling",
    body: "Generous portions and bold Ghanaian street-food comfort.",
  },
  {
    title: "Affordable",
    body: "Great value for Nima, Accra and everyone we serve.",
  },
  {
    title: "Fast delivery",
    body: "WhatsApp ordering with delivery available around Accra.",
  },
];

const GALLERY_ITEMS = [
  { src: "/jamis/hero_new.png", alt: "Angwamo rice bowl with egg and gizzard" },
  { src: "/jamis/flyer.png", alt: "Plantain and gizzard plate from Jami's Kitchen" },
  { src: "/jamis/flyer.png", alt: "Fresh mixed salad bowl" },
  { src: "/jamis/hero_new.png", alt: "Hearty Ghanaian meal spread" },
];

function FeaturedAddButton({
  menuId,
  defaultSize,
}: {
  menuId: string;
  defaultSize: string;
}) {
  const { addItem } = useCart();
  const serving = getServing(menuId, defaultSize);

  if (!serving) return null;

  return (
    <button
      type="button"
      onClick={() => addItem(menuId, defaultSize, 1)}
      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
    >
      <ShoppingBag className="w-4 h-4" />
      Add to cart ({fmtGHS(serving.price)})
    </button>
  );
}

function OrderNowButton({ className = "" }: { className?: string }) {
  const { openCart, itemCount } = useCart();

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={() => (itemCount > 0 ? openCart("cart") : scrollToMenu())}
      className={className}
    >
      <MessageCircle className="w-5 h-5" />
      {itemCount > 0 ? "View cart & checkout" : "Order now"}
    </button>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const { openCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id], div[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const navItemClass = (id: string) =>
    `transition-colors duration-200 ${
      activeSection === id
        ? "text-[var(--accent-bright)] font-semibold"
        : "text-white/80 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div
        id="home"
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[var(--surface-dark)]/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2" aria-label="Jami's Kitchen home">
            <JamisLogo size={40} layout="inline" />
          </a>
          <nav className="flex items-center gap-3 md:gap-7 text-sm font-medium">
            <a href="#about" className={`hidden md:inline ${navItemClass("about")}`}>
              About
            </a>
            <a href="#menu" className={navItemClass("menu")}>
              Menu
            </a>
            <a href="#visit" className={`hidden md:inline ${navItemClass("visit")}`}>
              Visit
            </a>
            <a href="#contact" className={`hidden md:inline ${navItemClass("contact")}`}>
              Contact
            </a>
            <div className="flex items-center gap-2 md:gap-3 md:border-l md:border-white/20 md:pl-7">
              <CartButton />
              <button
                type="button"
                onClick={() => openCart("cart")}
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-white shadow-lg transition hover:bg-[var(--accent-hover)]"
              >
                <MessageCircle className="w-4 h-4" /> Checkout
              </button>
            </div>
          </nav>
        </div>
      </div>

      <HeroBackground>
        <div className="flex flex-col items-center gap-6 pt-10">
          <span className="rounded-full border border-[var(--accent-bright)]/30 bg-[var(--accent)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-bright)]">
            Nima · Accra
          </span>
          <div className="hidden md:block">
            <JamisLogo size={120} layout="stacked" />
          </div>
          <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold tracking-tight drop-shadow-sm md:text-6xl">
            Jami&apos;s Kitchen
          </h1>
          <p className="font-script text-2xl text-[var(--accent-bright)] md:text-3xl">
            {TAGLINE}
          </p>
          <p className="max-w-2xl text-balance font-sans text-lg text-white/95 md:text-xl">
            Angwamo, plantain, gizzard, sausage and fresh salad, cooked with love
            in Nima.
          </p>
          <p className="text-sm text-white/80 md:text-base">
            Pick up at Shell Filling Station or order for delivery around Accra.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 z-20">
            <OrderNowButton className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(196,30,58,0.45)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] hover:shadow-[0_0_25px_rgba(196,30,58,0.55)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-bright)] focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]" />
            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]"
            >
              <MapPin className="w-5 h-5" /> Get directions
            </a>
            <a
              href={PHONE_PRIMARY_TEL}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]"
            >
              <Phone className="w-5 h-5" /> Call now
            </a>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-black/40 px-4 py-2 text-sm backdrop-blur">
            <Truck className="w-4 h-4 text-[var(--accent-bright)]" />
            <span className="text-white/90">Delivery available around Accra</span>
          </div>
          <div className="mt-5 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 z-20">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur shadow-lg">
              <p className="text-xl font-semibold text-white">10am - 8pm</p>
              <p className="text-xs text-white/70">Mon - Sat · Closed Sunday</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur shadow-lg">
              <p className="text-2xl font-semibold text-[var(--accent-bright)]">Affordable</p>
              <p className="text-sm text-white/70">Generous portions</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur shadow-lg">
              <p className="text-2xl font-semibold text-white">WhatsApp</p>
              <p className="text-sm text-white/70">Cart checkout to order</p>
            </div>
          </div>
        </div>
      </HeroBackground>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionReveal className="mb-20 md:mb-28" delay={0.1}>
          <div
            id="about"
            className="grid gap-8 rounded-3xl border border-white/5 bg-[var(--card)] p-8 shadow-[var(--shadow-soft)] md:grid-cols-[1.4fr_1fr] md:p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-light)]/50 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                <span className="brush-label text-white normal-case tracking-normal font-script text-lg">
                  About us
                </span>
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
                Built for flavour, value and satisfaction
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
                Jami&apos;s Kitchen serves honest Ghanaian street food at Nima Shell
                Filling Station. Angwamo, plantain, gizzard, sausage and fresh salad
                made daily for locals and delivery customers across Accra.
              </p>
            </div>
            <div className="grid gap-3 relative z-10">
              {EXPERIENCE_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-white/5 bg-[var(--surface-light)] p-5 shadow-sm transition hover:bg-[var(--surface-light)]/80"
                >
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mb-20 md:mb-28" delay={0.1}>
          <div className="grid gap-8 rounded-3xl border border-white/5 bg-gradient-to-r from-[var(--surface-light)] to-[var(--surface-dark-soft)] p-8 shadow-[var(--shadow-soft)] md:grid-cols-[1fr_1.4fr] md:p-10 items-center">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)] flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Our spot
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
                Find us in Nima
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                We&apos;re at {LOCATION}. Stop by for a hot plate or order from the
                menu and checkout via WhatsApp for delivery around Accra.
              </p>
              <a
                href={MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-medium text-[var(--accent-bright)] hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
            <div className="relative overflow-hidden rounded-[20px] shadow-[var(--shadow-dark)] ring-1 ring-white/10 group">
              <img
                src="/jamis/flyer.png"
                alt="Jami's Kitchen promotional flyer with menu and contact details"
                className="w-full object-cover h-64 md:h-[400px] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mb-20 md:mb-28" delay={0.15}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                Signature picks
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
                Featured dishes guests love
              </h2>
            </div>
            <a
              href="#menu"
              className="rounded-full border border-white/10 bg-[var(--card)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent-bright)]"
            >
              View full menu
            </a>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {FEATURED_ITEMS.map((item) => (
              <article
                key={item.name}
                className="group rounded-3xl border border-white/5 bg-[var(--card)] p-3 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-dark)]"
              >
                <div className="mb-4 overflow-hidden rounded-2xl relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="px-3 pb-3">
                  <span className="inline-flex rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent-bright)] border border-[var(--accent)]/20">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-[var(--foreground)]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--accent-bright)]/90">
                    {item.subtitle}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.note}</p>
                  <p className="mt-3 text-xl font-semibold tabular-nums text-[var(--accent-bright)]">
                    {item.priceLabel}
                  </p>
                  <FeaturedAddButton
                    menuId={item.menuId}
                    defaultSize={item.defaultSize}
                  />
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mb-20 md:mb-28" delay={0.1}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                Real food, real moments
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
                From our kitchen
              </h2>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="overflow-hidden rounded-2xl border border-white/5 bg-[var(--card)] shadow-[var(--shadow-soft)]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-36 w-full object-cover transition duration-500 hover:scale-105 md:h-52"
                />
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mb-20 md:mb-28" delay={0.1}>
          <div id="menu" className="flex flex-wrap items-center gap-4">
            <h2 className="font-serif text-4xl font-semibold text-[var(--foreground)] md:text-5xl">
              What we sell
            </h2>
            <span className="rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--accent-bright)] ring-1 ring-[var(--accent)]/20">
              Add to cart to order
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
            Choose your items, open your cart, and send your order on WhatsApp.
            {MENU_PLACEHOLDER_NOTE}
          </p>

          <div className="mt-12">
            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-[1px] shadow-[var(--shadow-soft)] group max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full rounded-[2rem] bg-[var(--card)]/90 backdrop-blur-xl p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl border border-[var(--accent)]/20">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-semibold text-[var(--foreground)]">
                    Menu
                  </h3>
                </div>

                <MenuOrderSection />

                <p className="mt-8 text-sm text-[var(--muted)] border-t border-white/5 pt-6">
                  Add-ons and combos: mix angwamo, plantain, gizzard and salad. Add
                  what you want to the cart, then checkout on WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mb-20 md:mb-28" delay={0.1}>
          <div id="visit" className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                Visit us
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
                Hours and location
              </h2>
              <div className="mt-8 grid gap-5">
                <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6 shadow-[var(--shadow-soft)] flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[var(--accent)] mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-[var(--foreground)]">
                      Address
                    </h3>
                    <p className="mt-2 text-[var(--muted)] leading-relaxed">
                      Jami&apos;s Kitchen
                      <br />
                      {LOCATION}
                    </p>
                    <a
                      href={MAPS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 font-medium text-[var(--accent-bright)] hover:underline focus:outline-none"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6 shadow-[var(--shadow-soft)] flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[var(--accent)] mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-[var(--foreground)]">
                      Opening hours
                    </h3>
                    <div className="mt-2 flex flex-col gap-2 font-medium text-white/90">
                      <p className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg inline-block text-sm">
                        Mon - Sat: 10:00 AM - 8:00 PM
                      </p>
                      <p className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg inline-block text-sm text-[var(--muted)]">
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-[var(--card)] p-6 shadow-[var(--shadow-soft)] flex items-start gap-4">
                  <Truck className="w-6 h-6 text-[var(--accent)] mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-[var(--foreground)]">
                      Delivery
                    </h3>
                    <p className="mt-2 text-[var(--muted)]">
                      Delivery available around Accra. Add items to cart and checkout
                      on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-[2rem] overflow-hidden shadow-[var(--shadow-dark)] ring-1 ring-white/10 relative">
              <MapEmbed />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mb-20 md:mb-28" delay={0.1}>
          <div
            id="contact"
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[var(--surface-dark)] to-[var(--surface-dark-soft)] p-8 text-white shadow-[var(--shadow-dark)] md:p-14 border border-[var(--border-strong)]"
          >
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-4xl">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                <Phone className="w-4 h-4" /> Contact
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl leading-tight">
                Order or get in touch
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-white/70">
                Build your order from the menu, checkout in the cart, and send it on
                WhatsApp. Call either line if you prefer to speak with us.
              </p>

              <div className="mt-10 flex flex-col gap-8">
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => openCart("cart")}
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 rounded-2xl bg-[var(--accent)] px-8 py-5 font-semibold text-white transition hover:bg-[var(--accent-hover)] hover:-translate-y-1 shadow-[0_10px_30px_-5px_rgba(196,30,58,0.45)] ring-1 ring-white/10"
                  >
                    <ShoppingBag className="w-6 h-6" />
                    <span>Open cart & order</span>
                  </button>
                  <a
                    href={WHATSAPP_INQUIRY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 rounded-2xl bg-white/10 px-8 py-5 font-semibold text-white transition hover:bg-white/20 hover:-translate-y-1 ring-1 ring-white/10 backdrop-blur-sm shadow-lg"
                  >
                    <MessageCircle className="w-6 h-6 text-[var(--accent-bright)]" />
                    <span>Send an inquiry</span>
                  </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href={PHONE_PRIMARY_TEL}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                  >
                    <Phone className="w-6 h-6 text-[var(--accent-bright)] shrink-0" />
                    <div>
                      <p className="text-sm text-white/60">Primary</p>
                      <p className="font-semibold">{PHONE_PRIMARY_DISPLAY}</p>
                    </div>
                  </a>
                  <a
                    href={PHONE_SECONDARY_TEL}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                  >
                    <Phone className="w-6 h-6 text-[var(--accent-bright)] shrink-0" />
                    <div>
                      <p className="text-sm text-white/60">Secondary</p>
                      <p className="font-semibold">{PHONE_SECONDARY_DISPLAY}</p>
                    </div>
                  </a>
                </div>

                <a
                  href={WHATSAPP_SECONDARY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent-bright)] hover:underline"
                >
                  Or WhatsApp {PHONE_SECONDARY_DISPLAY} →
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </main>

      <footer className="border-t border-white/5 bg-[var(--card)] px-6 py-12 pb-24 sm:pb-12 text-center md:text-left">
        <div className="mx-auto max-w-6xl grid md:grid-cols-[2fr_1fr] gap-10">
          <div>
            <JamisLogo size={64} layout="stacked" dark />
            <p className="mt-6 font-script text-xl text-[var(--accent-bright)]">
              {SLOGAN}
            </p>
            <p className="mt-4 text-[var(--muted)] max-w-sm">
              Angwamo, plantain, gizzard, sausage and fresh salad. Delicious,
              affordable and satisfying in Nima.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => openCart("cart")}
                className="p-2 rounded-full bg-white/5 text-[var(--muted)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                title="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
              <a
                href={PHONE_PRIMARY_TEL}
                className="p-2 rounded-full bg-white/5 text-[var(--muted)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                title={`Call ${PHONE_PRIMARY_DISPLAY}`}
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="grid gap-4 md:justify-end">
            <div>
              <h4 className="font-semibold text-[var(--foreground)] mb-4">
                Location
              </h4>
              <p className="text-sm text-[var(--muted)]">{LOCATION}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--foreground)] mt-4 mb-4">
                Hours
              </h4>
              <p className="text-sm text-[var(--muted)]">Mon - Sat: 10:00 AM - 8:00 PM</p>
              <p className="text-sm text-[var(--muted)]">Sunday: Closed</p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Jami&apos;s Kitchen. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => openCart("cart")}
            className="text-sm text-[var(--accent-bright)] hover:underline flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Order from cart
          </button>
        </div>
      </footer>
    </div>
  );
}
