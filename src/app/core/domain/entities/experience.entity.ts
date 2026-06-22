export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly location: string;
  readonly current: boolean;
  readonly highlights: readonly string[];
}

export interface Education {
  readonly institution: string;
  readonly title: string;
  readonly period: string;
}
