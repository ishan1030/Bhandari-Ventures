import { ArrowRight, MousePointerClick, MapPin } from "lucide-react";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { Button } from "@/components/ui/button";
import { site, waLink } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background"
    >
      {/* Full-screen interactive 3D robot background.
          `hero-robot` hue-shifts the scene's baked-in purple screen toward
          the brand emerald (greys/whites are unaffected). */}
      <InteractiveRobotSpline
        scene={site.splineScene}
        className="hero-robot absolute inset-0 z-0 h-full w-full"
      />

      {/* Readability wash over the 3D scene (does not block interaction).
          Uses the theme background so the hero is dark in dark mode and
          cream in light mode, fading cleanly into the next section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background/70 via-background/10 to-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background to-transparent"
      />

      {/* Text overlay — pointer-events-none so the robot stays interactive.
          Interactive children re-enable pointer events individually. */}
      <div className="pointer-events-none relative z-20 mx-auto flex max-w-4xl flex-col items-center px-6 text-center text-foreground">
        <span className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-md animate-fade-up">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {site.location} · serving local businesses everywhere
        </span>

        <h1
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          Grow your business online —{" "}
          <span className="text-primary">we handle the tech.</span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-base text-muted-foreground text-balance sm:text-lg animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          Simple, affordable websites, apps, and AI tools for shops,
          restaurants, salons, and clinics. No tech knowledge needed — we build
          it, you get more customers.
        </p>

        <div
          className="pointer-events-auto mt-9 flex flex-col items-center gap-3 sm:flex-row animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <Button asChild size="lg">
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              Get a Free Demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#services">See what we do</a>
          </Button>
        </div>

        <span
          className="pointer-events-none mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
          Drag to play with the robot
        </span>
      </div>
    </section>
  );
}

export default Hero;
