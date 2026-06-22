/**
 * Domain models for the portfolio. Single source of truth for the shape of
 * all content rendered across the site (system-design: data layer decoupled
 * from presentation components).
 */

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly headline: string;
  readonly location: string;
  readonly modality: string;
  readonly summary: string;
  readonly email: string;
  readonly website: string;
  readonly linkedin: string;
  readonly github: string;
  readonly yearsExperience: number;
  readonly availability: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly icon: string;
  readonly skills: readonly string[];
}

export type ProjectCategory = 'Web App' | 'E-commerce' | 'Landing' | 'IA' | 'Móvil';

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

export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly location: string;
  readonly current: boolean;
  readonly highlights: readonly string[];
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly date: string;
  readonly key: boolean;
}

export interface Education {
  readonly institution: string;
  readonly title: string;
  readonly period: string;
}
