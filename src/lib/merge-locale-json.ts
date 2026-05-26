/**
 * Deep-merge locale overrides onto the English master so partial files
 * (e.g. only `hero` translated) still expose every key — strings fall back
 * to English until translated.
 */
export function mergeLocaleJson<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) {
    if (typeof base === "object" && base !== null) {
      return structuredClone(base) as T;
    }
    return base;
  }
  if (typeof base === "string" || typeof base === "number" || typeof base === "boolean") {
    return override as T;
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(override) || override.length === 0) {
      return structuredClone(base) as T;
    }
    return base.map((item, i) =>
      i < override.length ? mergeLocaleJson(item, override[i]) : mergeLocaleJson(item, undefined)
    ) as T;
  }
  if (typeof base === "object" && base !== null) {
    const b = base as Record<string, unknown>;
    if (typeof override !== "object" || override === null || Array.isArray(override)) {
      return (override !== undefined && override !== null ? override : structuredClone(base)) as T;
    }
    const o = override as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    /** Union keys so empty scaffold `{}` in base still receives all keys from override (e.g. pages.json + pages-content.json). */
    const keys = new Set([...Object.keys(b), ...Object.keys(o)]);
    for (const key of keys) {
      const hasB = Object.prototype.hasOwnProperty.call(b, key);
      const hasO = Object.prototype.hasOwnProperty.call(o, key) && o[key] !== undefined;
      if (hasO) {
        result[key] = mergeLocaleJson(hasB ? b[key] : undefined, o[key]);
      } else if (hasB) {
        result[key] = mergeLocaleJson(b[key], undefined);
      }
    }
    return result as T;
  }
  return override as T;
}
