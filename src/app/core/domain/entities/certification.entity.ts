export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly date: string;
  readonly key: boolean;
}

export interface Recommendation {
  readonly author: string;
  readonly role: string;
  readonly text: string;
}
