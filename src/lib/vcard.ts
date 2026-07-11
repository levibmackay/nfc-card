import { siteConfig, socialLinks } from "@/config/site";

function escapeVCardValue(value: string) {
  return value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

export function buildVCard(): string {
  const [firstName, ...rest] = siteConfig.name.split(" ");
  const lastName = rest.join(" ");
  const website = socialLinks.find((link) => link.icon === "globe")?.href ?? siteConfig.url;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`,
    `FN:${escapeVCardValue(siteConfig.name)}`,
    `TITLE:${escapeVCardValue(siteConfig.taglines[0])}`,
    `EMAIL;TYPE=INTERNET:${siteConfig.email}`,
    siteConfig.phone ? `TEL;TYPE=CELL:${siteConfig.phone}` : null,
    `URL:${website}`,
    siteConfig.location ? `ADR;TYPE=WORK:;;${escapeVCardValue(siteConfig.location)};;;;` : null,
    "END:VCARD",
  ].filter(Boolean);

  return lines.join("\r\n");
}

export function downloadVCard() {
  const vcard = buildVCard();
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${siteConfig.name.replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
