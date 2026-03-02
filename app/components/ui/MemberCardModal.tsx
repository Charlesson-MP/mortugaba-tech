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
            className="rounded-lg px-3 py-2 text-text-secondary hover:bg-black/5 hover:text-text-primary transition"
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
                    alt={member.name}
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
                      {member.role}
                    </span>
                  </li>
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
                      className="flex items-center justify-center gap-2 rounded-lg bg-surface-base border border-border-muted px-4 py-2.5 text-sm font-medium text-text-primary transition hover:bg-black/5"
                    >
                      GitHub
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-primary/90"
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
