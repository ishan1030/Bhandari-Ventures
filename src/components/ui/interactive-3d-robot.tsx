import { Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

// Lazily load the (fairly heavy) Spline runtime so it never blocks first paint.
const Spline = lazy(() => import("@splinetool/react-spline"));

interface InteractiveRobotSplineProps {
  /** Spline scene URL (…/scene.splinecode). */
  scene: string;
  className?: string;
}

/** Spinner shown while the 3D scene downloads and initializes. */
function SplineFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-transparent"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-primary"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-muted-foreground">
          Loading 3D experience…
        </p>
      </div>
    </div>
  );
}

/**
 * Full-bleed, interactive Spline robot used as the hero centerpiece.
 * Wrapped in <Suspense> with a spinner fallback and lazy-loaded so the
 * rest of the page renders instantly.
 */
export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps) {
  return (
    <Suspense fallback={<SplineFallback />}>
      <Spline
        scene={scene}
        className={cn(className)}
        aria-label="Interactive 3D robot"
      />
    </Suspense>
  );
}

export default InteractiveRobotSpline;
