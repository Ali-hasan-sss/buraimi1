/**
 * Graduate program card `color` field stores a two-stop Tailwind arbitrary gradient, e.g.
 * `from-[#254151] to-[#6096b4]`, used by dashboard cards and carousel overlay parsing.
 */
/** Fallback for legacy strings like `from-red-600 to-red-700` (not in Tailwind output when dynamic). */
const TAILWIND_STOP_HEX: Record<string, string> = {
  "red-600": "#dc2626",
  "red-700": "#b91c1c",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "green-600": "#16a34a",
  "green-700": "#15803d",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
};

function parseNamedTailwindGradientStops(
  raw: string,
): { from: string; to: string } | null {
  const m = raw
    .trim()
    .match(/^from-([a-z]+)-(\d+)\s+to-([a-z]+)-(\d+)$/i);
  if (!m) return null;
  const fromKey = `${m[1]}-${m[2]}`.toLowerCase();
  const toKey = `${m[3]}-${m[4]}`.toLowerCase();
  const from = TAILWIND_STOP_HEX[fromKey];
  const to = TAILWIND_STOP_HEX[toKey];
  if (from && to) return { from, to };
  return null;
}

export function parseTailwindGradientTwoStops(
  s: string | undefined,
): { from: string; to: string } {
  const raw = s ?? "";
  const arbitrary = raw.match(
    /from-\[#([0-9a-fA-F]{6})\]\s+to-\[#([0-9a-fA-F]{6})\]/,
  );
  if (arbitrary) return { from: `#${arbitrary[1]}`, to: `#${arbitrary[2]}` };
  const named = parseNamedTailwindGradientStops(raw);
  if (named) return named;
  return { from: "#254151", to: "#6096b4" };
}

export function buildTailwindGradientTwoStops(from: string, to: string): string {
  const nf = from.replace(/^#/, "").toLowerCase();
  const nt = to.replace(/^#/, "").toLowerCase();
  if (!/^[0-9a-f]{6}$/.test(nf) || !/^[0-9a-f]{6}$/.test(nt)) {
    return "from-[#254151] to-[#6096b4]";
  }
  return `from-[#${nf}] to-[#${nt}]`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(37, 65, 81, ${alpha})`;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

/** Same direction as `GradProgram` list header: `bg-gradient-to-r` + two stops. */
export function gradCardHeaderBackgroundStyle(twGradient: string): {
  backgroundImage: string;
} {
  const { from, to } = parseTailwindGradientTwoStops(twGradient);
  return {
    backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
  };
}

/** Use for DB/static `color` fields; dynamic Tailwind classes are not emitted by the compiler. */
export function gradCardHeaderBackgroundStyleFromField(
  color: string | undefined | null,
): { backgroundImage: string } {
  const s = color?.trim();
  return gradCardHeaderBackgroundStyle(
    s && s.length > 0 ? s : "from-[#254151] to-[#6096b4]",
  );
}

/** CSS for homepage-style image overlay (bottom → top). */
export function carouselImageOverlayStyle(twGradient: string): {
  background: string;
} {
  const { from, to } = parseTailwindGradientTwoStops(twGradient);
  return {
    background: `linear-gradient(to top, ${hexToRgba(from, 0.85)} 0%, ${hexToRgba(to, 0.4)} 45%, transparent 100%)`,
  };
}
