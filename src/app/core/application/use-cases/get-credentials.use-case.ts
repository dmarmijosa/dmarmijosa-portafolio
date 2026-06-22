import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { Certification, Recommendation } from '../../domain/entities';

/** Returns certifications and peer recommendations. */
@Injectable({ providedIn: 'root' })
export class GetCredentialsUseCase {
  private readonly repo = inject(PortfolioRepository);

  certifications(): readonly Certification[] {
    return this.repo.getCertifications();
  }

  recommendations(): readonly Recommendation[] {
    return this.repo.getRecommendations();
  }
}
