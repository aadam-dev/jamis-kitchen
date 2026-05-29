import type { FoodMenuItem } from "./menu";

export type CartLineItem = {
  lineId: string;
  menuId: string;
  name: string;
  orderName: string;
  size: string;
  unitPrice: number;
  quantity: number;
};

export type FulfillmentType = "delivery" | "pickup";

export type CheckoutDetails = {
  fulfillment: FulfillmentType;
  addressOrPickup: string;
  phone: string;
  preferredTime: string;
  notes: string;
};

export const CART_STORAGE_KEY = "jamis-kitchen-cart-v1";

export function cartLineId(menuId: string, size: string) {
  return `${menuId}::${size}`;
}

export function createCartLine(
  item: FoodMenuItem,
  size: string,
  price: number,
  quantity = 1
): CartLineItem {
  return {
    lineId: cartLineId(item.id, size),
    menuId: item.id,
    name: item.name,
    orderName: item.orderName,
    size,
    unitPrice: price,
    quantity,
  };
}

export function lineSubtotal(line: CartLineItem) {
  return line.unitPrice * line.quantity;
}

export function cartTotal(lines: CartLineItem[]) {
  return lines.reduce((sum, line) => sum + lineSubtotal(line), 0);
}

export function cartItemCount(lines: CartLineItem[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function mergeCartLine(
  lines: CartLineItem[],
  incoming: CartLineItem
): CartLineItem[] {
  const existing = lines.find((l) => l.lineId === incoming.lineId);
  if (!existing) return [...lines, incoming];
  return lines.map((l) =>
    l.lineId === incoming.lineId
      ? { ...l, quantity: l.quantity + incoming.quantity }
      : l
  );
}

export function updateLineQuantity(
  lines: CartLineItem[],
  lineId: string,
  quantity: number
): CartLineItem[] {
  if (quantity <= 0) return lines.filter((l) => l.lineId !== lineId);
  return lines.map((l) => (l.lineId === lineId ? { ...l, quantity } : l));
}
