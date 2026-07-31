import * as React from "react";
import { MessageCircle, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { site, waLink } from "@/lib/site";

const BUSINESS_TYPES = [
  "Shop / Retail",
  "Restaurant / Café",
  "Salon / Spa",
  "Clinic / Health",
  "Services",
  "Other",
];

export function Contact() {
  const [name, setName] = React.useState("");
  const [businessType, setBusinessType] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [sent, setSent] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend: hand the enquiry straight to WhatsApp with the details
    // prefilled, so the owner gets it instantly and can reply.
    const message =
      `Hi Bhandari Ventures! I'd like a free demo.\n\n` +
      `Name: ${name}\n` +
      `Business type: ${businessType || "—"}\n` +
      `Phone: ${phone}`;
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="card-glow glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
          {/* Ambient accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand-gradient opacity-20 blur-3xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: pitch + WhatsApp */}
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Let's talk
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl"
              >
                Ready to grow?{" "}
                <span className="text-gradient">Get a free demo.</span>
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground text-balance">
                Message us on WhatsApp or leave your details — we'll show you
                exactly how we can help your business, no cost and no pressure.
              </p>

              <div className="mt-8">
                <Button asChild variant="whatsapp" size="lg">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>

              <ul className="mt-8 space-y-3 text-sm">
                <li>
                  <a
                    href={`tel:+${site.phoneRaw}`}
                    className="inline-flex items-center gap-3 text-foreground/90 transition-colors hover:text-primary"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-foreground/10 bg-foreground/5">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="inline-flex items-center gap-3 text-foreground/90">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-foreground/10 bg-foreground/5">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {site.location}
                </li>
              </ul>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={120}>
              {sent ? (
                <div
                  className="glass flex min-h-[320px] flex-col items-center justify-center rounded-3xl p-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2
                    className="h-14 w-14 text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-xl font-semibold">
                    Thank you, {name || "friend"}!
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    We've opened WhatsApp with your details. Send the message
                    and we'll reply shortly to set up your free demo.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6"
                    onClick={() => setSent(false)}
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass rounded-3xl p-6 sm:p-8"
                  noValidate
                >
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-foreground/90"
                      >
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sita Bhandari"
                        className="w-full rounded-xl border border-input bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="business-type"
                        className="mb-2 block text-sm font-medium text-foreground/90"
                      >
                        Business type
                      </label>
                      <select
                        id="business-type"
                        name="business-type"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-input bg-foreground/5 px-4 py-3 text-sm text-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      >
                        <option value="" className="bg-background">
                          Select your business…
                        </option>
                        {BUSINESS_TYPES.map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-background"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-foreground/90"
                      >
                        Phone number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98XXXXXXXX"
                        className="w-full rounded-xl border border-input bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Request my free demo
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      We'll never share your details. Submitting opens WhatsApp
                      to send us your request.
                    </p>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
