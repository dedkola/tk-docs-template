declare module "./config.local" {
  // Optional local overrides for development; shape matches Partial<BaseSiteConfig>
  import type { BaseSiteConfig } from "./config.base";
  export const localConfig: Partial<BaseSiteConfig>;
}
