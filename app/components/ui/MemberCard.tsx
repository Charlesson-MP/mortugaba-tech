"use client";

import Image from "next/image";

export type Member = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  currentPosition?: string;
  location?: string;
  professionalHistory?: Array<{
    role: string;
    company: string;
    period?: string;
    summary?: string;
  }>;
  skills?: string[];
  education?: Array<{
    institution: string;
    degree: string;
    period?: string;
  }>;
  links: {
    github?: string;
    linkedin?: string;
  };
  memberType: string;
};

type Props = {
  member: Member;
  onOpen: (member: Member) => void;
};

export default function MemberCard({ member, onOpen }: Props) {
  return (
    <article className="group flex flex-col items-center text-center">
      {/* Circle Container */}
      <div className="relative mb-6">
        {/* Outer Ring Animation */}
        <div className="absolute -inset-2 rounded-full border-2 border-brand-accent/20 opacity-0 transition-all duration-500 group-hover:inset-[-12px] group-hover:border-brand-accent/40 group-hover:opacity-100" />

        {/* Main Circle */}
        <button
          type="button"
          onClick={() => onOpen(member)}
          className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-full border-2 border-brand-accent/40 bg-surface-base transition-all duration-300 group-hover:border-brand-accent"
          aria-label={`Abrir perfil de ${member.name}`}
        >
          <Image
            src={member.avatarUrl}
            alt={`Foto de perfil de ${member.name}`}
            fill
            className="object-cover grayscale-0 transition-all duration-500 md:grayscale md:group-hover:scale-110 md:group-hover:grayscale-0"
            sizes="128px"
            priority={false}
          />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary transition-colors md:group-hover:text-brand-accent">
          {member.name}
        </h3>
        <p className="text-sm text-text-secondary">{member.role}</p>
      </div>

      <button
        type="button"
        onClick={() => onOpen(member)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border-muted bg-surface-base px-5 py-2 text-xs font-medium text-text-primary transition-all hover:border-brand-accent hover:bg-brand-accent/10"
      >
        Ver perfil
      </button>
    </article>
  );
}
