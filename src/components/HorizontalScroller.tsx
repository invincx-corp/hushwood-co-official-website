import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HorizontalScrollerProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  ariaLabel?: string;
};

export const HorizontalScroller = ({
  children,
  className,
  contentClassName,
  ariaLabel = "Scrollable section",
}: HorizontalScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(160, el.clientWidth * 0.7), behavior: "smooth" });
  };

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-elegant backdrop-blur-sm transition-smooth disabled:opacity-40";

  return (
    <div className={cn("relative", className)} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        disabled={!canLeft}
        className={cn(arrowClass, "left-0 sm:-left-1")}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        onScroll={update}
        className={cn("overflow-x-auto scrollbar-none px-10 sm:px-11", contentClassName)}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        disabled={!canRight}
        className={cn(arrowClass, "right-0 sm:-right-1")}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
