"use client";

import { useEffect, useState } from "react";
import { dayNames, hours } from "@/content/site";
import { warsawNow } from "@/lib/hours";

export function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(warsawNow().weekday), []);
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <table className="hours">
      <caption className="sr-only">Godziny otwarcia</caption>
      <tbody>
        {order.map((d) => (
          <tr key={d} className={today === d ? "is-today" : undefined}>
            <th scope="row">{dayNames[d]}</th>
            <td>{hours[d] ? `${hours[d]!.open} – ${hours[d]!.close}` : "zamknięte"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
