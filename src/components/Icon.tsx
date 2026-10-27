import type { SVGProps } from "react";

const paths: Record<string, React.ReactNode> = {
  diagnostics: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M6 11h2.5l1.5-3 2.5 6 1.5-3H18" />
      <path d="M9 21h6M12 17v4" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.6 17.2a1.6 1.6 0 0 0 2.3 2.3l5.7-5.7a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.2-.4-.4-2.2 2.6-2.6Z" />
  ),
  snowflake: (
    <>
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" />
      <path d="m9 4 3 2 3-2M9 20l3-2 3 2M4 10.5l3.5-.5L6 7M18 17l-1.5-3 3.5-.5M4 13.5l3.5.5L6 17M18 7l-1.5 3 3.5.5" />
    </>
  ),
  brake: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M17 4.5a10 10 0 0 1 3.5 5.5" strokeWidth="3" />
      <circle cx="12" cy="7" r=".6" />
      <circle cx="16.5" cy="13.5" r=".6" />
      <circle cx="7.5" cy="13.5" r=".6" />
    </>
  ),
  oil: (
    <>
      <path d="M3 10h4l2-2h5l7-2v3l-6 6H5a2 2 0 0 1-2-2v-3Z" />
      <path d="M9 8V6h3M20 13.5c0 1 .7 1.5.7 2.3a.7.7 0 0 1-1.4 0c0-.8.7-1.3.7-2.3Z" />
    </>
  ),
  timing: (
    <>
      <circle cx="7" cy="16" r="4" />
      <circle cx="17" cy="7" r="3" />
      <path d="M4 13.5 14.5 5M10 18.5l9.5-9" />
      <circle cx="7" cy="16" r="1" />
      <circle cx="17" cy="7" r="1" />
    </>
  ),
  tire: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  steering: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
      <path d="M3.5 10.5c3 1 5.5 1 6.5 1.5M20.5 10.5c-3 1-5.5 1-6.5 1.5M12 14v7" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  handshake: (
    <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2M14 16l2.5 2.5a1.4 1.4 0 0 0 2-2l-3.8-3.8M3 11l3-3 4 1 3-2 3.5 1 4.5 4-2 2M6.5 14.5l2 2a1.4 1.4 0 0 0 2-2M8 13l2.5 2.5a1.4 1.4 0 0 0 2-2" />
  ),
  home: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10M10 20v-5h4v5" />
    </>
  ),
  star: (
    <path
      d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  facebook: (
    <path
      d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  google: (
    <path
      d="M21 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7ZM12 21.5c2.6 0 4.7-.8 6.3-2.3l-3.1-2.4c-.8.6-1.9 1-3.2 1-2.5 0-4.6-1.7-5.3-3.9H3.5v2.5A9.5 9.5 0 0 0 12 21.5ZM6.7 13.9a5.7 5.7 0 0 1 0-3.7V7.7H3.5a9.5 9.5 0 0 0 0 8.6l3.2-2.4ZM12 6.3c1.4 0 2.6.5 3.6 1.4l2.7-2.7A9.5 9.5 0 0 0 3.5 7.7l3.2 2.5C7.4 8 9.5 6.3 12 6.3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 19a2 2 0 0 0 2 2h14" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="1.5" />
      <path d="M16 8V4.5A1.5 1.5 0 0 0 14.5 3h-10A1.5 1.5 0 0 0 3 4.5v10A1.5 1.5 0 0 0 4.5 16H8" />
    </>
  ),
};

export type IconKey = keyof typeof paths | string;

export function Icon({
  name,
  size = 20,
  ...rest
}: { name: IconKey; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
