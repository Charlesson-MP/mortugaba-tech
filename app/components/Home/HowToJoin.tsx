import { Button } from "@/app/components/Button";
import howToJoinData from "@/helpers/how-to-join.json";

export function HowToJoin() {
  return (
    <section id="participar" className="bg-surface-alt py-6">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="mb-16 text-center text-[24px] font-semibold text-text-primary md:text-[36px]">
          {howToJoinData.title}
        </h2>

        <div className="mx-auto mb-12 max-w-[600px]">
          <ol className="space-y-4">
            {howToJoinData.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4 text-text-primary">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary font-semibold">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex justify-center">
          <Button className="px-12 py-4 text-lg">{howToJoinData.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
