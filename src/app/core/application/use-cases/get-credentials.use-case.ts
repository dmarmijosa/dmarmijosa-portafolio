import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { Certification, Recommendation } from '../../domain/entities';
import { Locale } from '../../domain/value-objects/locale';

/** Returns certifications and peer recommendations. */
@Injectable({ providedIn: 'root' })
export class GetCredentialsUseCase {
  private readonly repo = inject(PortfolioRepository);

  certifications(locale: Locale): readonly Certification[] {
    return this.repo.getCertifications(locale);
  }

  recommendations(locale: Locale): readonly Recommendation[] {
    return this.repo.getRecommendations(locale);
  }
}
