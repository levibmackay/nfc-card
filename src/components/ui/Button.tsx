import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
  glass: "glass text-foreground hover:bg-white/10 hover:border-white/20",
  ghost: "text-muted hover:text-foreground hover:bg-white/5",
} as const;

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant = "primary", icon, children, className, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...rest}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {icon}
      {children}
    </button>
  );
}
