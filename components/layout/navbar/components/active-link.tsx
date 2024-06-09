'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from "classnames";

interface IActiveNavLink {
  link: string;
  className: string;
  activeClassName?: string;
  children: React.ReactNode;
}

const ActiveNavLink: React.FC<IActiveNavLink> = ({ link, className, activeClassName, children }) => {
  const pathName = usePathname();
  const isActive = pathName === link;

  // Combine the base className with the activeClassName if the link is active
  const finalClassName = cn(className, isActive && activeClassName);

  return (
    <Link href={link} className={finalClassName}>
      {children}
    </Link >
  );
};

export default ActiveNavLink;