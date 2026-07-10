/** Next.js may prefix FormData keys for server actions (e.g. `1_name`, `v_name`, `1_memberImagePath`). */

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getFormEntry(
  formData: FormData,
  baseName: string,
): FormDataEntryValue | null {
  const direct = formData.get(baseName);
  const re = new RegExp(
    `^[^_]+_${escapeRegExp(baseName)}$`,
  );

  // Next.js may send both `memberImagePath` (empty) and `1_memberImagePath` (real value).
  // If we returned direct on any non-null, we'd miss the prefixed non-empty field.
  if (typeof direct === "string" && direct.trim() !== "") {
    return direct;
  }

  for (const [key, val] of formData.entries()) {
    const k = key.trim();
    if (!re.test(k)) continue;
    if (typeof val === "string" && val.trim() !== "") return val;
  }

  if (direct !== null) return direct;

  for (const [key, val] of formData.entries()) {
    if (re.test(key.trim())) return val;
  }

  return null;
}

export function getFormString(formData: FormData, baseName: string): string {
  const v = getFormEntry(formData, baseName);
  if (v === null) return "";
  if (typeof v === "string") return v.trim();
  return "";
}

/** Relative upload path for council member photo (avoid `name="image"` clashes with RSC / tooling). */
export function getCouncilMemberImagePath(formData: FormData): string {
  let fromMemberPath = "";
  let fromImage = "";
  for (const [rawKey, val] of formData.entries()) {
    if (typeof val !== "string") continue;
    const t = val.trim();
    if (!t) continue;
    const key = rawKey.trim();
    if (key === "memberImagePath" || key.endsWith("_memberImagePath")) {
      fromMemberPath = t;
    }
    if (key === "image" || key.endsWith("_image")) {
      fromImage = t;
    }
  }
  return fromMemberPath || fromImage;
}
