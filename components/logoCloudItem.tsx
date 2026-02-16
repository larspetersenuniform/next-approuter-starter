import {
  ComponentParameter,
  ComponentProps,
  UniformText,
} from "@uniformdev/next-app-router/component";
import type { AssetParamValue } from "@uniformdev/canvas";
import { flattenValues } from "@uniformdev/canvas";

type LinkParamValue = {
  path: string;
  type?: string;
};

export type LogoCloudItemProps = {
  logo?: ComponentParameter<AssetParamValue>;
  link?: ComponentParameter<LinkParamValue>;
  name?: ComponentParameter<string>;
};

export const LogoCloudItemComponent = ({
  parameters: { logo, link, name },
  component,
}: ComponentProps<LogoCloudItemProps>) => {
  const logoAssets = logo?.value ?? [];
  const image = flattenValues(logoAssets, { toSingle: true });
  const linkValue = link?.value;
  const nameValue = name?.value || image?.fields?.title?.value || "Logo";

  const imageElement = image?.url ? (
    <img
      src={image.url}
      alt={nameValue}
      className="h-8 w-auto max-w-[120px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
    />
  ) : (
    <div className="flex h-8 w-[120px] items-center justify-center rounded bg-neutral-100 text-xs text-neutral-400">
      <UniformText
        component={component}
        parameter={name}
        placeholder="Logo"
      />
    </div>
  );

  if (linkValue?.path) {
    return (
      <a
        href={linkValue.path}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center px-8 no-underline"
        aria-label={nameValue}
      >
        {imageElement}
      </a>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center px-8">
      {imageElement}
    </span>
  );
};
