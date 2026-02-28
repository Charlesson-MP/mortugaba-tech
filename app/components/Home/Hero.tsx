import Image from "next/image";
import { Button } from "@/app/components/Button";
import heroData from "@/helpers/hero.json";

export function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center bg-surface-base pt-[72px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-6 mt-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="self-start py-1 px-3 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-[10px] font-bold uppercase tracking-wider">{heroData.span}</span>
            <h1 className="text-4xl leading-tight text-text-primary md:text-5xl lg:text-6xl font-black leading-tight">
              {heroData.title.slice(0, 24)}
              <span className="text-brand-accent">{heroData.title.slice(24, 30)}</span>
              {heroData.title.slice(30)}
            </h1>
            <p className="max-w-[480px] leading-relaxed text-text-secondary">{heroData.description}</p>
            <div className="mt-2 flex justify-center gap-4 sm:flex-row">
              <Button href={heroData.primaryCta.href} className="px-8 py-3 text-center">
                {heroData.primaryCta.label}
              </Button>
              <Button
                href={heroData.secondaryCta.href}
                variant="outline"
                className="px-8 py-3 text-center"
              >
                {heroData.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <div className="absolute inset-0 z-10 bg-overlay-dark" />
            <Image
              src={heroData.image.src}
              alt={heroData.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
