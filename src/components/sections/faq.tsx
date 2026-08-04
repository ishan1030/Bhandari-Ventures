import * as React from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Q&A written to match how people actually search / ask AI, e.g.
 * "AI automation company in Nepal", "web developer in Bharatpur",
 * "how much does a business website cost in Nepal". The same content is
 * mirrored as FAQPage JSON-LD in index.html so non-JS crawlers get it too.
 */
export const FAQS = [
  {
    q: "What does Bhandari Ventures do?",
    a: "Bhandari Ventures is an AI automation and digital growth studio based in Bharatpur, Nepal. We build websites, Android apps, business automation, and AI agents (chatbots) that help businesses attract customers, cut manual work, and grow — for shops, restaurants, salons, clinics, and services across Nepal and beyond.",
  },
  {
    q: "Where is Bhandari Ventures located?",
    a: "We're based in Bharatpur, Nepal, and work with local businesses across the country — plus clients anywhere in the world, since most of what we build is delivered online.",
  },
  {
    q: "How much does a website or app cost in Nepal?",
    a: "Every project is quoted individually and priced to be genuinely affordable for small and local businesses — no bloated agency fees or surprise bills. Message us on WhatsApp at +977 9704210604 for a free quote and demo.",
  },
  {
    q: "Do you build AI chatbots and business automation?",
    a: "Yes. We build AI agents that answer customers, take orders, and book appointments 24/7, plus automations like WhatsApp and SMS auto-replies, online booking, invoicing, and reminders that save hours every week.",
  },
  {
    q: "Do you work with businesses outside Bharatpur or Nepal?",
    a: "Yes. We're based in Bharatpur but work with businesses across Nepal and internationally. Websites, apps, automation, and AI agents are all delivered and supported online.",
  },
  {
    q: "Do you offer support in Nepali?",
    a: "Absolutely. We explain everything in plain language, in English or Nepali, with no confusing tech jargon — so you always understand what you're getting.",
  },
  {
    q: "How do I get started?",
    a: "Message us on WhatsApp or fill in the contact form for a free demo. We'll listen, suggest what will actually help your business, then build it. Our work is also open source on GitHub, so you can verify it before you commit.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 py-24 sm:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="container max-w-3xl">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl"
          >
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </Reveal>

        <Reveal
          delay={80}
          className="mt-12 overflow-hidden rounded-3xl border border-border glass"
        >
          <div className="divide-y divide-border">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-foreground/[0.03]"
                    >
                      <span className="font-display text-base font-semibold sm:text-lg">
                        {item.q}
                      </span>
                      <Plus
                        className={cn(
                          "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                          isOpen && "rotate-45"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out-expo",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Faq;
