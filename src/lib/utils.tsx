type ClassValue = string | undefined | false | null | Record<string, boolean>;

export function cn(...classes: ClassValue[]): string {
  return classes
    .map((c) => {
      if (!c) return "";
      if (typeof c === "string") return c;
      if (typeof c === "object") {
        return Object.entries(c)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
