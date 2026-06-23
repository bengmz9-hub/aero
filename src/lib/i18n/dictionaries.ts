export type Language = "es" | "en";

import { es } from "./es";
import { en } from "./en";

export type Dictionary = typeof es;

export const dictionaries: Record<Language, Dictionary> = {
  es,
  en,
};
