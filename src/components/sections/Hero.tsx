import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, IdCard, Mail } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/config/site";
import { downloadVCard } from "@/lib/vcard";

function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % siteConfig.taglines.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <p className="text-base text-muted sm:text-lg">{siteConfig.taglines.join(" · ")}</p>
    );
  }

  return (
    <div className="h-7 sm:h-8">
      {/* initial={false}: only animate the crossfade on rotation, not the first paint */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={siteConfig.taglines[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-base text-muted sm:text-lg"
        >
          {siteConfig.taglines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-dvh w-full flex-col items-center justify-center px-6 py-24 text-center">
      <Avatar />

      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-gradient sm:text-6xl">
        {siteConfig.name}
      </h1>

      <div className="mt-3">
        <RotatingTagline />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button href={siteConfig.resumeUrl} download variant="glass" icon={<Download className="h-4 w-4" />}>
          Download Resume
        </Button>
        <Button onClick={downloadVCard} variant="glass" icon={<IdCard className="h-4 w-4" />}>
          Save Contact
        </Button>
        <Button href={`mailto:${siteConfig.email}`} variant="primary" icon={<Mail className="h-4 w-4" />}>
          Email Me
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <SocialLinks />
        <CopyButton value={siteConfig.email} />
      </div>
    </section>
  );
}
