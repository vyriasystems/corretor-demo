"use client";

import { type ReactNode } from "react";

export function SectionLayer({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 flex min-h-screen items-center px-5 py-24 sm:px-8 lg:px-12 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionMode({ children }: { flow?: boolean; children: ReactNode }) {
  return <>{children}</>;
}
