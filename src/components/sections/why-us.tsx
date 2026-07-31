import {
  BadgeIndianRupee,
  HeartHandshake,
  Languages,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: BadgeIndianRupee,
    title: "Genuinely affordable",
    description:
      "Fair, upfront pricing built for local shops and small businesses — no surprise bills, no bloated agency fees.",
  },
  {
    icon: HeartHandshake,
    title: "Real local support",
    description:
      "We're based in Bharatpur and treat your business like a neighbour's. Call us and reach a real person, not a ticket.",
  },
  {
    icon: Languages,
    title: "English + Nepali",
    description:
      "We explain everything in plain language, in the language you're comfortable with. No confusing tech talk.",
  },
  {
    icon: Rocket,
    title: "No tech knowledge needed",
    description:
      "You run your business, we run the technology. We set it up, keep it working, and are one message away.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative scroll-mt-20 py-24 sm:py-32"
      aria-labelledby="why-us-heading"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-brand-radial blur-2xl"
      />

      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Why choose us
          </p>
          <h2
            id="why-us-heading"
            className="font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl"
          >
            Big-city technology,{" "}
            <span className="text-gradient">small-town care</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground text-balance">
            We started Bhandari Ventures to give local business owners the same
            digital tools the big brands use — without the complexity, cost, or
            jargon.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: "24/7", label: "AI that never sleeps" },
              { value: "1-on-1", label: "Personal support" },
              { value: "0", label: "Tech skills needed" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-4 text-center"
              >
                <dt className="font-display text-2xl font-bold text-gradient">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Reveal
                key={benefit.title}
                delay={i * 80}
                className="card-glow glass group relative rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-foreground/10 bg-foreground/5 text-primary transition-colors duration-300 group-hover:border-primary/40">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
