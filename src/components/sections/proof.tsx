import { Github, ArrowUpRight, ShieldCheck, Code2, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const SIGNALS = [
  {
    icon: Code2,
    label: "Built in-house",
    detail: "Every line written by us — no page-builder templates.",
  },
  {
    icon: ShieldCheck,
    label: "Open & verifiable",
    detail: "This very site is open source. Read the code yourself.",
  },
  {
    icon: GitBranch,
    label: "Shipped, not promised",
    detail: "Real, deployed projects you can inspect on GitHub.",
  },
];

export function Proof() {
  return (
    <section
      id="work"
      className="relative scroll-mt-20 py-24 sm:py-32"
      aria-labelledby="proof-heading"
    >
      <div className="container">
        <div className="card-glow glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-gradient opacity-[0.12] blur-3xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: the pitch */}
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Proof, not promises
              </p>
              <h2
                id="proof-heading"
                className="font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl"
              >
                Don't take our word —{" "}
                <span className="text-gradient">verify it.</span>
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground text-balance">
                We're a new studio, so instead of stock testimonials we do
                something better: we make our work public. Browse our code,
                inspect our projects, and see exactly how we build on GitHub.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View our GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href={site.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse this site's code
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </Reveal>

            {/* Right: signal cards */}
            <Reveal delay={120} className="space-y-4">
              {SIGNALS.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.label}
                    className="flex items-start gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-primary-foreground">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">
                        {signal.label}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {signal.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <span className="inline-flex items-center gap-2">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  github.com/{site.githubUser}
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Proof;
