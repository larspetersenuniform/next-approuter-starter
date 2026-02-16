import {
  ComponentParameter,
  ComponentProps,
  UniformSlot,
  UniformText,
} from "@uniformdev/next-app-router/component";

export type LogoCloudProps = {
  title?: ComponentParameter<string>;
};

export type LogoCloudSlots = "logos";

export const LogoCloudComponent = ({
  parameters: { title },
  slots,
  component,
}: ComponentProps<LogoCloudProps, LogoCloudSlots>) => {
  return (
    <section className="flex w-full flex-col items-center gap-6 py-8">
      {title?.value && (
        <UniformText
          component={component}
          parameter={title}
          as="p"
          className="text-sm font-medium uppercase tracking-widest text-neutral-400"
          placeholder="Trusted by leading companies"
        />
      )}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

        {/* Marquee track */}
        <div className="flex animate-marquee items-center">
          {/* First set */}
          <div className="flex shrink-0 items-center">
            <UniformSlot slot={slots.logos} />
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            <UniformSlot slot={slots.logos} />
          </div>
        </div>
      </div>
    </section>
  );
};
