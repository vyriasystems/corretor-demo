type GlowButtonProps = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  external?: boolean;
  size?: "md" | "lg";
};

export function GlowButton({
  href,
  children,
  onClick,
  type = "button",
  className = "",
  external = false,
  size = "md",
}: GlowButtonProps) {
  const sizing =
    size === "lg"
      ? "px-10 py-4 text-sm tracking-[0.2em]"
      : "px-7 py-3 text-[13px] tracking-[0.18em]";

  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-gold/45 bg-gold/10 ${sizing} font-medium uppercase text-bone transition-colors duration-300 hover:border-gold hover:bg-gold/20 ${className}`;

  const inner = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
