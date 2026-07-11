import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, IdCard, Mail } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/config/site";
import { downloadVCard } from "@/lib/vcard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

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
      <AnimatePresence mode="wait">
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
    <section className="relative flex min-h-dvh w-full flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <Avatar />
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="visible"
        custom={0.15}
        variants={fadeUp}
        className="mt-8 text-4xl font-semibold tracking-tight text-gradient sm:text-6xl"
      >
        {siteConfig.name}
      </motion.h1>

      <motion.div initial="hidden" animate="visible" custom={0.3} variants={fadeUp} className="mt-3">
        <RotatingTagline />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.45}
        variants={fadeUp}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Button href={siteConfig.resumeUrl} download variant="glass" icon={<Download className="h-4 w-4" />}>
          Download Resume
        </Button>
        <Button onClick={downloadVCard} variant="glass" icon={<IdCard className="h-4 w-4" />}>
          Save Contact
        </Button>
        <Button href={`mailto:${siteConfig.email}`} variant="primary" icon={<Mail className="h-4 w-4" />}>
          Email Me
        </Button>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.6}
        variants={fadeUp}
        className="mt-8 flex items-center gap-3"
      >
        <SocialLinks />
        <CopyButton value={siteConfig.email} />
      </motion.div>
    </section>
  );
}
