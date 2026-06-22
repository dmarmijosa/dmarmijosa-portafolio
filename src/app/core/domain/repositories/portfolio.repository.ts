import {
  Certification,
  Education,
  Experience,
  MobileApp,
  Profile,
  Project,
  Recommendation,
  SkillGroup,
  Stat,
} from '../entities';

/**
 * Domain port for accessing portfolio content. Presentation depends on this
 * abstraction, never on a concrete data source (Dependency Inversion).
 * Implementations live in the infrastructure layer and are wired via DI.
 */
export abstract class PortfolioRepository {
  abstract getProfile(): Profile;
  abstract getStats(): readonly Stat[];
  abstract getSkillGroups(): readonly SkillGroup[];
  abstract getProjects(): readonly Project[];
  abstract getMobileApps(): readonly MobileApp[];
  abstract getExperiences(): readonly Experience[];
  abstract getEducation(): readonly Education[];
  abstract getCertifications(): readonly Certification[];
  abstract getRecommendations(): readonly Recommendation[];
}
