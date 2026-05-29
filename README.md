# Jami's Kitchen

Customer-facing website for **Jami's Kitchen**, a Ghanaian street-food vendor at Nima Shell Filling Station (Free Pipe), Accra. The site showcases the menu, location, and hours, and lets customers build an order in the browser and send it to the kitchen via WhatsApp.

**Live repo:** [github.com/aadam-dev/jamis-kitchen](https://github.com/aadam-dev/jamis-kitchen)

## Features

- Single-page marketing site (About, Menu, Visit, Contact)
- Cart with size and quantity selection per menu item
- Checkout form (delivery or pickup, phone, preferred time, notes)
- WhatsApp handoff with a formatted order summary and total
- Cart persisted in `localStorage` until checkout is sent
- Mobile sticky bar (Cart, Call, Directions)
- Red and gold brand theme aligned with the business flyer

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (section reveals)

No database, authentication, or backend API. Orders are completed in WhatsApp after the customer sends the pre-filled message.

## Getting started

**Requirements:** Node.js 18+

```bash
git clone https://github.com/aadam-dev/jamis-kitchen.git
cd jamis-kitchen
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production build:**

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com/) or any Node host that supports Next.js.

## How ordering works

1. Customer adds items from the **Menu** section.
2. They open **Cart** and review quantities and total.
3. **Checkout** collects fulfillment type, address (or pickup), phone, and preferred time.
4. **Send order on WhatsApp** opens WhatsApp with a message like:

   ```
   🛵 NEW ORDER from JAMI'S KITCHEN website

   🍽️ 1x Rice with Oil (Angwamo) - GHS 35
   🍽️ 2x Sausage - GHS 30

   📦 Total: GHS 65
   📍 Delivery Address or pickup: ...
   📞 Phone number: ...
   ⏱️ Preferred time: ...
   ```

5. The customer taps Send in WhatsApp to confirm with the kitchen.

## Project structure

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Homepage sections and marketing copy |
| `lib/business.ts` | Phone numbers, location, taglines |
| `lib/menu.ts` | Menu items, sizes, and prices |
| `lib/cart.ts` | Cart types and helpers |
| `lib/whatsapp-order.ts` | WhatsApp message and URL builder |
| `app/components/cart/` | Cart provider, drawer, menu rows |
| `public/jamis/` | Brand and food images |

## Content updates

| Change | File |
|--------|------|
| Phones and WhatsApp number | `lib/business.ts` |
| Menu and prices | `lib/menu.ts` |
| Hours and SEO metadata | `app/layout.tsx`, `app/page.tsx` |
| Google Maps embed | `app/components/MapEmbed.tsx` |

Menu prices in the repo are placeholders until confirmed by the business.

## Brand assets

| File | Status |
|------|--------|
| `public/jamis/logo.png` | **Not yet added.** The site uses a temporary wordmark (monogram + typography). Drop in `logo.png` when ready; the header will pick it up automatically. |
| `public/jamis/hero_new.png` | Temporary hero background. Replace with Jami's own food photography. |
| `public/jamis/flyer.png` | Business flyer used in gallery and location sections. |

## Copy style

Site copy avoids em dashes. Use commas, periods, or hyphens for punctuation instead.

## Security

This project is intended to be public. Do not commit:

- `.env` or any file containing secrets
- Private credentials or API keys

Business phone numbers on the site are public contact details, not secrets.

## License

Private project for Jami's Kitchen. All rights reserved unless otherwise agreed with the business owner.
