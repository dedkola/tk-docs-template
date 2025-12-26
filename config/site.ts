import { baseConfig, type BaseSiteConfig } from "./config.base";
import { privateConfig } from "./config.private";
import { localConfig as localExample } from "./config.local.example";

const mergeSection = <T extends Record<string, unknown>>(
  baseSection: T,
  override?: Partial<T>
): T => ({
  ...baseSection,
  ...(override ?? {}),
});

// Optional local config: prefer config.local.ts if present, else example
let localConfig: Partial<BaseSiteConfig> = localExample;
try {
  // @ts-expect-error Optional module may not exist in production
  const mod = await import("./config.local");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maybeLocal = (mod as any)?.localConfig as
    | Partial<BaseSiteConfig>
    | undefined;
  if (maybeLocal) localConfig = maybeLocal;
} catch {
  // No local overrides present; use example defaults
}

export const siteConfig: BaseSiteConfig = {
  ...baseConfig,
  ...privateConfig,
  ...localConfig,
  og: mergeSection(
    mergeSection(baseConfig.og, privateConfig.og),
    localConfig.og
  ),
  twitter: mergeSection(
    mergeSection(baseConfig.twitter, privateConfig.twitter),
    localConfig.twitter
  ),
  analytics: mergeSection(
    mergeSection(baseConfig.analytics, privateConfig.analytics),
    localConfig.analytics
  ),
  debug: mergeSection(
    mergeSection(baseConfig.debug, privateConfig.debug),
    localConfig.debug
  ),
  social: mergeSection(
    mergeSection(baseConfig.social, privateConfig.social),
    localConfig.social
  ),
  footer: mergeSection(
    mergeSection(baseConfig.footer, privateConfig.footer),
    localConfig.footer
  ),
};

export type SiteConfig = typeof siteConfig;
