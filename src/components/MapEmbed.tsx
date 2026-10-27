"use client";

import { useState } from "react";
import { company } from "@/content/site";
import { Icon } from "./Icon";

/**
 * Mapa ładowana dopiero po kliknięciu — strona jest szybsza,
 * a Google nie dostaje danych odwiedzającego bez jego zgody.
 */
export function MapEmbed() {
  const [on, setOn] = useState(false);
  const q = encodeURIComponent(`Auto Expert, ${company.street}, ${company.postalCode} ${company.city}`);
  return (
    <div className="map">
      {on ? (
        <iframe
          title="Mapa dojazdu do Auto Expert"
          src={`https://www.google.com/maps?q=${q}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map__placeholder">
          <svg className="map__roads" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="rgba(255,255,255,.10)" strokeLinecap="round">
              <path d="M-20 120 C120 140 220 90 330 150 S520 260 640 230" strokeWidth="14" />
              <path d="M180 -20 C200 90 260 160 300 176 S330 300 300 460" strokeWidth="9" />
              <path d="M-20 300 C110 280 210 330 300 300 S470 250 640 330" strokeWidth="7" />
              <path d="M420 -20 L380 180 L470 440" strokeWidth="6" />
              <path d="M60 -20 L110 440" strokeWidth="4" />
              <path d="M520 60 C460 120 400 140 300 176" strokeWidth="4" />
            </g>
            <g fill="none" stroke="rgba(227,36,27,.55)" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round">
              <path d="M40 400 C120 320 200 260 300 176" />
            </g>
            <text x="318" y="168" fill="rgba(255,255,255,.75)" fontFamily="monospace" fontSize="12" letterSpacing="1">AUTO EXPERT · KONIAWSKA 22</text>
          </svg>
          <div className="map__pin" aria-hidden="true">
            <i />
          </div>
          <div className="map__cta">
            <button type="button" className="btn btn--ghost" onClick={() => setOn(true)}>
              <Icon name="pin" size={18} /> Pokaż mapę
            </button>
            <p>Mapa Google załaduje się po kliknięciu.</p>
          </div>
        </div>
      )}
    </div>
  );
}
