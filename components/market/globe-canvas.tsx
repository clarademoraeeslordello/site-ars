"use client";

import { useEffect, useRef } from "react";
import { geoCentroid, geoDistance, geoGraticule10, geoOrthographic, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, Geometry } from "geojson";
import world from "world-atlas/countries-110m.json";
import { BRAZIL_ID, ISO27001_MAX, ISO27001_TOP_COUNTRIES } from "@/lib/iso-survey";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export type GlobeCanvasProps = {
  title: string;
  /** Localized country names, keyed like ISO27001_TOP_COUNTRIES plus "brazil". */
  names: Record<string, string>;
  numberLocale: string;
};

// Colors and behavior from docs/design-handoff/Globo ISO.html.
const OCEAN = "#1f1f22";
const SPHERE_STROKE = "#3a3933";
const GRATICULE = "#2a2925";
const LAND = "#34332e";
const GOLD = "#e2c477";
const SPIN_DEG_PER_MS = 0.006;

/** Linear interpolation between two hex colors. */
function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
}

const sqrt01 = (v: number) => Math.sqrt(v / ISO27001_MAX);
const fillFor = (v: number) => mix("#4a4232", "#e2c477", sqrt01(v));
const radiusFor = (v: number) => 3 + (22 - 3) * sqrt01(v);

const SVG_NS = "http://www.w3.org/2000/svg";

