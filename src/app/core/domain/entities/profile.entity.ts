/** Core identity of the portfolio owner. */
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
