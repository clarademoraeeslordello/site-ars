"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { GlobeCanvasProps } from "./globe-canvas";

// d3-geo, topojson and the world map (~110 KB) are a separate chunk, fetched only when needed.
const GlobeCanvas = dynamic(() => import("./globe-canvas"), { ssr: false });

/** Square slot for the ISO 27001 globe; the globe code loads when the slot nears the viewport. */
export function Globe({ title, loadingLabel, ...props }: GlobeCanvasProps & { loadingLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px] bg-dark">
      {near ? (
        <GlobeCanvas title={title} {...props} />
      ) : (
        <span className="sr-only">{loadingLabel}</span>
      )}
    </div>
  );
}
