'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumb = ({ items = [] }: { items?: BreadcrumbItem[] }) => {
  const pathname = usePathname() || '';

  if (items.length === 0) {
    const segments = pathname.split('/').filter(Boolean);
    
    items = [{ label: 'Home', href: '/minimal' }];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      // Skip the base "minimal" segment
      if (index === 0 && segment === 'minimal') return;
      
      currentPath += `/${segment}`;
      
      // Formatting segment string to label
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      items.push({
        label,
        href: index === segments.length - 1 ? undefined : `/minimal${currentPath}`,
      });
    });
  }

  // If there's only Home, don't render breadcrumbs
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.15em] font-['Inter'] mb-8">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="text-[#050505] font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link 
                    href={item.href || '#'} 
                    className="text-[#9B9B9B] hover:text-[#050505] transition-colors motion-reduce:transition-none no-underline"
                  >
                    {item.label}
                  </Link>
                  <span className="mx-2 text-[#E5E5E5] font-light">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
