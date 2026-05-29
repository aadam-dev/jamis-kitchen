"use client";

import { useCart } from "./CartProvider";
import { ShoppingBag } from "lucide-react";

type CartButtonProps = {
  className?: string;
  variant?: "nav" | "primary";
};

export function CartButton({ className = "", variant = "nav" }: CartButtonProps) {
  const { itemCount, openCart } = useCart();

  const base =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-white shadow-lg transition hover:bg-[var(--accent-hover)]"
      : "relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10";

  return (
    <button
      type="button"
      onClick={() => openCart("cart")}
      className={`${base} ${className}`}
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
    >
      <ShoppingBag className="w-4 h-4" aria-hidden />
      <span>{variant === "primary" ? "View cart" : "Cart"}</span>
      {itemCount > 0 ? (
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
            variant === "primary"
              ? "bg-white text-[var(--accent)]"
              : "bg-[var(--accent-bright)] text-[var(--surface-dark)]"
          }`}
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}
