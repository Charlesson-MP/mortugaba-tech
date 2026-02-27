import Image from "next/image";
import { Button } from "@/app/components/Button";
import projectsData from "@/helpers/projects.json";

export function Projects() {
  return (
    <section id="projetos" className="bg-[#0F172A] py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="mb-16 text-center text-[24px] font-semibold text-[#F3F4F6] md:text-[36px]">
          {projectsData.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {projectsData.items.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-xl bg-[#111827] transition-shadow hover:shadow-lg hover:shadow-black/20"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-semibold text-[#F3F4F6]">{project.title}</h3>
                <p className="mb-4 leading-relaxed text-[#9CA3AF]">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#0F172A] px-3 py-1 text-sm text-[#C2A56B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="text">{project.actionLabel} →</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
