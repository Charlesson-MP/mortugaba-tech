"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";
import aboutData from "@/helpers/about.json";

function getIcon(iconName: string) {
  if (iconName === "code") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
        <path d="M15 12h-5" />
        <path d="M15 8h-5" />
        <path d="M19 17V5a2 2 0 0 0-2-2H4" />
        <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
      </svg>
    );
  }

  if (iconName === "users") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

type AboutItem = {
  title: string;
  icon: string;
  description: string;
  actionLabel: string;
  actionType?: "modal" | "route";
  href?: string;
};

export function About() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<AboutItem | null>(null);

  const items = aboutData.items as AboutItem[];

  // trava o scroll quando abre modal
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // fecha no ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveItem(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <section id="sobre" className="bg-surface-alt py-6 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="mb-16 text-center text-[24px] font-semibold text-text-primary md:text-[36px]">
          {aboutData.title}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {items.map((item, index) => {
            const isRoute = item.actionType === "route" && item.href;
            const isLast = index === items.length - 1;

            // Lógica para centralizar o último card se ele estiver sozinho na linha
            // No md (2 colunas), centraliza se for um índice par (0, 2, 4...) sendo o último
            const mdCentering = isLast && index % 2 === 0 ? "md:col-start-4" : "";
            // No lg (3 colunas), centraliza se for o primeiro de uma nova linha (índice 3, 6...) sendo o último
            const lgCentering = isLast && index % 3 === 0 ? "lg:col-start-5" : "lg:col-start-auto";

            return (
              <div
                key={item.title}
                className={[
                  "rounded-xl border border-border-muted bg-surface-base p-6 lg:p-8 transition-shadow hover:shadow-lg hover:shadow-black/20",
                  "flex flex-col",
                  "col-span-1 md:col-span-6 lg:col-span-4",
                  mdCentering,
                  lgCentering,
                ].join(" ")}
              >
                <div className="mb-6">{getIcon(item.icon)}</div>
                <h3 className="mb-4 text-xl font-semibold text-text-primary">{item.title}</h3>

                <p className="mb-6 leading-relaxed text-text-secondary line-clamp-3">
                  {item.description}
                </p>

                {/* ✅ route = link âncora; modal = botão */}
                {isRoute ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href!)}
                    className="inline-flex items-center text-brand-accent transition-colors hover:text-brand-accent-hover"
                  >
                    {item.actionLabel} →
                  </a>
                ) : (
                  <Button
                    variant="text"
                    onClick={() => {
                      setActiveItem(item);
                      setOpen(true);
                    }}
                    className="text-left"
                  >
                    {item.actionLabel} →
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL só para cards que abrem modal */}
      {open && activeItem && activeItem.actionType === "modal" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={() => {
            setOpen(false);
            setActiveItem(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
        >
          <div
            className="flex w-full max-w-2xl max-h-[calc(100dvh-48px)] flex-col overflow-hidden rounded-2xl border border-border-muted bg-surface-base shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Sticky */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border-muted/30 bg-surface-base p-6">
              <div>
                <div className="mb-3">{getIcon(activeItem.icon)}</div>
                <h3 id="about-modal-title" className="text-xl font-semibold text-text-primary">
                  {activeItem.title}
                </h3>
              </div>

              <button
                type="button"
                className="rounded-lg px-3 py-2 text-text-secondary hover:bg-black/5 hover:text-text-primary transition"
                onClick={() => {
                  setOpen(false);
                  setActiveItem(null);
                }}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Body rolável */}
            <div className="flex-1 overflow-y-auto p-6 pt-2">
              <p className="leading-relaxed text-text-secondary whitespace-pre-line">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}