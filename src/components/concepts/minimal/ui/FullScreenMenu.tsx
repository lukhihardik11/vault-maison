import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';

interface LinkItem {
  label: string;
  href: string;
}

interface FullScreenMenuProps {
  links: LinkItem[];
  isActive: (href: string) => boolean;
}

export const FullScreenMenu = ({ links, isActive }: FullScreenMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="md:hidden bg-transparent border-none cursor-pointer p-1 text-[#050505] min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Menu"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#FFFFFF] z-[100] flex flex-col px-6 animate-in fade-in duration-200"
        >
          <div className="flex justify-between items-center h-16">
            <span className="font-['Inter'] text-[14px] font-medium tracking-[0.12em] uppercase text-[#050505]">
              Minimal Machine
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-none cursor-pointer p-2 text-[#050505] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex flex-col mt-10">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`minimal-mobile-link font-['Inter'] text-[15px] tracking-[0.15em] uppercase no-underline py-5 border-b border-[#E5E5E5] transition-colors duration-200 min-h-[60px] flex items-center ${
                  isActive(link.href) ? 'font-medium text-[#050505]' : 'font-light text-[#8A8A8A]'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
