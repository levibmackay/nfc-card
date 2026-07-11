import { Download, IdCard, Mail } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/config/site";
import { downloadVCard } from "@/lib/vcard";

export function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-dvh w-full flex-col items-center justify-center px-6 py-24 text-center">
      <Avatar />

      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-gradient sm:text-6xl">
        {siteConfig.name}
      </h1>

      <p className="mt-3 text-base text-muted sm:text-lg">{siteConfig.taglines.join(" · ")}</p>

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
