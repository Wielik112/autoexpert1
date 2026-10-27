import Link from "next/link";
import { Icon } from "@/components/Icon";
import { company } from "@/content/site";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="container" style={{ display: "grid", gap: 20, justifyItems: "center" }}>
        <p className="eyebrow">Kod błędu</p>
        <div className="nf__code">404</div>
        <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontStretch: "115%", textTransform: "uppercase" }}>
          Tej strony nie ma w naszym systemie.
        </h1>
        <p className="muted" style={{ maxWidth: 480 }}>
          Ale Twoje auto zdiagnozujemy bez problemu. Wróć na stronę główną albo zadzwoń.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="btn btn--primary">
            <Icon name="home" size={18} /> Strona główna
          </Link>
          <a href={company.phoneHref} className="btn btn--ghost">
            <Icon name="phone" size={18} /> {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