export default function GlobeCanvas({ title, names, numberLocale }: GlobeCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const topo = world as unknown as Topology<{ countries: GeometryCollection }>;
    const countries = (feature(topo, topo.objects.countries) as unknown as { features: Feature<Geometry>[] }).features;
    const values = new Map<string, number>(ISO27001_TOP_COUNTRIES.map((c) => [c.id, c.value]));
    const keys = new Map<string, string>(ISO27001_TOP_COUNTRIES.map((c) => [c.id, c.key]));
    const format = new Intl.NumberFormat(numberLocale);

    const projection = geoOrthographic().clipAngle(90).rotate([50, -12]);
    const path = geoPath(projection);

    // Build the SVG once; each frame only updates attributes (no React re-render).
    svg.replaceChildren();
    const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent: Element = svg) => {
      const node = document.createElementNS(SVG_NS, tag);
      for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
      parent.appendChild(node);
      return node;
    };

    const sphere = el("path", { fill: OCEAN, stroke: SPHERE_STROKE });
    const graticule = el("path", { fill: "none", stroke: GRATICULE, "stroke-width": 0.6 });
    const landGroup = el("g", {});
    const land = countries.map((c) => {
      const id = String(c.id);
      const isBrazil = id === BRAZIL_ID;
      const v = values.get(id);
      return {
        geo: c,
        node: el(
          "path",
          {
            fill: v ? fillFor(v) : isBrazil ? OCEAN : LAND,
            stroke: isBrazil ? GOLD : "#161618",
            "stroke-width": isBrazil ? 1.4 : 0.5,
          },
          landGroup
        ),
      };
    });

    const points = countries
      .filter((c) => values.has(String(c.id)) || String(c.id) === BRAZIL_ID)
      .map((c) => {
        const id = String(c.id);
        const v = values.get(id) ?? 0;
        // The USA centroid falls off the mainland because of Alaska and Hawaii.
        const center: [number, number] = id === "840" ? [-98, 39] : geoCentroid(c);
        return { center, v, label: v ? `${names[keys.get(id)!]} ${format.format(v)}` : names.brazil };
      });
    const dotGroup = el("g", {});
    const labelGroup = el("g", {});
    const marks = points.map((p) => {
      const r = p.v ? radiusFor(p.v) : 4;
      const dot = el("circle", { r, fill: "rgba(226,196,119,.25)", stroke: GOLD, "stroke-width": 1 }, dotGroup);
      const text = el(
        "text",
        {
          fill: "#faf8f4",
          stroke: "#161618",
          "stroke-width": 3,
          "paint-order": "stroke",
          "font-family": "var(--font-plex-mono), monospace",
          "font-size": 11,
          "font-weight": 500,
          "letter-spacing": "0.04em",
        },
        labelGroup
      );
      text.textContent = p.label;
      return { ...p, r, dot, text };
    });
    // Label priority when two labels collide: Brazil first, then by number of certificates.
    const byPriority = [...marks].sort((a, b) => (a.v === 0 ? -1 : b.v === 0 ? 1 : b.v - a.v));

    let width = 0;
    let height = 0;
    const draw = () => {
      sphere.setAttribute("d", path({ type: "Sphere" } as GeoPermissibleObjects) ?? "");
      graticule.setAttribute("d", path(geoGraticule10()) ?? "");
      for (const c of land) c.node.setAttribute("d", path(c.geo) ?? "");
      const center = projection.invert!([width / 2, height / 2])!;
      const placed: { x0: number; x1: number; y0: number; y1: number }[] = [];
      for (const m of byPriority) {
        const distance = geoDistance(m.center, center);
        const [x, y] = projection(m.center)!;
        m.dot.setAttribute("cx", String(x));
        m.dot.setAttribute("cy", String(y));
        m.dot.setAttribute("opacity", distance < 1.45 ? "1" : "0");
        // Flip the label to the left of the bubble when it would be cut at the right edge.
        const len = m.text.getComputedTextLength();
        const flip = x + m.r + 5 + len > width - 4;
        const lx = flip ? x - m.r - 5 : x + m.r + 5;
        m.text.setAttribute("x", String(lx));
        m.text.setAttribute("text-anchor", flip ? "end" : "start");
        m.text.setAttribute("y", String(y + 4));
        // Labels disappear before the bubbles (back hemisphere) and when they would
        // overlap a label with higher priority.
        const box = { x0: flip ? lx - len : lx, x1: flip ? lx : lx + len, y0: y - 7, y1: y + 7 };
        const collides = placed.some((p) => box.x0 < p.x1 && box.x1 > p.x0 && box.y0 < p.y1 && box.y1 > p.y0);
        const show = distance < 1.3 && !collides;
        if (show) placed.push(box);
        m.text.setAttribute("opacity", show ? "1" : "0");
      }
    };

    const resize = () => {
      const box = svg.getBoundingClientRect();
      width = box.width;
      height = box.height;
      projection.scale(Math.min(width, height) / 2 - 8).translate([width / 2, height / 2]);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      draw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(svg);
    resize();

    // Drag to rotate; latitude clamped to ±60°. On touch screens (touch-pan-y) vertical
    // swipes keep scrolling the page and horizontal swipes rotate the globe.
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      svg.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const k = (75 / projection.scale()) * 1.5;
      const [a, b] = projection.rotate();
      projection.rotate([a + (e.clientX - lastX) * k, Math.max(-60, Math.min(60, b - (e.clientY - lastY) * k))]);
      lastX = e.clientX;
      lastY = e.clientY;
      draw();
    };
    const onUp = () => {
      dragging = false;
    };
    svg.addEventListener("pointerdown", onDown);
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerup", onUp);
    svg.addEventListener("pointercancel", onUp);

    // Auto-rotation: off with reduced motion, paused while dragging or off screen.
    let raf = 0;
    let last = 0;
    let onScreen = true;
    const tick = (t: number) => {
      const dt = last ? t - last : 0;
      last = t;
      if (!dragging) {
        const [a, b] = projection.rotate();
        projection.rotate([a + dt * SPIN_DEG_PER_MS, b]);
        draw();
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (reduced || raf || !onScreen) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(svg);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      svg.removeEventListener("pointerdown", onDown);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerup", onUp);
      svg.removeEventListener("pointercancel", onUp);
    };
  }, [names, numberLocale, reduced]);

  return (
    <svg
      ref={svgRef}
      role="img"
      aria-label={title}
      className="block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
    />
  );
}
