import React from "react";
import { NavItem } from "../types";
import { classNames } from "../util/classNames";


type SidebarItemProps = {
  item: NavItem;
};


const SidebarItem = (props: SidebarItemProps) => {
  const { item } = props;
  return (
    <a
      key={item.name}
      href={item.href}
      className={classNames(
        item.current ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
      )}
      aria-current={item.current ? "page" : undefined}
    >
      <item.icon
        className={classNames(
          item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
        )}
        aria-hidden="true"
      />
      <span className="truncate">{item.name}</span>
    </a>
  );
};

export default SidebarItem;
