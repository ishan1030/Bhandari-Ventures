import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { waLink } from "@/lib/site";

function App() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />

        {/* Subtle grid backdrop behind the content sections */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-grid"
          />
          <Services />
          <WhyUs />
          <HowItWorks />
          <Contact />
        </div>
      </main>

      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#04310f] shadow-[0_8px_30px_-4px_#25D366aa] transition-transform duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-white"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-pulse-ring"
        />
        <MessageCircle className="relative h-7 w-7" aria-hidden="true" />
      </a>
    </div>
  );
}

export default App;
