import {
  ComponentParameter,
  ComponentProps,
  UniformRichText,
  UniformText,
} from "@uniformdev/next-app-router/component";
import type { AssetParamValue, LinkParamValue } from "@uniformdev/canvas";
import { flattenValues } from "@uniformdev/canvas";

export const HeroComponent = ({
  parameters: { title, description, eyebrow, image, buttonText, buttonLink },
  component,
}: ComponentProps<HeroProps>) => {
  const heroImage = flattenValues(image, { toSingle: true });
  const link = buttonLink?.value;

  return (
    <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Left: Text content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Eyebrow */}
        <div className="inline-flex self-start items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent tracking-wide">
          <UniformText
            component={component}
            parameter={eyebrow}
            placeholder="Enter eyebrow text"
          />
        </div>

        {/* Title */}
        <UniformText
          component={component}
          parameter={title}
          className="m-0 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground text-balance"
          placeholder="Enter a compelling headline"
          as="h1"
        />

        {/* Description */}
        <UniformRichText
          component={component}
          parameter={description}
          placeholder="Enter a supporting description"
          className="max-w-xl text-lg leading-relaxed text-foreground-muted"
        />

        {/* CTA Button */}
        {(buttonText?.value || link) && (
          <div className="mt-2">
            <a
              href={typeof link === 'string' ? link : link?.path || '#'}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-200 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              <UniformText
                component={component}
                parameter={buttonText}
                placeholder="Get Started"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Right: Image */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-md lg:max-w-lg">
          {/* Glow effect behind image */}
          <div
            className="absolute -inset-4 rounded-2xl bg-accent/10 blur-2xl"
            aria-hidden="true"
          />
          {heroImage?.url ? (
            <img
              src={heroImage.url}
              alt={
                heroImage.fields?.description?.value?.toString() ||
                heroImage.fields?.title?.value?.toString() ||
                "Hero image"
              }
              width={heroImage.width || 600}
              height={heroImage.height || 500}
              className="relative w-full h-auto rounded-2xl border border-border object-cover shadow-2xl shadow-black/40"
            />
          ) : (
            <div className="relative aspect-[6/5] w-full rounded-2xl border border-border bg-surface-elevated flex items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="text-foreground-muted/40"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <path
                  d="M3 16l5-5 4 4 3-3 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export type HeroProps = {
  title: ComponentParameter<string>;
  description: ComponentParameter<string>;
  eyebrow: ComponentParameter<string>;
  image: AssetParamValue;
  buttonText: ComponentParameter<string>;
  buttonLink: ComponentParameter<LinkParamValue>;
};
