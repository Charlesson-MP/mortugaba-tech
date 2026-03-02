"use client";

import { useMemo, useState } from "react";
import ProjectCard, { Project } from "@/app/components/ui/ProjectCard";
import ProjectModal from "@/app/components/ui/ProjectCardModal";
import projects from "@/helpers/projects.json";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const visibleProjects = useMemo(() => projects.filter((p) => p.status === "published"), []);

  return (
    <section id="projetos" className="mx-auto w-full max-w-6xl px-4 py-16">
      <header className="mb-10">
        <h2 className="text-left text-[24px] font-semibold text-text-primary md:text-[36px]">Projetos</h2>
        <p className="mt-2 text-text-secondary text-sm">Projetos recentes</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={(p) => setSelected(p)} />
        ))}
      </div>

      <ProjectModal open={!!selected} project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
