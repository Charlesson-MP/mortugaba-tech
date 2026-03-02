export type ProjectAuthor = {
  name: string;
  url?: string;
  role?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;

  authors: ProjectAuthor[];

  shortDescription: string; // card
  description: string; // modal

  coverImage?: { src: string; alt: string };

  stack?: string[];
  tags?: string[];

  repoUrl?: string;
  liveUrl?: string;

  status: string;
  createdAt?: string;
};

function formatAuthorsInline(authors: ProjectAuthor[]) {
  if (!authors?.length) return "Por Autor Desconhecido";

  const [first, second, ...rest] = authors;

  if (authors.length === 1) return `Por ${first.name}`;
  if (authors.length === 2) return `Por ${first.name} & ${second.name}`;

  return `Por ${first.name} +${authors.length - 1}`;
}

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:bg-white/10">
      {project.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-white/5" />
      )}

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white">{project.title}</h3>
            <p className="mt-1 text-xs text-white/60">{formatAuthorsInline(project.authors)}</p>
          </div>

          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
            {project.status === "published"
              ? "Publicado"
              : project.status === "draft"
                ? "Rascunho"
                : "Arquivado"}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-white/70">{project.shortDescription}</p>

        {!!project.stack?.length && (
          <ul className="flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((t) => (
              <li key={t} className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/70">
                {t}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          Ver detalhes
          <span aria-hidden className="text-white/50">
            →
          </span>
        </button>
      </div>
    </article>
  );
}