"use client";

import Image from "next/image";

export type Member = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
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
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-brand-accent/40 bg-surface-base transition-all duration-300 group-hover:border-brand-accent">
          <Image
            src={member.avatarUrl}
            alt={`Foto de perfil de ${member.name}`}
            fill
            className="object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
            sizes="128px"
            priority={false}
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-brand-accent">
          {member.name}
        </h3>
        <p className="text-sm text-text-secondary">{member.role}</p>
      </div>

      <button
        type="button"
        onClick={() => onOpen(member)}
        className="inline-flex items-center gap-2 rounded-full border border-border-muted bg-surface-base px-5 py-2 text-xs font-medium text-text-primary transition-all hover:border-brand-accent hover:bg-brand-accent/10"
      >
        Ver perfil
      </button>
    </article>
  );
}
