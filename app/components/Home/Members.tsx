import Image from "next/image";
import { Button } from "@/app/components/Button";
import membersData from "@/helpers/members.json";

export function Members() {
  return (
    <section id="membros" className="bg-surface-alt py-6">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="mb-16 text-center text-[24px] font-semibold text-text-primary md:text-[36px]">
          {membersData.title}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {membersData.items.map((member) => (
            <article
              key={member.name}
              className="flex flex-col items-center rounded-xl bg-surface-base p-6 text-center"
            >
              <div className="relative mb-4 h-[120px] w-[120px] overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-text-primary">{member.name}</h3>
              <p className="mb-4 text-sm text-text-secondary">{member.role}</p>
              <Button variant="textSmall">{member.actionLabel} →</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
