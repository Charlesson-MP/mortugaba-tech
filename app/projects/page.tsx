"use client";

import { Footer } from "@/app/components/layout/Footer";
import ProjectCard, { Project } from "@/app/components/ui/ProjectCard";
import ProjectModal from "@/app/components/ui/ProjectCardModal";
import projects from "@/helpers/projects.json";
import { useMemo, useState } from "react";

const STACK_OPTIONS = [
  "Next.js",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "NestJS",
  "TypeScript",
  "JavaScript",
  "Tailwind",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "PHP",
  "Laravel",
  "Ruby",
  "Rails",
  "Go",
  "Rust",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Firebase",
  "AWS",
  "Figma",
];

function IconSearch() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-text-secondary"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function toggleStack(stack: string) {
    setSelectedStacks((prev) =>
      prev.includes(stack) ? prev.filter((s) => s !== stack) : [...prev, stack]
    );
  }

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase().trim();

    return projects
      .filter((p) => p.status === "published")
      .filter((p) => {
        if (!query) return true;
        return (
          p.title.toLowerCase().includes(query) || p.shortDescription.toLowerCase().includes(query)
        );
      })
      .filter((p) => {
        if (selectedStacks.length === 0) return true;
        return selectedStacks.some((s) => p.stack?.includes(s));
      });
  }, [search, selectedStacks]);

  const hasActiveFilters = search.trim() !== "" || selectedStacks.length > 0;

  return (
    <div className="min-h-screen bg-surface-base pt-[72px]">
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold text-text-primary md:text-5xl">Projetos</h1>
          <p className="mx-auto max-w-xl text-xs text-text-secondary">
            Explore todos os projetos desenvolvidos pela comunidade Mortugaba Tech.
          </p>
        </header>

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-6">
          {/* Search Input */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <IconSearch />
            </div>
            <input
              id="search-projects"
              type="text"
              placeholder="Buscar projetos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border-muted bg-surface-alt py-3 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30"
            />
          </div>

          {/* Stack Filter Chips */}
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Filtrar por tecnologia
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedStacks.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedStacks([])}
                  className="rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1.5 text-xs font-medium text-brand-accent transition hover:bg-brand-accent/20"
                >
                  ✕ Limpar filtros
                </button>
              )}
              {STACK_OPTIONS.map((stack) => {
                const isActive = selectedStacks.includes(stack);
                return (
                  <button
                    key={stack}
                    type="button"
                    onClick={() => toggleStack(stack)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      isActive
                        ? "border-brand-primary bg-brand-primary/20 text-brand-primary-hover shadow-sm shadow-brand-primary/10"
                        : "border-border-muted bg-surface-alt text-text-secondary hover:border-brand-primary/40 hover:text-text-primary"
                    }`}
                  >
                    {stack}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 rounded-full border border-border-muted bg-surface-alt p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-secondary"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <h3 className="mb-1 text-lg font-semibold text-text-primary">
              Nenhum projeto encontrado
            </h3>
            <p className="mb-4 max-w-sm text-sm text-text-secondary">
              Tente ajustar os termos de busca ou os filtros de tecnologia.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedStacks([]);
                }}
                className="rounded-full border border-brand-primary bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary transition hover:bg-brand-primary/20"
              >
                Limpar todos os filtros
              </button>
            )}
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          open={!!selectedProject}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </main>

      <Footer />
    </div>
  );
}
