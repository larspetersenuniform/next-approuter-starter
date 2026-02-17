"use client";

import { useRef, useState } from "react";
import {
  ComponentParameter,
  ComponentProps,
  UniformRichText,
  UniformText,
} from "@uniformdev/next-app-router/component";
import type { AssetParamValue } from "@uniformdev/canvas";

export const ProductHighlightComponent = ({
  parameters: { image, title, category, description, price },
  component,
}: ComponentProps<ProductHighlightProps>) => {
  const imageAssets = image?.value ?? [];
  const productImage = imageAssets[0];
  const imageUrl = productImage?.fields?.url?.value;
  const imageAlt =
    productImage?.fields?.description?.value?.toString() ||
    productImage?.fields?.title?.value?.toString() ||
    "Product image";

  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <section
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group relative flex flex-col lg:flex-row items-stretch gap-0 overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Left: Product Image */}
      <div className="relative w-full lg:w-5/12 overflow-hidden bg-surface-elevated">
        <div className="aspect-square lg:aspect-auto lg:h-full w-full overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              width={productImage?.fields?.width?.value || 600}
              height={productImage?.fields?.height?.value || 600}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full min-h-[320px] w-full items-center justify-center">
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                className="text-foreground-muted/30"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        {/* Shine sweep on hover */}
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 55%, transparent 60%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Right: Product Details */}
      <div className="relative z-10 flex flex-1 flex-col justify-center gap-5 p-8 lg:p-10">
        {/* Category badge */}
        {category?.value && (
          <div className="flex">
            <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-accent transition-colors duration-300 group-hover:bg-accent/15 group-hover:border-accent/40">
              <UniformText
                component={component}
                parameter={category}
                placeholder="Category"
              />
            </span>
          </div>
        )}

        {/* Title */}
        <UniformText
          component={component}
          parameter={title}
          className="m-0 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-foreground text-balance"
          placeholder="Product name"
          as="h2"
        />

        {/* Description */}
        <UniformRichText
          component={component}
          parameter={description}
          placeholder="Add a product description"
          className="text-base leading-relaxed text-foreground-muted"
        />

        {/* Price + animated divider */}
        <div className="flex flex-col gap-4 pt-2">
          <div className="h-px w-full overflow-hidden bg-border">
            <div className="h-full w-1/3 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
          </div>

          <div className="flex items-end gap-3">
            <UniformText
              component={component}
              parameter={price}
              className="text-3xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent"
              placeholder="$0.00"
              as="span"
            />
            <span className="mb-1 text-xs font-medium uppercase tracking-widest text-foreground-muted">
              Price
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export type ProductHighlightProps = {
  image: ComponentParameter<AssetParamValue>;
  title: ComponentParameter<string>;
  category: ComponentParameter<string>;
  description: ComponentParameter<string>;
  price: ComponentParameter<string>;
};
