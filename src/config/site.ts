import type { SocialLink } from "@/types";

/**
 * Single source of truth for all editable site content.
 * Update the values below to customize the site — see README.md for the full guide.
 */
export const siteConfig = {
  name: "Levi Mackay",
  firstName: "Levi",
  initials: "LM",
  taglines: [
    "Computer Science Student @ BYU-Idaho",
    "AI Developer",
    "Software Engineer",
  ],
  location: "Rexburg, ID",
  email: "levibmackay@gmail.com",
  // Add a phone number here to include it on the vCard, e.g. "+1 555 555 5555"
  phone: "",
  // Your GitHub Pages / custom domain URL, used for SEO tags, sitemap, and the vCard.
  url: "https://levibmackay.github.io/nfc-card/",
  description:
    "Computer Science student at BYU-Idaho, AI developer, and software engineer. Tap to connect — resume, contact card, and links in one place.",
  // BASE_URL already ends in "/", matching the vite.config.ts base for GitHub Pages.
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  headshotUrl: `${import.meta.env.BASE_URL}headshot.jpg`,
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/levibmackay", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/levi-mackay-217380396/", icon: "linkedin" },
  { label: "Portfolio", href: "https://levibmackay.github.io/Portfolio/", icon: "globe" },
  { label: "Instagram", href: "https://instagram.com/levibmackay", icon: "instagram" },
  { label: "X", href: "https://x.com/levibmackay", icon: "x" },
];
