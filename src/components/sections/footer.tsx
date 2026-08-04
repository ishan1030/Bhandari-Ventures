import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { site, waLink } from "@/lib/site";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Ventures", href: "#ventures" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "Website Development",
  "Android Apps",
  "Business Automation",
  "AI Agents",
];

const SOCIALS = [
  { label: "WhatsApp", href: waLink(), icon: MessageCircle },
  { label: "Facebook", href: site.socials.facebook, icon: Facebook },
  { label: "Instagram", href: site.socials.instagram, icon: Instagram },
  { label: "LinkedIn", href: site.socials.linkedin, icon: Linkedin },
  { label: "GitHub", href: site.socials.github, icon: Github },
];

export function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 bg-background">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="#top"
              className="inline-block rounded-lg"
              aria-label="Bhandari Ventures — home"
            >
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Helping shop owners and small businesses grow online with simple,
              affordable technology. We handle the tech so you don't have to.
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:+${site.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-foreground/80">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {site.location}
              </li>
            </ul>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/70">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/70">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bhandari Ventures. Made with care in
            Bharatpur, Nepal.
          </p>

          <ul className="flex items-center gap-2">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-foreground/10 bg-foreground/5 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
