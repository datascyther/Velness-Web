import { Link } from "react-router";
import velnessMark from "../assets/velness-mark.png";

type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  to?: string;
};

export function Logo({ size = 24, withWordmark = true, className = "", to }: LogoProps) {
  const content = (
    <>
      <img
        src={velnessMark}
        alt="Velness"
        width={size}
        height={size}
        className="logo-mark group-hover:scale-110"
        draggable={false}
      />
      {withWordmark && (
        <span className="text-[16px] font-medium tracking-tight text-[color:var(--color-ink)]">
          Velness
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Velness home">
        {content}
      </Link>
    );
  }

  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Velness home">
      {content}
    </a>
  );
}
