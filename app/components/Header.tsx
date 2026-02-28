"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";
import headerData from "@/helpers/header.json";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleCloseMenu();
    }

    if (isMenuOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-muted bg-surface-base">
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-text-primary">
          <Image src={headerData.brandLogo} alt={headerData.brandLogoAlt} width={144}
            height={144}
            className="h-14 w-auto"
            priority />
          <a href="">{headerData.brand.slice(0, 9)}<span className="text-brand-primary">{headerData.brand.slice(10, 14)}</span></a>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {headerData.links.map((link) => (
            <a
              key={link.href}
              className="text-text-primary font-semibold transition-colors hover:text-brand-primary-hover"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button href={headerData.cta.href} className="hidden px-6 py-2.5 lg:block">
          {headerData.cta.label}
        </Button>

        <button
          className="text-text-primary lg:hidden"
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

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={handleCloseMenu}
      />

      {/* Drawer */}
      <aside
        id="mobile-menu"
        className={`fixed top-0 right-0 z-50 h-dvh w-[85vw] max-w-sm border-l border-border-muted bg-surface-base
  transform transition-transform duration-300 ease-out lg:hidden
  ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-border-muted px-6">
          <span className="text-text-primary font-semibold">Menu</span>
          <button
            type="button"
            onClick={handleCloseMenu}
            className="text-text-primary"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 px-6 py-6">
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
      </aside>
    </header>
  );
}
