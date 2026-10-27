import { hours } from "@/content/site";

/** Wielkanoc (algorytm Meeusa/Jonesa/Butchera) */
function easter(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

const key = (y: number, m: number, d: number) =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/** Polskie dni ustawowo wolne od pracy */
export function polishHolidays(year: number): Map<string, string> {
  const map = new Map<string, string>();
  const fixed: [number, number, string][] = [
    [1, 1, "Nowy Rok"],
    [1, 6, "Trzech Króli"],
    [5, 1, "Święto Pracy"],
    [5, 3, "Święto Konstytucji 3 Maja"],
    [8, 15, "Wniebowzięcie NMP"],
    [11, 1, "Wszystkich Świętych"],
    [11, 11, "Święto Niepodległości"],
    [12, 24, "Wigilia"],
    [12, 25, "Boże Narodzenie"],
    [12, 26, "Drugi dzień Świąt"],
  ];
  fixed.forEach(([m, d, n]) => map.set(key(year, m, d), n));
  const e = easter(year);
  const add = (offset: number, name: string) => {
    const dt = new Date(e.getTime() + offset * 86400000);
    map.set(key(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()), name);
  };
  add(0, "Wielkanoc");
  add(1, "Poniedziałek Wielkanocny");
  add(49, "Zielone Świątki");
  add(60, "Boże Ciało");
  return map;
}

export function holidayName(y: number, m: number, d: number): string | undefined {
  return polishHolidays(y).get(key(y, m, d));
}

/** Aktualny czas w strefie Europe/Warsaw jako części */
export function warsawNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return {
    y: +get("year"),
    m: +get("month"),
    d: +get("day"),
    minutes: (+get("hour") % 24) * 60 + +get("minute"),
    weekday: wd,
  };
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export type OpenStatus = {
  open: boolean;
  label: string;
  detail: string;
};

export function getOpenStatus(date = new Date()): OpenStatus {
  const now = warsawNow(date);
  const holiday = holidayName(now.y, now.m, now.d);
  const today = holiday ? null : hours[now.weekday];

  if (today && now.minutes >= toMin(today.open) && now.minutes < toMin(today.close)) {
    const left = toMin(today.close) - now.minutes;
    return {
      open: true,
      label: "Otwarte",
      detail: left <= 60 ? `zamykamy za ${left} min` : `do ${today.close}`,
    };
  }

  // Szukamy najbliższego otwarcia
  for (let i = 0; i < 14; i++) {
    const dt = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
    const wd = dt.getUTCDay();
    const h = holidayName(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate())
      ? null
      : hours[wd];
    if (!h) continue;
    if (i === 0 && now.minutes >= toMin(h.open)) continue;
    const when = i === 0 ? "dziś" : i === 1 ? "jutro" : ["w niedzielę", "w poniedziałek", "we wtorek", "w środę", "w czwartek", "w piątek", "w sobotę"][wd];
    return {
      open: false,
      label: holiday ? `Zamknięte · ${holiday}` : "Zamknięte",
      detail: `otwieramy ${when} o ${h.open}`,
    };
  }
  return { open: false, label: "Zamknięte", detail: "" };
}
