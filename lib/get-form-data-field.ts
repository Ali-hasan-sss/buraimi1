export function getFormDataString(formData: FormData, name: string): string {
  let last = "";
  for (const [key, value] of formData.entries()) {
    const logical = /^\d+_(.+)$/.exec(key)?.[1] ?? key;
    if (logical !== name) continue;
    if (value == null) continue;
    const s = String(value).trim();
    if (s) last = s;
  }
  return last;
}
