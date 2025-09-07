import { PropsWithChildren } from "react";

export default function Section({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`py-16 ${className}`.trim()}>{children}</section>
  );
}


