"use client";

import { useEffect } from "react";
import type { Project } from "./ProjectCard";

type Props = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ open, project, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Bloquear scroll do body quando aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      aria-modal="true"
      role="dialog"
      aria-label="Detalhes do projeto"
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative flex w-full max-w-3xl h-[85vh] md:h-[700px] flex-col overflow-hidden rounded-2xl border border-border-muted bg-surface-base shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border-muted/30 bg-surface-base p-6 pb-4">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold text-text-primary">{project.title}</h3>
            <p className="mt-1 text-sm text-text-secondary">{project.shortDescription}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-text-secondary hover:bg-black/5 hover:text-text-primary transition"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr]">
            <div className="space-y-6">
              {project.coverImage ? (
                <div className="overflow-hidden rounded-xl border border-border-muted bg-surface-alt">
                  <img
                    src={project.coverImage.src}
                    alt={project.coverImage.alt}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : null}

              <div>
                <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Sobre o Projeto
                </h4>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-text-secondary">
                  {project.description}
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Autores
                </h4>
                <ul className="mt-4 space-y-3">
                  {project.authors?.length ? (
                    project.authors.map((a) => (
                      <li key={`${a.name}-${a.role ?? ""}`} className="text-sm">
                        <div className="flex flex-col gap-0.5">
                          {a.url ? (
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-text-primary underline-offset-4 hover:underline hover:text-brand-accent"
                            >
                              {a.name}
                            </a>
                          ) : (
                            <span className="font-medium text-text-primary">{a.name}</span>
                          )}

                          {a.role ? (
                            <span className="text-xs text-text-secondary">{a.role}</span>
                          ) : null}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-text-secondary">Nenhum autor listado.</li>
                  )}
                </ul>
              </div>

              {!!project.stack?.length && (
                <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                  <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                    Stack
                  </h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 text-xs font-medium text-brand-primary"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!!project.tags?.length && (
                <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                  <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                    Tags
                  </h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-surface-base border border-border-muted px-3 py-1 text-xs text-text-secondary"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Links
                </h4>
                <div className="mt-4 flex flex-col gap-2">
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-surface-base border border-border-muted px-4 py-2.5 text-sm font-medium text-text-primary transition hover:bg-black/5"
                    >
                      Repositório
                    </a>
                  ) : null}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-primary/90"
                    >
                      Link ao vivo
                    </a>
                  ) : null}

                  {!project.repoUrl && !project.liveUrl ? (
                    <p className="text-sm text-text-secondary">Nenhum link disponível.</p>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
