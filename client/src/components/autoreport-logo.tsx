import logoImage from "@assets/grok_image_zby8i9_1774235232732.jpg";

interface AutoReportLogoProps {
  className?: string;
  variant?: "full" | "icon";
  "data-testid"?: string;
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
        <img
          src={logoImage}
          alt="AutoReport"
          className="block object-contain w-full h-full"
          style={{ display: "block" }}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`} {...rest}>
      <div
        className="rounded-md overflow-hidden bg-white shrink-0"
        style={{ width: 36, height: 36, padding: 2 }}
      >
        <img
          src={logoImage}
          alt="AutoReport"
          className="block w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[15px] font-extrabold tracking-wide uppercase text-white">
          Auto<span className="text-[#CE1126]">Report</span>
        </span>
        <span className="text-[9px] font-semibold text-white/30 tracking-[0.25em] uppercase">
          Diagnostics IA
        </span>
      </div>
    </div>
  );
}
