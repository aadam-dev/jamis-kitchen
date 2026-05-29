/** Public paths under /jamis/ for food photography */
export const FOOD_IMAGES = {
  angwamo: "/jamis/angwamo.png",
  plantainGizzard: "/jamis/plantain-gizzard.png",
  salad: "/jamis/salad.png",
  hero: "/jamis/hero_new.png",
} as const;

export type KitchenGalleryItem = {
  src: string;
  alt: string;
  label: string;
};

/** "From our kitchen" gallery (real dish photography) */
export const KITCHEN_GALLERY: KitchenGalleryItem[] = [
  {
    src: FOOD_IMAGES.angwamo,
    alt: "Angwamo oil rice bowl with plantain, sausage, omelette, and pepper sauces",
    label: "Angwamo",
  },
  {
    src: FOOD_IMAGES.plantainGizzard,
    alt: "Golden fried ripe plantain slices with spice",
    label: "Plantain",
  },
  {
    src: FOOD_IMAGES.salad,
    alt: "Fresh mixed salad with grilled chicken, lettuce, tomato, and cucumber",
    label: "Mixed salad",
  },
];
