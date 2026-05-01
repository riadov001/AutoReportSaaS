interface AutoReportLogoProps {
  className?: string;
  variant?: "full" | "icon";
  "data-testid"?: string;
}

function LogoSvg() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="6" fill="#CE1126"/>
      <path d="M8 26l4-10h16l4 10H8z" fill="white" opacity="0.9"/>
      <path d="M12 26v-2h16v2H12z" fill="#CE1126"/>
      <circle cx="14" cy="27" r="2.5" fill="white"/>
      <circle cx="26" cy="27" r="2.5" fill="white"/>
      <path d="M20 10l2 6H18l2-6z" fill="white" opacity="0.7"/>
    </svg>
  );
}

export function AutoReportLogo({ className = "", variant = "full", ...rest }: AutoReportLogoProps) {
  if (variant === "icon") {
    return (
      <div
        className={`rounded-md overflow-hidden bg-white shrink-0 ${className}`}
        style={{ padding: 2 }}
        aria-label="AutoReport"
        {...rest}
      >
        <LogoSvg />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`} {...rest}>
      <div
        className="rounded-md overflow-hidden bg-white shrink-0"
        style={{ width: 36, height: 36, padding: 2 }}
      >
        <LogoSvg />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[15px] font-extrabold tracking-wide uppercase text-white">
          Auto<span className="text-[#CE1126]">Report</span>
        </span>
        <span className="text-[9px] font-semibold text-white/30 tracking-[0.25em] uppercase">
          Rapport d'analyse véhicule
        </span>
      </div>
    </div>
  );
}
