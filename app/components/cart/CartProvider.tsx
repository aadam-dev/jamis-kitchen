"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CART_STORAGE_KEY,
  cartItemCount,
  cartTotal,
  createCartLine,
  mergeCartLine,
  updateLineQuantity,
  type CartLineItem,
} from "@/lib/cart";
import { getMenuItem, getServing, type FoodMenuItem } from "@/lib/menu";

type CartContextValue = {
  lines: CartLineItem[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  step: "cart" | "checkout";
  openCart: (step?: "cart" | "checkout") => void;
  closeCart: () => void;
  setStep: (step: "cart" | "checkout") => void;
  addItem: (menuId: string, size: string, quantity?: number) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartLineItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLineItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLineItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const addItem = useCallback(
    (menuId: string, size: string, quantity = 1) => {
      const item = getMenuItem(menuId);
      const serving = getServing(menuId, size);
      if (!item || !serving) return;

      const line = createCartLine(item, size, serving.price, quantity);
      setLines((prev) => mergeCartLine(prev, line));
      setStep("cart");
      setIsOpen(true);
    },
    []
  );

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) => updateLineQuantity(prev, lineId, quantity));
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const openCart = useCallback((nextStep: "cart" | "checkout" = "cart") => {
    setStep(nextStep);
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
    setStep("cart");
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount: cartItemCount(lines),
      total: cartTotal(lines),
      isOpen,
      step,
      openCart,
      closeCart,
      setStep,
      addItem,
      setQuantity,
      removeLine,
      clearCart,
    }),
    [
      lines,
      isOpen,
      step,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeLine,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/** For menu rows that need item metadata */
export function useMenuItem(menuId: string): FoodMenuItem | undefined {
  return getMenuItem(menuId);
}
