import { MessagesSquare, Hammer, TrendingUp, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: MessagesSquare,
    step: "01",
    title: "Talk to us",
    description:
      "Tell us about your business over WhatsApp or a quick call. We listen and suggest what will actually help — free of charge.",
  },
  {
    icon: Hammer,
    step: "02",
    title: "We build it",
    description:
      "We design, build, and set everything up for you — website, app, automation, or AI agent. You review; we polish.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "You grow",
    description:
      "Go live and start reaching more customers. We stay on call for updates, tweaks, and support whenever you need us.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 py-24 sm:py-32"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl"
          >
            Three simple steps to{" "}
            <span className="text-gradient">go digital</span>
          </h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent md:block"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 120}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl bg-brand-gradient opacity-40 blur-lg motion-safe:animate-pulse-ring"
                  />
                  <div className="relative grid h-[72px] w-[72px] place-items-center rounded-2xl border border-foreground/10 bg-background p-4">
                    <div className="grid h-full w-full place-items-center rounded-xl bg-brand-gradient shadow-glow">
                      <Icon
                        className="h-6 w-6 text-primary-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                <span className="mt-5 font-display text-xs font-bold tracking-[0.3em] text-primary">
                  STEP {step.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
