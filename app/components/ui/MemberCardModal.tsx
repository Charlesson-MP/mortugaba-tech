"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Member } from "./MemberCard";

type Props = {
  open: boolean;
  member: Member | null;
  onClose: () => void;
};

export default function MemberModal({ open, member, onClose }: Props) {
  const ANIMATION_MS = 420;
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [displayMember, setDisplayMember] = useState<Member | null>(null);

  useEffect(() => {
    if (open && member) {
      setDisplayMember(member);
      setShouldRender(true);

      const raf = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(raf);
    }

    setIsVisible(false);

    const timeout = setTimeout(() => {
      setShouldRender(false);
      setDisplayMember(null);
    }, ANIMATION_MS);

    return () => clearTimeout(timeout);
  }, [open, member]);

  useEffect(() => {
    if (!shouldRender) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shouldRender, onClose]);

  // Bloquear scroll do body quando aberto
  useEffect(() => {
    if (!shouldRender) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shouldRender]);

  if (!shouldRender || !displayMember) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 backdrop-blur-[3px]" : "opacity-0 backdrop-blur-0"
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Perfil do membro"
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className={`relative flex h-[85vh] w-full max-w-3xl origin-top flex-col overflow-hidden rounded-2xl border border-border-muted bg-surface-base shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[700px] ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100 blur-0"
            : "translate-y-10 scale-[0.92] opacity-0 blur-[2px]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border-muted bg-surface-base text-lg font-semibold leading-none text-text-primary shadow-sm transition hover:bg-black/5"
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Header - Sticky */}
        <div
          className={`sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border-muted/30 bg-surface-base p-6 pb-4 pr-16 transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100 delay-75" : "-translate-y-2 opacity-0"
          }`}
        >
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold text-text-primary">{displayMember.name}</h3>
            <p className="mt-1 text-sm text-text-secondary">{displayMember.role}</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          className={`flex-1 overflow-y-auto p-6 pt-6 transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100 delay-150" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr]">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Profile Image Section */}
              <div className="flex justify-center md:justify-start">
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-brand-accent/20 bg-surface-alt shadow-inner">
                  <Image
                    src={displayMember.avatarUrl}
                    alt={`Foto de perfil de ${displayMember.name}`}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                  Sobre mim
                </h4>
                <p className="mt-4 text-[15px] leading-relaxed text-text-secondary whitespace-pre-line">
                  {displayMember.bio}
                </p>
              </div>

              {displayMember.professionalHistory && displayMember.professionalHistory.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                    Histórico profissional
                  </h4>
                  <div className="mt-4 space-y-3">
                    {displayMember.professionalHistory.slice(0, 3).map((experience, index) => (
                      <div
                        key={`${experience.company}-${experience.role}-${index}`}
                        className="rounded-lg border border-border-muted/70 bg-surface-alt p-3.5"
                      >
                        <p className="text-sm font-semibold text-text-primary">
                          {experience.role} · {experience.company}
                        </p>
                        {experience.period && (
                          <p className="mt-0.5 text-xs text-text-secondary/80">{experience.period}</p>
                        )}
                        {experience.summary && (
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                            {experience.summary}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Aside */}
            <aside className="space-y-6">
              {/* Member Details Card */}
              <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                  Detalhes
                </h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <span className="block text-[11px] font-medium uppercase tracking-widest text-text-secondary/60">
                      Cargo
                    </span>
                    <span className="mt-1 block text-sm font-medium text-text-primary">
                      {displayMember.currentPosition ?? displayMember.role}
                    </span>
                  </li>
                  {displayMember.location && (
                    <li>
                      <span className="block text-[11px] font-medium uppercase tracking-widest text-text-secondary/60">
                        Localização
                      </span>
                      <span className="mt-1 block text-sm font-medium text-text-primary">
                        {displayMember.location}
                      </span>
                    </li>
                  )}
                  <li>
                    <span className="block text-[11px] font-medium uppercase tracking-widest text-text-secondary/60">
                      Tipo de Membro
                    </span>
                    <span className="mt-1 inline-flex rounded-full bg-brand-accent/10 px-2.5 py-0.5 text-xs font-semibold text-brand-accent">
                      {displayMember.memberType === "founder" ? "Fundador" : "Membro"}
                    </span>
                  </li>
                </ul>
              </div>

              {displayMember.skills && displayMember.skills.length > 0 && (
                <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                    Skills
                  </h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {displayMember.skills.slice(0, 10).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-brand-accent/25 bg-brand-accent/10 px-2.5 py-1 text-xs font-medium text-brand-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {displayMember.education && displayMember.education.length > 0 && (
                <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                    Escolaridade
                  </h4>
                  <div className="mt-4 space-y-3">
                    {displayMember.education.slice(0, 2).map((edu, index) => (
                      <div key={`${edu.institution}-${index}`}>
                        <p className="text-sm font-semibold text-text-primary">{edu.institution}</p>
                        <p className="text-sm text-text-secondary">{edu.degree}</p>
                        {edu.period && <p className="text-xs text-text-secondary/80">{edu.period}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links Card */}
              <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                  Redes Sociais
                </h4>
                <div className="mt-4 flex flex-col gap-2">
                  {displayMember.links.github && (
                    <a
                      href={displayMember.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border-muted bg-surface-base px-4 py-2.5 text-sm font-medium text-text-primary transition hover:bg-black/5"
                    >
                      GitHub
                    </a>
                  )}
                  {displayMember.links.linkedin && (
                    <a
                      href={displayMember.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-primary/90"
                    >
                      LinkedIn
                    </a>
                  )}
                  {!displayMember.links.github && !displayMember.links.linkedin && (
                    <p className="text-sm text-text-secondary italic">Nenhum link disponível.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
