import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "tr", "ru", "az"],

  // Used when no locale matches
  defaultLocale: "en",
});
