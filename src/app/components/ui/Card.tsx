import { PropsWithChildren, ReactNode } from "react";

export default function Card({
  children,
  className = "",
  title,
  kicker,
  action,
}: PropsWithChildren<{ className?: string; title?: string; kicker?: string; action?: ReactNode }>) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ${className}`.trim()}>
      {kicker && <div className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">{kicker}</div>}
      {title && <h3 className="text-lg font-semibold mb-3 text-slate-900">{title}</h3>}
      <div className="text-slate-700 text-sm">{children}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}


