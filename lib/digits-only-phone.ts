/** Digits only for wa.me / tel: links (no Node/Mongoose deps — safe for client bundles). */
export function digitsOnlyPhone(input: string): string {
  return input.replace(/\D/g, "");
}
