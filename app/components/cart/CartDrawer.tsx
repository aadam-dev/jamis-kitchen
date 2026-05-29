"use client";

import { useEffect, useRef, useState } from "react";
import { X, MessageCircle, ArrowLeft, ChevronRight } from "lucide-react";
import { useCart } from "./CartProvider";
import { CartLineList } from "./MenuOrderSection";
import { fmtGHS } from "@/lib/menu";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp-order";
import type { CheckoutDetails, FulfillmentType } from "@/lib/cart";
import { PICKUP_LABEL } from "@/lib/business";

const emptyCheckout: CheckoutDetails = {
  fulfillment: "delivery",
  addressOrPickup: "",
  phone: "",
  preferredTime: "",
  notes: "",
};

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    step,
    setStep,
    lines,
    total,
    itemCount,
    clearCart,
  } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const [checkout, setCheckout] = useState<CheckoutDetails>(emptyCheckout);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutDetails, string>>>({});

  useEffect(() => {
    if (!isOpen) {
      setCheckout(emptyCheckout);
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const next: Partial<Record<keyof CheckoutDetails, string>> = {};
    const phone = checkout.phone.replace(/\s/g, "");
    if (!phone || phone.length < 9) {
      next.phone = "Enter a valid phone number.";
    }
    if (checkout.fulfillment === "delivery" && !checkout.addressOrPickup.trim()) {
      next.addressOrPickup = "Enter your delivery address.";
    }
    if (!checkout.preferredTime.trim()) {
      next.preferredTime = "When would you like your order?";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleFulfillmentChange = (fulfillment: FulfillmentType) => {
    setCheckout((prev) => ({
      ...prev,
      fulfillment,
      addressOrPickup:
        fulfillment === "pickup" ? PICKUP_LABEL : prev.fulfillment === "pickup" ? "" : prev.addressOrPickup,
    }));
  };

  const handleSendOrder = () => {
    if (lines.length === 0) return;
    if (!validate()) return;

    const payload: CheckoutDetails = {
      ...checkout,
      addressOrPickup:
        checkout.fulfillment === "pickup"
          ? PICKUP_LABEL
          : checkout.addressOrPickup.trim(),
      phone: checkout.phone.trim(),
      preferredTime: checkout.preferredTime.trim(),
      notes: checkout.notes.trim(),
    };

    const url = buildWhatsAppOrderUrl(lines, payload);
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
        aria-label="Close cart"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-dark)] outline-none"
      >
        <header className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div>
            <h2 id="cart-title" className="font-serif text-xl font-semibold text-[var(--foreground)]">
              {step === "cart" ? "Your order" : "Checkout"}
            </h2>
            {itemCount > 0 ? (
              <p className="text-sm text-[var(--muted)]">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 text-[var(--muted)] hover:bg-white/5 hover:text-[var(--foreground)]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {step === "cart" ? (
            <CartLineList />
          ) : (
            <CheckoutForm
              checkout={checkout}
              errors={errors}
              onChange={setCheckout}
              onFulfillmentChange={handleFulfillmentChange}
            />
          )}
        </div>

        <footer className="border-t border-white/5 px-5 py-4 space-y-3 bg-[var(--surface-dark-soft)]">
          {lines.length > 0 ? (
            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-[var(--foreground)]">Total</span>
              <span className="tabular-nums text-[var(--accent-bright)]">{fmtGHS(total)}</span>
            </div>
          ) : null}

          {step === "cart" ? (
            <>
              <button
                type="button"
                disabled={lines.length === 0}
                onClick={() => setStep("checkout")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Proceed to checkout
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                Continue browsing
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSendOrder}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3.5 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
              >
                <MessageCircle className="w-5 h-5" />
                Send order on WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="flex w-full items-center justify-center gap-2 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to cart
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

function CheckoutForm({
  checkout,
  errors,
  onChange,
  onFulfillmentChange,
}: {
  checkout: CheckoutDetails;
  errors: Partial<Record<keyof CheckoutDetails, string>>;
  onChange: React.Dispatch<React.SetStateAction<CheckoutDetails>>;
  onFulfillmentChange: (f: FulfillmentType) => void;
}) {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend className="text-sm font-semibold text-[var(--foreground)] mb-3">
          Order type
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {(["delivery", "pickup"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onFulfillmentChange(type)}
              className={`rounded-xl border px-3 py-3 text-sm font-medium capitalize transition ${
                checkout.fulfillment === type
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent-bright)]"
                  : "border-white/10 text-[var(--muted)] hover:border-white/20"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          {checkout.fulfillment === "delivery" ? "Delivery address" : "Pickup location"}
        </label>
        {checkout.fulfillment === "pickup" ? (
          <p className="rounded-xl border border-white/10 bg-[var(--surface-light)] px-3 py-2.5 text-sm text-[var(--muted)]">
            {PICKUP_LABEL}
          </p>
        ) : (
          <textarea
            id="address"
            rows={3}
            value={checkout.addressOrPickup}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, addressOrPickup: e.target.value }))
            }
            placeholder="Street, area, landmark..."
            className="w-full rounded-xl border border-white/10 bg-[var(--surface-light)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        )}
        {errors.addressOrPickup ? (
          <p className="mt-1 text-xs text-[var(--accent-bright)]">{errors.addressOrPickup}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={checkout.phone}
          onChange={(e) => onChange((prev) => ({ ...prev, phone: e.target.value }))}
          placeholder="e.g. 053 549 4913"
          className="w-full rounded-xl border border-white/10 bg-[var(--surface-light)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        {errors.phone ? (
          <p className="mt-1 text-xs text-[var(--accent-bright)]">{errors.phone}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          Preferred time
        </label>
        <input
          id="time"
          type="text"
          value={checkout.preferredTime}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, preferredTime: e.target.value }))
          }
          placeholder="e.g. Today 6:30pm, ASAP"
          className="w-full rounded-xl border border-white/10 bg-[var(--surface-light)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        {errors.preferredTime ? (
          <p className="mt-1 text-xs text-[var(--accent-bright)]">{errors.preferredTime}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
          Notes <span className="text-[var(--muted)] font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={2}
          value={checkout.notes}
          onChange={(e) => onChange((prev) => ({ ...prev, notes: e.target.value }))}
          placeholder="Extra egg, no onions..."
          className="w-full rounded-xl border border-white/10 bg-[var(--surface-light)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>

      <p className="text-xs text-[var(--muted)] leading-relaxed">
        You will be redirected to WhatsApp with your order summary. Confirm the message and send it to complete your order.
      </p>
    </form>
  );
}
