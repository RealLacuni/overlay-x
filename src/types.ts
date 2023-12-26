import * as React from "react";
import { ShapeFields } from "../shared/types";

declare const HomeIcon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;

type ClassNameProps = {
  className?: string;
};
type NavItem = {
  name: string; href: string;
  icon: typeof HomeIcon;
  current: boolean;
}

type FormSettingInputs = {
  toggleOverlay: string;
  openMenu: string;
  shape: string;
  shapeInputs: ShapeFields;
  currentProfile: string;
};

export type { ClassNameProps, NavItem, FormSettingInputs };