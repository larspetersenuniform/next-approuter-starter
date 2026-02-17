import {
  ComponentParameter,
  ComponentProps,
  UniformRichText,
  UniformText,
} from "@uniformdev/next-app-router/component";
import type { AssetParamValue, LinkParamValue } from "@uniformdev/canvas";

export const CardComponent = ({
  parameters: { image, title, teaserText, buttonText, buttonLink },
  component,
}: ComponentProps<CardProps>) => {
  const imageAssets = image?.value ?? [];
  const cardImage = imageAssets[0];
  const link = buttonLink?.value;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/40 hover:bg-surface-elevated hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-elevated">
        {cardImage?.fields?.url?.value ? (
          <img
            src={cardImage.fields.url.value}
            alt={
              cardImage.fields?.description?.value?.toString() ||
              cardImage.fields?.title?.value?.toString() ||
              "Card image"
            }
            width={cardImage.fields?.width?.value || 400}
            height={cardImage.fields?.height?.value || 250}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              width="36"
              height="36"
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
        {/* Subtle gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <UniformText
          component={component}
          parameter={title}
          className="text-lg font-semibold leading-snug text-foreground tracking-tight"
          placeholder="Card title"
          as="h3"
        />

        <UniformRichText
          component={component}
          parameter={teaserText}
          placeholder="Brief description text"
          className="flex-1 text-sm leading-relaxed text-foreground-muted"
        />

        {(buttonText?.value || link) && (
          <div className="mt-auto pt-2">
            <a
              href={typeof link === "string" ? link : link?.path || "#"}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent no-underline transition-all duration-200 hover:text-accent-hover hover:gap-2.5"
            >
              <UniformText
                component={component}
                parameter={buttonText}
                placeholder="Learn More"
              />
              <svg
                width="14"
                height="14"
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
    </article>
  );
};

export type CardProps = {
  image: ComponentParameter<AssetParamValue>;
  title: ComponentParameter<string>;
  teaserText: ComponentParameter<string>;
  buttonText: ComponentParameter<string>;
  buttonLink: ComponentParameter<LinkParamValue>;
};
