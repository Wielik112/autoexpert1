import Link from "next/link";
import { company, dayNames, hours, services } from "@/content/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Footer() {
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <footer className="footer">
      <div className="footer__giant" aria-hidden="true">
        AUTO EXPERT
      </div>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="footer__slogan">{company.slogan}.</p>
            <p className="muted small">{company.tagline}</p>
            <div className="footer__social">
              <a href={company.links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Auto Expert">
                <Icon name="facebook" />
              </a>
              <a href={company.links.googleReviews} target="_blank" rel="noopener noreferrer" aria-label="Opinie Google Auto Expert">
                <Icon name="google" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="footer__h">Usługi</h2>
            <ul className="footer__list">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/uslugi/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__h">Warsztat</h2>
            <ul className="footer__list">
              <li><Link href="/rezerwacja">Rezerwacja online</Link></li>
              <li><Link href="/cennik">Cennik</Link></li>
              <li><Link href="/o-nas">O nas</Link></li>
              <li><Link href="/opinie">Opinie klientów</Link></li>
              <li><Link href="/poradnik">Poradnik kierowcy</Link></li>
              <li><Link href="/faq">Pytania i odpowiedzi</Link></li>
              <li><Link href="/kontakt">Kontakt i dojazd</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer__h">Kontakt</h2>
            <ul className="footer__contact">
              <li>
                <Icon name="phone" size={18} />
                <a href={company.phoneHref} className="footer__phone">{company.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <Icon name="pin" size={18} />
                <a href={company.links.directions} target="_blank" rel="noopener noreferrer">
                  {company.street}
                  <br />
                  {company.postalCode} {company.city}
                </a>
              </li>
            </ul>
            <table className="hours hours--compact">
              <tbody>
                {order.map((d) => (
                  <tr key={d}>
                    <th scope="row">{dayNames[d]}</th>
                    <td>{hours[d] ? `${hours[d]!.open}–${hours[d]!.close}` : "zamknięte"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {company.name}, Gorzów Wielkopolski</span>
          <span className="footer__bottom-links">
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
            <a href="#top">Do góry ↑</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
