import { FOOD_IMAGES } from "./images";

export type MenuServing = { size: string; price: number };

export type FoodMenuItem = {
  id: string;
  /** Display name on site */
  name: string;
  /** Name used in WhatsApp order lines */
  orderName: string;
  description?: string;
  servings: MenuServing[];
};

export const fmtGHS = (n: number) =>
  `GH₵ ${n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)}`;

export const fmtGHSPlain = (n: number) =>
  `GHS ${n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)}`;

export const FOOD_MENU: FoodMenuItem[] = [
  {
    id: "angwamo",
    name: "Angwamo (Rice with Oil)",
    orderName: "Rice with Oil (Angwamo)",
    description: "Served with egg, gizzard, or your choice of extras.",
    servings: [
      { size: "Small", price: 25 },
      { size: "Medium", price: 35 },
      { size: "Large", price: 45 },
    ],
  },
  {
    id: "sausage",
    name: "Sausage",
    orderName: "Sausage",
    description: "Grilled skewers, seasoned and smoky.",
    servings: [{ size: "Regular", price: 15 }],
  },
  {
    id: "gizzard",
    name: "Gizzard",
    orderName: "Gizzard",
    description: "Seasoned, fried or sautéed to perfection.",
    servings: [{ size: "Regular", price: 20 }],
  },
  {
    id: "plantain",
    name: "Plantain",
    orderName: "Plantain",
    description: "Sweet fried ripe plantain slices.",
    servings: [{ size: "Regular", price: 15 }],
  },
  {
    id: "salad",
    name: "Mixed Salad",
    orderName: "Mixed Salad",
    description: "Fresh chopped cucumber, tomato, onion and greens.",
    servings: [{ size: "Regular", price: 12 }],
  },
  {
    id: "combos",
    name: "Combos & more",
    orderName: "Combo plate",
    description: "Build your plate. Ask on WhatsApp for today's specials.",
    servings: [{ size: "From", price: 30 }],
  },
];

export const FEATURED_ITEMS = [
  {
    menuId: "angwamo",
    defaultSize: "Medium",
    name: "Angwamo",
    subtitle: "Rice with oil, egg & sides",
    note: "Our house favourite. Hearty, filling and full of flavour.",
    tag: "House favourite",
    priceLabel: "GH₵ 25 - 45",
    image: FOOD_IMAGES.angwamo,
    imageAlt:
      "Angwamo oil rice bowl with plantain, sausage, omelette, and pepper sauces",
  },
  {
    menuId: "plantain",
    defaultSize: "Regular",
    name: "Plantain & Gizzard",
    subtitle: "Popular side combo",
    note: "Sweet fried plantain. Pair with gizzard or Angwamo for a full plate.",
    tag: "Popular combo",
    priceLabel: "From GH₵ 15",
    image: FOOD_IMAGES.plantainGizzard,
    imageAlt: "Golden fried ripe plantain slices with spice",
  },
  {
    menuId: "salad",
    defaultSize: "Regular",
    name: "Mixed Salad",
    subtitle: "Fresh & light",
    note: "Crisp greens with tomato and cucumber. Perfect alongside your main.",
    tag: "Fresh",
    priceLabel: "GH₵ 12",
    image: FOOD_IMAGES.salad,
    imageAlt:
      "Fresh mixed salad with grilled chicken, lettuce, tomato, and cucumber",
  },
];

export function getMenuItem(menuId: string) {
  return FOOD_MENU.find((item) => item.id === menuId);
}

export function getServing(menuId: string, size: string) {
  const item = getMenuItem(menuId);
  return item?.servings.find((s) => s.size === size);
}
