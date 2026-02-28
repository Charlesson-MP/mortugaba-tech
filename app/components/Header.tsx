"use client";

import { useState } from "react";
import { Button } from "@/app/components/Button";
import headerData from "@/helpers/header.json";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-muted bg-surface-base">
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-6">
        <div className="text-xl font-semibold text-text-primary">{headerData.brand}</div>

        <nav className="hidden items-center gap-8 md:flex">
          {headerData.links.map((link) => (
            <a
              key={link.href}
              className="text-text-primary transition-colors hover:text-brand-accent"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button href={headerData.cta.href} className="hidden px-6 py-2.5 md:block">
          {headerData.cta.label}
        </Button>

        <button
          className="text-text-primary md:hidden"
          type="button"
          onClick={handleToggleMenu}
          aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <>
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-border-muted bg-surface-base md:hidden">
          <nav className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-6 py-4">
            {headerData.links.map((link) => (
              <a
                key={link.href}
                className="text-text-primary transition-colors hover:text-brand-accent"
                href={link.href}
                onClick={handleCloseMenu}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-2 block px-6 py-2.5 text-center"
              href={headerData.cta.href}
              onClick={handleCloseMenu}
            >
              {headerData.cta.label}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
