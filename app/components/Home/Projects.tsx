"use client";

import { Button } from "@/app/components/ui/Button";
import ProjectCard, { Project } from "@/app/components/ui/ProjectCard";
import ProjectModal from "@/app/components/ui/ProjectCardModal";
import projects from "@/helpers/projects.json";
import { useMemo, useState } from "react";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const visibleProjects = useMemo(() => projects.filter((p) => p.status === "published"), []);

  return (
    <section id="projetos" className="mx-auto w-full max-w-6xl px-4 py-6">
      <header className="mb-10">
        <h2 className="mb-2 text-center text-[24px] font-semibold text-text-primary md:text-[36px]">
          Projetos
        </h2>
        <p className="text-center text-text-secondary text-sm">Projetos recentes</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={(p) => setSelected(p)} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Button
          href="/projetos"
          variant="rounded"
          className="px-8 py-3 text-sm font-semibold tracking-wide shadow-lg shadow-brand-primary/10 transition-all hover:shadow-brand-primary/20"
        >
          Ver todos os projetos
        </Button>
      </div>

      <ProjectModal open={!!selected} project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
