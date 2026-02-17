"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  ComponentParameter,
  ComponentProps,
  UniformSlot,
  UniformText,
} from "@uniformdev/next-app-router/component";

export type CardGridProps = {
  title: ComponentParameter<string>;
};
export type CardGridSlots = "cards";

export const CardGridComponent = ({
  parameters: { title },
  slots,
  component,
}: ComponentProps<CardGridProps, CardGridSlots>) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setNeedsScroll(hasOverflow);
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by one card width + gap
    const cardWidth = el.querySelector(":scope > *")?.clientWidth ?? 360;
    const amount = direction === "left" ? -(cardWidth + 24) : cardWidth + 24;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="mt-16">
      {/* Section header with optional title and scroll arrows */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <UniformText
          component={component}
          parameter={title}
          className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          placeholder="Section title"
          as="h2"
        />
        {needsScroll && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll cards left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-all duration-200 hover:border-accent/40 hover:bg-surface-elevated hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll cards right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-all duration-200 hover:border-accent/40 hover:bg-surface-elevated hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Cards container */}
      <div
        ref={scrollRef}
        className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
        style={{
          /* 3 visible columns when space allows, scroll beyond */
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(280px, calc((100% - 48px) / 3))",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <UniformSlot
          slot={slots.cards}
          wrapperComponent={CardWrapper}
        />
      </div>
    </section>
  );
};

function CardWrapper({ children }: { children: React.ReactNode }) {
  return <div className="snap-start">{children}</div>;
}
