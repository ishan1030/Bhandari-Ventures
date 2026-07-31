import * as React from "react";
import { cn } from "@/lib/utils";

type As = "div" | "section" | "li" | "span" | "header" | "footer";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: As;
  /** Stagger delay in ms for lists of items. */
  delay?: number;
  /** Small vertical travel distance. */
  y?: number;
}

/**
 * Reveals its children on scroll using IntersectionObserver.
 * When the user prefers reduced motion, content is shown immediately
 * with no transform/opacity animation.
 */
export function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  React.useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        "transition-all duration-700 ease-out-expo motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0",
        className
      )}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        transform: visible || reducedMotion ? undefined : `translateY(${y}px)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
