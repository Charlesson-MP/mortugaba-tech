"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/Button";
import howToJoinData from "@/helpers/how-to-join.json";

export function HowToJoin() {
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  useEffect(() => {
    if (isJoinOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isJoinOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsJoinOpen(false);
    }
    if (isJoinOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isJoinOpen]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    stack: "",
    interest: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const onlyDigits = (v: string) => v.replace(/\D/g, "");

  const formatBRPhone = (value: string) => {
    const digits = onlyDigits(value).slice(0, 11); // DDD + 9 dígitos máx
    const ddd = digits.slice(0, 2);
    const rest = digits.slice(2);

    if (digits.length === 0) return "";
    if (digits.length < 3) return `(${digits}`;

    // 8 dígitos (fixo) -> 4-4 | 9 dígitos (celular) -> 5-4
    const firstPartLen = rest.length > 8 ? 5 : 4;
    const first = rest.slice(0, firstPartLen);
    const second = rest.slice(firstPartLen, firstPartLen + 4);

    if (!second) return `(${ddd}) ${first}`;
    return `(${ddd}) ${first}-${second}`;
  };

  const isValidPhone = (v: string) => {
    const digits = onlyDigits(v);
    // Aceita DDD + 8 ou 9 dígitos
    return digits.length === 10 || digits.length === 11;
  };

  const isValid =
    form.name.trim().length >= 2 &&
    isValidPhone(form.phone) &&
    form.stack.trim().length >= 2 &&
    form.interest.trim().length >= 2;

  useEffect(() => {
    if (isJoinOpen) return;
    setForm({ name: "", phone: "", stack: "", interest: "" });
    setTouched({});
  }, [isJoinOpen]);

  const WHATSAPP_ADMIN = "5577991153244"; // troque pelo número real com DDI 55

  const buildWhatsappMessage = () => {
    const phoneDigits = form.phone.replace(/\D/g, "");

    return [
      "Olá! Quero entrar na Mortugaba Tech",
      "",
      `Nome: ${form.name.trim()}`,
      `Celular: ${form.phone.trim()}`,
      `Stack/Área: ${form.stack.trim()}`,
      `Interesse: ${form.interest.trim()}`,
      "",
      "— Enviado pelo site Mortugaba Tech"
    ].join("\n");
  };

  const openWhatsapp = () => {
    const text = encodeURIComponent(buildWhatsappMessage());
    const url = `https://wa.me/${WHATSAPP_ADMIN}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isJoinOpen) return;
    setForm({ name: "", phone: "", stack: "", interest: "" });
    setTouched({});
    setIsSubmitting(false);
  }, [isJoinOpen]);

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
              <li key={index} className="flex flex-col items-center gap-2 text-text-primary">
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
          <Button variant="rounded" className="px-8 py-2 text-lg" onClick={() => setIsJoinOpen(true)}>{howToJoinData.cta.label}</Button>
        </div>
      </div>

      {isJoinOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 px-4 py-6 flex items-center justify-center"
          onClick={() => setIsJoinOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-border-muted bg-surface-base shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header sticky com fechar */}
            <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-border-muted bg-surface-base px-6 py-4">
              <h3 className="text-lg font-semibold text-text-primary">Entrar na comunidade</h3>
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-text-secondary hover:bg-black/5 hover:text-text-primary transition"
                onClick={() => setIsJoinOpen(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Body rolável (por enquanto vazio) */}
            <div className="max-h-[calc(100dvh-220px)] overflow-y-auto px-6 py-5">
              <div className="max-h-[calc(100dvh-220px)] overflow-y-auto px-6 py-5">
                <form className="space-y-4">
                  {/* Nome */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-primary" htmlFor="join-name">
                      Nome
                    </label>
                    <input
                      id="join-name"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                      className="w-full rounded-lg border border-border-muted bg-surface-alt px-3 py-2 text-text-primary outline-none focus:border-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="Seu nome"
                      disabled={isSubmitting}
                    />
                    {touched.name && form.name.trim().length < 2 && (
                      <p className="text-sm text-red-400">Informe seu nome.</p>
                    )}
                  </div>

                  {/* Celular */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-primary" htmlFor="join-phone">
                      Celular (WhatsApp)
                    </label>
                    <input
                      id="join-phone"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: formatBRPhone(e.target.value) }))}
                      onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                      inputMode="tel"
                      className="w-full rounded-lg border border-border-muted bg-surface-alt px-3 py-2 text-text-primary outline-none focus:border-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="(77) 99999-9999"
                    />
                    {touched.phone && !isValidPhone(form.phone) && (
                      <p className="text-sm text-red-400">Informe um celular com DDD.</p>
                    )}
                  </div>

                  {/* Stack */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-primary" htmlFor="join-stack">
                      Stack / Área
                    </label>
                    <input
                      id="join-stack"
                      value={form.stack}
                      onChange={(e) => setForm((p) => ({ ...p, stack: e.target.value }))}
                      onBlur={() => setTouched((p) => ({ ...p, stack: true }))}
                      className="w-full rounded-lg border border-border-muted bg-surface-alt px-3 py-2 text-text-primary outline-none focus:border-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="Ex: Front-end, Back-end, Design..."
                      disabled={isSubmitting}
                    />
                    {touched.stack && form.stack.trim().length < 2 && (
                      <p className="text-sm text-red-400">Informe sua área/stack.</p>
                    )}
                  </div>

                  {/* Interesse */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-text-primary" htmlFor="join-interest">
                      Interesse
                    </label>
                    <input
                      id="join-interest"
                      value={form.interest}
                      onChange={(e) => setForm((p) => ({ ...p, interest: e.target.value }))}
                      onBlur={() => setTouched((p) => ({ ...p, interest: true }))}
                      className="w-full rounded-lg border border-border-muted bg-surface-alt px-3 py-2 text-text-primary outline-none focus:border-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="Ex: aprender, networking, trocar ideias..."
                      disabled={isSubmitting}
                    />
                    {touched.interest && form.interest.trim().length < 2 && (
                      <p className="text-sm text-red-400">Conte rapidamente seu interesse.</p>
                    )}
                  </div>
                </form>

                <div className="border-t border-border-muted px-6 py-4 flex items-center justify-end gap-3">
                  <Button variant="text" onClick={() => setIsJoinOpen(false)} disabled={isSubmitting}>
                    Cancelar
                  </Button>

                  <Button
                    disabled={!isValid || isSubmitting}
                    onClick={() => {
                      setTouched({ name: true, phone: true, stack: true, interest: true });
                      if (!isValid || isSubmitting) return;

                      setIsSubmitting(true);
                      setIsJoinOpen(false);

                      // abre WhatsApp imediatamente
                      openWhatsapp();
                    }}

                    className="px-4 py-2"
                  >
                    Enviar →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
