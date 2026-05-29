"use client";

import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { FOOD_MENU, fmtGHS } from "@/lib/menu";
import { lineSubtotal } from "@/lib/cart";
import { useCart } from "./CartProvider";

export function MenuOrderSection() {
  return (
    <ul className="space-y-8" role="list">
      {FOOD_MENU.map((item) => (
        <li
          key={item.id}
          className="group/item relative pb-8 border-b border-white/5 last:border-0 last:pb-0"
        >
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-lg font-medium text-[var(--foreground)] group-hover/item:text-[var(--accent-bright)] transition-colors">
                {item.name}
              </h4>
              {item.description ? (
                <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              {item.servings.map((serving) => (
                <MenuServingRow
                  key={`${item.id}-${serving.size}`}
                  menuId={item.id}
                  size={serving.size}
                  price={serving.price}
                />
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function MenuServingRow({
  menuId,
  size,
  price,
}: {
  menuId: string;
  size: string;
  price: number;
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-[var(--surface-dark)]/40 px-3 py-2.5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <span className="text-sm font-medium text-[var(--foreground)]">{size}</span>
        <span className="tabular-nums text-base font-semibold text-[var(--accent-bright)]">
          {fmtGHS(price)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border border-white/10 bg-[var(--card)]">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="p-2 text-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="p-2 text-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            addItem(menuId, size, qty);
            setQty(1);
          }}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export function CartLineList({ compact = false }: { compact?: boolean }) {
  const { lines, setQuantity, removeLine } = useCart();

  if (lines.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)] py-6 text-center">
        Your cart is empty. Add items from the menu to get started.
      </p>
    );
  }

  return (
    <ul className={`space-y-3 ${compact ? "" : "py-2"}`} role="list">
      {lines.map((line) => (
        <li
          key={line.lineId}
          className="rounded-xl border border-white/5 bg-[var(--surface-light)] p-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-[var(--foreground)] truncate">
                {line.orderName}
              </p>
              {line.size !== "Regular" && line.size !== "From" ? (
                <p className="text-xs text-[var(--muted)]">{line.size}</p>
              ) : null}
              <p className="mt-1 text-sm font-semibold text-[var(--accent-bright)] tabular-nums">
                {fmtGHS(lineSubtotal(line))}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeLine(line.lineId)}
              className="p-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
              aria-label={`Remove ${line.orderName}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity(line.lineId, line.quantity - 1)}
              className="rounded-md border border-white/10 p-1.5 hover:bg-white/5"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(line.lineId, line.quantity + 1)}
              className="rounded-md border border-white/10 p-1.5 hover:bg-white/5"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
            <span className="ml-auto text-xs text-[var(--muted)] tabular-nums">
              {fmtGHS(line.unitPrice)} each
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
