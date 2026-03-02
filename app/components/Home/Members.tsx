"use client";

import { Button } from "@/app/components/ui/Button";
import MemberCard, { Member } from "@/app/components/ui/MemberCard";
import MemberModal from "@/app/components/ui/MemberCardModal";
import membersData from "@/helpers/members.json";
import { useState } from "react";

export function Members() {
  const [selected, setSelected] = useState<Member | null>(null);

  return (
    <section id="membros" className="bg-surface-alt py-6 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center">
        <h2 className="mb-2 text-[24px] font-semibold text-text-primary md:text-[36px]">
          {membersData.title}
        </h2>
        <p className="mb-10 text-sm text-text-secondary/60">
          Conheça os membros fundadores da comunidade.
        </p>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {membersData.items.map((member) => (
            <MemberCard key={member.id} member={member as Member} onOpen={(m) => setSelected(m)} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            href="/membros"
            variant="rounded"
            className="px-8 py-3 text-sm font-semibold tracking-wide shadow-lg shadow-brand-primary/10 transition-all hover:shadow-brand-primary/20"
          >
            Ver todos os membros
          </Button>
        </div>
      </div>

      <MemberModal open={!!selected} member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
