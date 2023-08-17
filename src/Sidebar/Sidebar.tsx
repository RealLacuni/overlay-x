import React from 'react';
import { ClassNameProps, NavItem } from '../types';
import SidebarItem from './SidebarItem';
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline';


const navigation: NavItem[] = [
  // name, href, icon, current
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
];

function Sidebar(props: ClassNameProps) {
  console.log(props);
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <SidebarItem item={item} />
      ))}
    </nav>
  );
}

export default Sidebar;
