import {
  ComponentProps,
  UniformSlot,
} from "@uniformdev/next-app-router/component";

export type PageProps = unknown;
export type PageSlots = "content";

export const Page = ({ slots }: ComponentProps<PageProps, PageSlots>) => (
  <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
    <UniformSlot slot={slots.content} />
  </div>
);
