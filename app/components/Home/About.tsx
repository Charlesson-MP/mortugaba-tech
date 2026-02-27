import { Button } from "@/app/components/Button";
import aboutData from "@/helpers/about.json";

function getIcon(iconName: string) {
  if (iconName === "code") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#C2A56B]"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }

  if (iconName === "users") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#C2A56B]"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#C2A56B]"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function About() {
  return (
    <section id="sobre" className="bg-[#111827] py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="mb-16 text-center text-[24px] font-semibold text-[#F3F4F6] md:text-[36px]">
          {aboutData.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {aboutData.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-800 bg-[#0F172A] p-8 transition-shadow hover:shadow-lg hover:shadow-black/20"
            >
              <div className="mb-6">{getIcon(item.icon)}</div>
              <h3 className="mb-4 text-xl font-semibold text-[#F3F4F6]">{item.title}</h3>
              <p className="mb-6 leading-relaxed text-[#9CA3AF]">{item.description}</p>
              <Button variant="text">{item.actionLabel} →</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
