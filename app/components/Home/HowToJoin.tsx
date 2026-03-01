import { Button } from "@/app/components/Button";
import howToJoinData from "@/helpers/how-to-join.json";

export function HowToJoin() {
  return (
    <section id="participar" className="bg-surface-alt py-6 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="mb-2 text-center text-[24px] font-semibold text-text-primary md:text-[36px]">
          {howToJoinData.title}
        </h2>

        <p className="mb-14 text-center text-text-secondary text-sm">{howToJoinData.subtitle}</p>

        <div className="mx-auto mb-12 max-w-[600px]">
          <ol className="space-y-4 flex flex-col gap-4 justify-center md:flex-row md:flex-wrap lg:flex-nowrap lg: gap-12">
            {howToJoinData.steps.map((step, index) => (
              <li className="flex flex-col items-center gap-2 text-text-primary">
                <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${index === 0 ? "bg-brand-primary" : "bg-border-muted"} font-bold`}>
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-center">{step.title}</h3>
                <p className="text-center text-xs text-text-secondary/50 w-50">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex justify-center">
          <Button variant="rounded" className="px-8 py-2 text-lg">{howToJoinData.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
