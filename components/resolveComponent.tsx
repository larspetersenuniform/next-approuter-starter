import type { ComponentType } from "react";
import {
  ResolveComponentFunction,
} from "@uniformdev/next-app-router";

import { HeroComponent } from "./hero";
import { Page } from "./page";
import { CardComponent } from "./card";
import { CardGridComponent } from "./cardGrid";
import { ComponentProps } from "@uniformdev/next-app-router/component";

// Register components here: key = component type, value = React component
const componentRegistry: Record<string, ComponentType<any>> = {
  page: Page,
  hero: HeroComponent,
  card: CardComponent,
  cardGrid: CardGridComponent,
};

export const resolveComponent: ResolveComponentFunction = ({ component }) => {
  return {
    component: componentRegistry[component.type] ?? DefaultNotFoundComponent,
  };
};

// This component is used to display a message when a component is not found
const DefaultNotFoundComponent = ({ type }: ComponentProps) => process.env.NODE_ENV === 'development' ? <div>Not Found: {type}</div> : null;
