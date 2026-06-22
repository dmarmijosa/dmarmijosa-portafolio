export type ProjectCategory = 'Web App' | 'E-commerce' | 'Landing' | 'IA' | 'Móvil';

/** A live web project showcased in the portfolio. */
export interface Project {
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly category: ProjectCategory;
  readonly tech: readonly string[];
  readonly featured: boolean;
  /** Tailwind gradient classes used for the card accent / 3D glow. */
  readonly accent: string;
  /** Short emoji/glyph used as a lightweight visual marker. */
  readonly glyph: string;
}
