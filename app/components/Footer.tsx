"use client";

import footerData from "@/helpers/footer.json";
import Image from "next/image";

function IconMail() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconWhatsapp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.15-.198.297-.768.966-.941 1.164-.174.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.762-1.653-2.059-.174-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.58-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.214 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.174-1.413-.075-.124-.273-.198-.57-.347zM12.06 2.003c-5.5 0-9.98 4.48-9.98 9.98 0 1.758.46 3.47 1.333 4.983L2 22l5.208-1.367a9.94 9.94 0 0 0 4.852 1.247h.004c5.5 0 9.98-4.48 9.98-9.98 0-2.662-1.038-5.164-2.922-7.048A9.93 9.93 0 0 0 12.06 2.003zm0 18.267h-.003a8.28 8.28 0 0 1-4.204-1.146l-.303-.18-3.09.812.824-3.014-.197-.309a8.27 8.27 0 0 1-1.268-4.46c0-4.57 3.716-8.287 8.289-8.287a8.23 8.23 0 0 1 5.86 2.43 8.23 8.23 0 0 1 2.43 5.86c0 4.57-3.716 8.287-8.338 8.287z" />
    </svg>
  );
}

const handleAnchorClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
  }
};

export function Footer() {
  return (
    <footer className="border-t border-border-muted bg-surface-footer py-6">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Image src={footerData.logo} alt={footerData.logoAlt} width={144} height={144} className="w-12 h-12" />
              <h3 className="text-xl font-semibold text-text-primary">{footerData.brand.name.slice(0, 9)}<span className="text-brand-primary">{footerData.brand.name.slice(10)}</span></h3>
            </div>
            <p className="text-xs leading-relaxed text-text-secondary/50 italic">"{footerData.brand.description}"</p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-text-primary">{footerData.quickLinksTitle}</h4>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-sm text-text-secondary transition-colors hover:text-brand-accent"
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-text-primary">{footerData.contactTitle}</h4>
            <div className="flex gap-4">
              {footerData.contactLinks.map((contact) => (
                <a
                  key={contact.name}
                  className="text-text-secondary transition-colors hover:text-brand-accent"
                  href={contact.href}
                >
                  {contact.name === "email" && <IconMail />}
                  {contact.name === "whatsapp" && <IconWhatsapp />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border-muted pt-8 text-center">
          <p className="text-sm text-text-secondary">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
