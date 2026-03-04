"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Member } from "./MemberCard";

type Props = {
  open: boolean;
  member: Member | null;
  onClose: () => void;
};

export default function MemberModal({ open, member, onClose }: Props) {
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

  if (!open || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      aria-modal="true"
      role="dialog"
      aria-label="Perfil do membro"
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
            <h3 className="truncate text-xl font-semibold text-text-primary">{member.name}</h3>
            <p className="mt-1 text-sm text-text-secondary">{member.role}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-2 text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-6">
          <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr]">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Profile Image Section */}
              <div className="flex justify-center md:justify-start">
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-brand-accent/20 bg-surface-alt shadow-inner">
                  <Image
                    src={member.avatarUrl}
                    alt={`Foto de perfil de ${member.name}`}
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
                  {member.bio}
                </p>
              </div>

              {member.professionalHistory && member.professionalHistory.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                    Histórico profissional
                  </h4>
                  <div className="mt-4 space-y-3">
                    {member.professionalHistory.slice(0, 3).map((experience, index) => (
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
                      {member.currentPosition ?? member.role}
                    </span>
                  </li>
                  {member.location && (
                    <li>
                      <span className="block text-[11px] font-medium uppercase tracking-widest text-text-secondary/60">
                        Localização
                      </span>
                      <span className="mt-1 block text-sm font-medium text-text-primary">
                        {member.location}
                      </span>
                    </li>
                  )}
                  <li>
                    <span className="block text-[11px] font-medium uppercase tracking-widest text-text-secondary/60">
                      Tipo de Membro
                    </span>
                    <span className="mt-1 inline-flex rounded-full bg-brand-accent/10 px-2.5 py-0.5 text-xs font-semibold text-brand-accent">
                      {member.memberType === "founder" ? "Fundador" : "Membro"}
                    </span>
                  </li>
                </ul>
              </div>

              {member.skills && member.skills.length > 0 && (
                <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                    Skills
                  </h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.skills.slice(0, 10).map((skill) => (
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

              {member.education && member.education.length > 0 && (
                <div className="rounded-xl border border-border-muted bg-surface-alt p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                    Escolaridade
                  </h4>
                  <div className="mt-4 space-y-3">
                    {member.education.slice(0, 2).map((edu, index) => (
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
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border-muted bg-surface-base px-4 py-2.5 text-sm font-medium text-text-primary transition hover:bg-black/5"
                    >
                      GitHub
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-primary/90"
                    >
                      LinkedIn
                    </a>
                  )}
                  {!member.links.github && !member.links.linkedin && (
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
