import type { ComponentType, SVGProps } from "react";
import { Globe } from "lucide-react";
import { GitHubIcon, InstagramIcon, LinkedInIcon, XLogoIcon } from "@/components/ui/BrandIcons";
import { socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

const iconMap: Record<SocialLink["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  globe: Globe,
  instagram: InstagramIcon,
  x: XLogoIcon,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={link.label}
              title={link.label}
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition-all duration-300 hover:-translate-y-1 hover:text-foreground hover:border-white/25"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
