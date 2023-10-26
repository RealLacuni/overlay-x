import * as React from "react";

declare const HomeIcon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;

type ClassNameProps = {
  className?: string;
};
type NavItem = {
  name: string; href: string;
  icon: typeof HomeIcon;
  current: boolean;
}

export type { ClassNameProps, NavItem };