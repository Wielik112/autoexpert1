"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus as S } from "@/lib/hours";

/** Żywy status otwarcia liczony w strefie czasowej Europe/Warsaw. */
export function OpenStatus({ variant = "pill" }: { variant?: "pill" | "inline" | "big" }) {
  const [s, setS] = useState<S | null>(null);

  useEffect(() => {
    const tick = () => setS(getOpenStatus());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`status status--${variant} ${s ? (s.open ? "is-open" : "is-closed") : "is-loading"}`}
      aria-live="polite"
    >
      <span className="status__dot" aria-hidden="true" />
      <span className="status__label">{s ? s.label : "Pn–Pt 8:00–16:00"}</span>
      {s?.detail && variant !== "pill" ? <span className="status__detail">· {s.detail}</span> : null}
    </span>
  );
}
