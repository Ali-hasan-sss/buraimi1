function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/** Deep-merge `patch` onto `base` (objects recurse; arrays and scalars replace). */
export function deepMergeGraduateDetails<T extends Record<string, unknown>>(
  base: T,
  patch: unknown,
): T {
  if (!isRecord(patch)) return base;
  const out = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(patch)) {
    const pv = patch[key];
    const bv = out[key];
    if (isRecord(pv) && isRecord(bv)) {
      out[key] = deepMergeGraduateDetails(bv, pv);
    } else if (pv !== undefined) {
      out[key] = pv;
    }
  }
  return out as T;
}
