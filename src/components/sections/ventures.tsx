import { BrainCircuit, TrendingUp, Boxes, Rocket, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Division {
  icon: LucideIcon;
  index: string;
  name: string;
  description: string;
  status: string;
}

const DIVISIONS: Division[] = [
  {
    icon: BrainCircuit,
    index: "01",
    name: "AI Automation Studio",
    description:
      "AI agents, chatbots, and workflow automation that answer customers, take orders, and remove hours of manual work every week.",
    status: "Active",
  },
  {
    icon: TrendingUp,
    index: "02",
    name: "Digital Growth Agency",
    description:
      "Websites, apps, and marketing systems engineered to capture leads and turn visitors into paying customers.",
    status: "Active",
  },
  {
    icon: Boxes,
    index: "03",
    name: "Software Products",
    description:
      "In-house tools and products built to solve real problems for local businesses — practical, affordable, and yours to keep.",
    status: "Building",
  },
  {
    icon: Rocket,
    index: "04",
    name: "Future Investments",
    description:
      "Backing and building the next wave of technology ventures across Nepal and beyond.",
    status: "Coming soon",
  },
];

export function Ventures() {
  return (
    <section
      id="ventures"
      className="relative scroll-mt-20 py-24 sm:py-32"
      aria-labelledby="ventures-heading"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            The ecosystem
          </p>
          <h2
            id="ventures-heading"
            className="font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl"
          >
            One studio,{" "}
            <span className="text-gradient">four ways we build</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-balance">
            Bhandari Ventures isn't a single service — it's a growing ecosystem
            of studios and products, all aimed at the same goal: helping
            businesses do more with less.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
          {DIVISIONS.map((division, i) => {
            const Icon = division.icon;
            return (
              <Reveal
                key={division.name}
                delay={i * 80}
                className="group relative bg-background p-8 transition-colors duration-300 hover:bg-accent/40"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-foreground/10 bg-foreground/5 text-primary transition-colors duration-300 group-hover:border-primary/40">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="font-display text-sm font-semibold tabular-nums text-muted-foreground/50">
                    {division.index}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <h3 className="font-display text-xl font-semibold">
                    {division.name}
                  </h3>
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {division.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {division.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Ventures;
