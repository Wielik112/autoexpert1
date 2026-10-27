"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, services } from "@/content/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { OpenStatus } from "./OpenStatus";

const nav = [
  { href: "/uslugi", label: "Usługi", mega: true },
  { href: "/cennik", label: "Cennik" },
  { href: "/o-nas", label: "O nas" },
  { href: "/opinie", label: "Opinie" },
  { href: "/poradnik", label: "Poradnik" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <div className="header__bar">
          <div className="container header__inner">
            <Link href="/" className="header__logo" aria-label="Auto Expert — strona główna">
              <Logo size="sm" />
            </Link>

            <nav className="header__nav" aria-label="Główna nawigacja">
              {nav.map((item) =>
                item.mega ? (
                  <div
                    key={item.href}
                    className={`navmega ${mega ? "is-open" : ""}`}
                    onMouseEnter={() => setMega(true)}
                    onMouseLeave={() => setMega(false)}
                  >
                    <Link
                      href={item.href}
                      className={`header__link ${isActive(item.href) ? "is-active" : ""}`}
                      aria-expanded={mega}
                      aria-haspopup="true"
                      onFocus={() => setMega(true)}
                    >
                      {item.label}
                      <Icon name="chevron" size={14} />
                    </Link>
                    <div className="navmega__panel" role="menu">
                      <div className="navmega__grid">
                        {services.map((s, i) => (
                          <Link
                            key={s.slug}
                            href={`/uslugi/${s.slug}`}
                            className="navmega__item"
                            role="menuitem"
                            onFocus={() => setMega(true)}
                          >
                            <span className="navmega__icon">
                              <Icon name={s.icon} size={22} />
                            </span>
                            <span>
                              <span className="navmega__name">
                                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span> {s.name}
                              </span>
                              <span className="navmega__short">{s.short}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="navmega__foot">
                        <span className="mono">Nie wiesz, czego potrzebujesz?</span>
                        <Link href="/#samodiagnoza" className="link-arrow" onFocus={() => setMega(true)} onBlur={() => setMega(false)}>
                          Sprawdź objawy w samodiagnozie <Icon name="arrow" size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`header__link ${isActive(item.href) ? "is-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="header__actions">
              <OpenStatus />
              <a href={company.phoneHref} className="header__phone">
                <Icon name="phone" size={16} />
                <span>{company.phone}</span>
              </a>
              <Link href="/rezerwacja" className="btn btn--primary btn--sm">
                Umów wizytę
              </Link>
              <button
                className="header__burger"
                aria-label={open ? "Zamknij menu" : "Otwórz menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mmenu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mmenu__inner container">
          <div className="mmenu__status">
            <OpenStatus variant="inline" />
          </div>
          <nav className="mmenu__nav" aria-label="Menu mobilne">
            <Link href="/" className="mmenu__link" tabIndex={open ? 0 : -1}>
              <span className="mono dim">00</span> Start
            </Link>
            {nav.map((item, i) => (
              <Link key={item.href} href={item.href} className="mmenu__link" tabIndex={open ? 0 : -1}>
                <span className="mono dim">{String(i + 1).padStart(2, "0")}</span> {item.label}
              </Link>
            ))}
          </nav>
          <div className="mmenu__cta">
            <Link href="/rezerwacja" className="btn btn--primary btn--lg btn--block" tabIndex={open ? 0 : -1}>
              <Icon name="calendar" /> Umów wizytę online
            </Link>
            <a href={company.phoneHref} className="btn btn--ghost btn--lg btn--block" tabIndex={open ? 0 : -1}>
              <Icon name="phone" /> {company.phone}
            </a>
          </div>
          <p className="mmenu__addr mono">
            {company.street}, {company.postalCode} {company.city}
          </p>
        </div>
      </div>
    </>
  );
}
