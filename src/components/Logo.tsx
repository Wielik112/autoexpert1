export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <span className={`logo logo--${size}`} aria-label="Auto Expert">
      <span className="logo__tiles" aria-hidden="true">
        <span className="logo__tile logo__tile--red">A</span>
        <span className="logo__tile">U</span>
        <span className="logo__tile">T</span>
        <span className="logo__tile">O</span>
      </span>
      <span className="logo__word" aria-hidden="true">
        EXPERT
      </span>
    </span>
  );
}
