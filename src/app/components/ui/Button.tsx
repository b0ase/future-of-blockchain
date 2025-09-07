import { PropsWithChildren } from "react";

type Variant = "primary" | "secondary" | "ghost";

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
}: PropsWithChildren<{ variant?: Variant; href?: string; className?: string }>) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all";
  const variants: Record<Variant, string> = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg",
    secondary: "border border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white",
    ghost: "text-slate-700 hover:text-slate-900",
  };

  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls}>
      {children}
    </button>
  );
}


