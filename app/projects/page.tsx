"use client";

import { Footer } from "@/app/components/layout/Footer";
import ProjectCard, { Project } from "@/app/components/ui/ProjectCard";
import ProjectModal from "@/app/components/ui/ProjectCardModal";
import projects from "@/helpers/projects.json";
import { useEffect, useMemo, useRef, useState } from "react";

const STACK_CATEGORIES = {
  Frontend: ["Next.js", "React", "Vue.js", "Angular", "Tailwind", "TypeScript", "JavaScript"],
  Backend: [
    "Node.js",
    "Express",
    "NestJS",
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
  ],
  Database: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
  "Infra & DevOps": ["Docker", "AWS"],
  Design: ["Figma"],
};

const ALL_STACK_OPTIONS = Object.values(STACK_CATEGORIES).flat();

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div className="mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <IconSearch />
              </div>
              <input
                id="search-projects"
                type="text"
                placeholder="Buscar por nome ou descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border-muted bg-surface-alt py-3 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex h-full w-full items-center justify-between gap-3 rounded-xl border px-5 py-3 text-sm font-medium transition md:w-auto ${
                  isFilterOpen || selectedStacks.length > 0
                    ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                    : "border-border-muted bg-surface-alt text-text-secondary hover:border-brand-primary/40 hover:text-text-primary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  <span>Filtrar</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedStacks.length > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-[10px] text-white">
                      {selectedStacks.length}
                    </span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </button>

              {/* Dropdown Panel */}
              {isFilterOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-full min-w-[320px] max-w-[90vw] overflow-hidden rounded-2xl border border-border-muted bg-surface-alt shadow-2xl shadow-black/50 md:w-[480px]">
                  <div className="max-h-[70vh] overflow-y-auto p-5">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {Object.entries(STACK_CATEGORIES).map(([category, stacks]) => (
                        <div key={category} className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary/70">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {stacks.map((stack) => {
                              const isActive = selectedStacks.includes(stack);
                              return (
                                <button
                                  key={stack}
                                  type="button"
                                  onClick={() => toggleStack(stack)}
                                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                                    isActive
                                      ? "border-brand-primary bg-brand-primary text-white"
                                      : "border-border-muted bg-surface-base text-text-secondary hover:border-brand-primary/40 hover:text-text-primary"
                                  }`}
                                >
                                  {stack}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center border-t border-border-muted bg-surface-base/50 p-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStacks([]);
                        setIsFilterOpen(false);
                      }}
                      className="text-xs font-medium text-text-secondary transition-colors hover:text-brand-accent"
                    >
                      Limpar todos os filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Filter Tags */}
          {selectedStacks.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Ativos:
              </span>
              {selectedStacks.map((stack) => (
                <button
                  key={stack}
                  onClick={() => toggleStack(stack)}
                  className="flex items-center gap-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary transition hover:bg-brand-primary/20"
                >
                  {stack}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              ))}
              <button
                onClick={() => setSelectedStacks([])}
                className="ml-1 flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-accent transition hover:bg-brand-accent/15"
              >
                Limpar todos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          )}
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
