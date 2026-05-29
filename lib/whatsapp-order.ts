import { WHATSAPP_ORDER_NUMBER } from "./business";
import type { CartLineItem, CheckoutDetails } from "./cart";
import { cartTotal, lineSubtotal } from "./cart";
import { fmtGHSPlain } from "./menu";

export function buildOrderMessage(
  lines: CartLineItem[],
  checkout: CheckoutDetails
): string {
  const itemLines = lines.map((line) => {
    const label =
      line.size === "Regular" || line.size === "From"
        ? line.orderName
        : `${line.orderName} (${line.size})`;
    return `🍽️ ${line.quantity}x ${label} - ${fmtGHSPlain(lineSubtotal(line))}`;
  });

  const fulfillmentLabel =
    checkout.fulfillment === "pickup"
      ? checkout.addressOrPickup
      : checkout.addressOrPickup;

  return [
    "🛵 NEW ORDER from JAMI'S KITCHEN website",
    "",
    ...itemLines,
    "",
    `📦 Total: ${fmtGHSPlain(cartTotal(lines))}`,
    `📍 Delivery Address or pickup: ${fulfillmentLabel}`,
    `📞 Phone number: ${checkout.phone.trim()}`,
    `⏱️ Preferred time: ${checkout.preferredTime.trim()}`,
    ...(checkout.notes.trim()
      ? [`📝 Notes: ${checkout.notes.trim()}`]
      : []),
  ].join("\n");
}

export function buildWhatsAppOrderUrl(
  lines: CartLineItem[],
  checkout: CheckoutDetails
): string {
  const text = buildOrderMessage(lines, checkout);
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(text)}`;
}
