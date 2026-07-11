import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative w-full px-6 pb-10 text-center">
      <RevealOnScroll>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Built for a tap, not a scroll.
        </p>
      </RevealOnScroll>
    </footer>
  );
}
