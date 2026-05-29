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
    subtitle: "Rice with oil, egg & gizzard",
    note: "Our house favourite. Hearty, filling and full of flavour.",
    tag: "House favourite",
    priceLabel: "GH₵ 25 - 45",
    image: "/jamis/hero_new.png",
  },
  {
    menuId: "plantain",
    defaultSize: "Regular",
    name: "Plantain & Gizzard",
    subtitle: "Popular combo plate",
    note: "Fried plantain with seasoned gizzard. A customer favourite.",
    tag: "Popular combo",
    priceLabel: "From GH₵ 35",
    image: "/jamis/flyer.png",
  },
  {
    menuId: "salad",
    defaultSize: "Regular",
    name: "Mixed Salad",
    subtitle: "Fresh & light",
    note: "Crisp vegetables. Perfect alongside your main.",
    tag: "Fresh",
    priceLabel: "GH₵ 12",
    image: "/jamis/flyer.png",
  },
];

export function getMenuItem(menuId: string) {
  return FOOD_MENU.find((item) => item.id === menuId);
}

export function getServing(menuId: string, size: string) {
  const item = getMenuItem(menuId);
  return item?.servings.find((s) => s.size === size);
}
