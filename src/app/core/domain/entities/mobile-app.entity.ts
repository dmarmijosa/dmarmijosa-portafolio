/** A published mobile application (App Store / Google Play). */
export interface MobileApp {
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly iconUrl: string;
  readonly category: string;
  readonly tech: readonly string[];
  readonly features: readonly string[];
  readonly appStoreUrl?: string;
  readonly googlePlayUrl?: string;
  readonly accent: string;
}
