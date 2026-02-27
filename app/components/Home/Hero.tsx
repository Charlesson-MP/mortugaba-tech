import Image from "next/image";
import { Button } from "@/app/components/Button";
import heroData from "@/helpers/hero.json";

export function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center bg-[#0F172A] pt-[72px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="text-[32px] leading-tight font-semibold text-[#F3F4F6] md:text-[48px]">
              {heroData.title}
            </h1>
            <p className="max-w-[480px] leading-relaxed text-[#9CA3AF]">{heroData.description}</p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row">
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
            <div className="absolute inset-0 z-10 bg-black/30" />
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
