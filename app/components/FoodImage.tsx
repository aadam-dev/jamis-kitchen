import Image from "next/image";

type FoodImageProps = {
  src: string;
  alt: string;
  /** Fixed height layouts (featured cards) */
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export function FoodImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = DEFAULT_SIZES,
}: FoodImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}

type GalleryImageProps = {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
};

export function GalleryFoodImage({
  src,
  alt,
  label,
  priority = false,
}: GalleryImageProps) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-white/5 bg-[var(--card)] shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/5] w-full md:aspect-square">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-3 text-sm font-semibold text-white">
          {label}
        </figcaption>
      </div>
    </figure>
  );
}
