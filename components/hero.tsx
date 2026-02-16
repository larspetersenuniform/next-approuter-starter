import Link from "next/link";
import {
  ComponentParameter,
  ComponentProps,
  UniformRichText,
  UniformText,
} from "@uniformdev/next-app-router/component";

type LinkParamValue = {
  path: string;
  type?: string;
};

export const HeroComponent = ({
  parameters: { title, description, ctaText, ctaLink },
  component,
}: ComponentProps<HeroProps>) => {
  const linkValue = ctaLink?.value;
  const ctaTextValue = ctaText?.value;
  const hasCtaButton = ctaTextValue && linkValue?.path;

  return (
    <section className="flex flex-col items-center gap-6">
      <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-medium text-indigo-600 tracking-wide">
        Uniform Starter Kit for Next.js App Router
      </div>
      <UniformText
        component={component}
        parameter={title}
        className="m-0 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center tracking-tight text-neutral-900"
        placeholder={"title goes here"}
        as="h1"
      />
      <UniformRichText
        component={component}
        parameter={description}
        placeholder={"description goes here"}
        className="max-w-2xl text-lg sm:text-xl leading-relaxed text-center text-neutral-500"
      />
      {hasCtaButton ? (
        <Link
          href={linkValue.path}
          className="mt-2 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {ctaTextValue}
        </Link>
      ) : (
        <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
      )}
    </section>
  );
};

export type HeroProps = {
  title: ComponentParameter<string>;
  description: ComponentParameter<string>;
  ctaText?: ComponentParameter<string>;
  ctaLink?: ComponentParameter<LinkParamValue>;
};
