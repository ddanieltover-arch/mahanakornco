"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  title: string;
  image: string;
  gallery?: string[];
}

export function ProductGallery({ title, image, gallery = [] }: ProductGalleryProps) {
  const images = [image, ...gallery.filter((src) => src && src !== image)];
  const [active, setActive] = useState(0);
  const activeSrc = images[active] ?? image;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream shadow-md ring-1 ring-gray-100">
        <Image
          src={activeSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, index) => {
            const selected = index === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1} of ${title}`}
                aria-pressed={selected}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream ring-2 transition ${
                  selected
                    ? "ring-primary"
                    : "ring-transparent hover:ring-primary/40"
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
