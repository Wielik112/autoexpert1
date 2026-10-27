"use client";

import { useRef } from "react";

/** Siatka z podświetleniem podążającym za kursorem (tylko CSS vars, zero re-renderów). */
export function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>(".scard");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
