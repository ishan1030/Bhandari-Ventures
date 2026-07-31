import {
  Globe,
  Smartphone,
  Workflow,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description:
      "Fast, mobile-friendly websites that bring in customers and are easy to update yourself.",
    points: ["Loads in seconds", "Looks great on phones", "Easy to edit"],
  },
  {
    icon: Smartphone,
    title: "Android App Development",
    description:
      "Custom apps for shops, restaurants, salons, and services — your business in your customers' pocket.",
    points: ["Your brand, your app", "Push notifications", "Play Store ready"],
  },
  {
    icon: Workflow,
    title: "Business Automation",
    description:
      "Auto-replies on WhatsApp & SMS, online bookings, invoicing, and reminders that save hours every week.",
    points: ["Fewer missed messages", "Automatic reminders", "Less paperwork"],
  },
  {
    icon: Bot,
    title: "AI Agent Builder",
    description:
      "Smart chatbots that answer customers, take orders, and book appointments 24/7 — even while you sleep.",
    points: ["Replies instantly", "Takes orders", "Books appointments"],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            What we do
          </p>
          <h2
            id="services-heading"
            className="font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl"
          >
            Everything you need to{" "}
            <span className="text-gradient">win online</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-balance">
            Pick one or combine them all. We focus on the result — more
            customers, less hassle — and quietly handle the technology behind
            it.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal
                key={service.title}
                delay={i * 90}
                className="group relative h-full"
              >
                <article className="card-glow glass relative flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon
                      className="h-6 w-6 text-primary-foreground"
                      aria-hidden="true"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="font-display text-lg font-semibold leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-foreground/10 pt-4">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
