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
import { Locale } from '../value-objects/locale';

/**
 * Domain port for accessing portfolio content. Presentation depends on this
 * abstraction, never on a concrete data source (Dependency Inversion).
 * Every query is resolved for a given locale.
 */
export abstract class PortfolioRepository {
  abstract getProfile(locale: Locale): Profile;
  abstract getStats(locale: Locale): readonly Stat[];
  abstract getSkillGroups(locale: Locale): readonly SkillGroup[];
  abstract getProjects(locale: Locale): readonly Project[];
  abstract getMobileApps(locale: Locale): readonly MobileApp[];
  abstract getExperiences(locale: Locale): readonly Experience[];
  abstract getEducation(locale: Locale): readonly Education[];
  abstract getCertifications(locale: Locale): readonly Certification[];
  abstract getRecommendations(locale: Locale): readonly Recommendation[];
}
