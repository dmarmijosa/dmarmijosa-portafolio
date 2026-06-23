import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { Education, Experience } from '../../domain/entities';
import { Locale } from '../../domain/value-objects/locale';

/** Returns professional experience and education history. */
@Injectable({ providedIn: 'root' })
export class GetCareerUseCase {
  private readonly repo = inject(PortfolioRepository);

  experiences(locale: Locale): readonly Experience[] {
    return this.repo.getExperiences(locale);
  }

  education(locale: Locale): readonly Education[] {
    return this.repo.getEducation(locale);
  }
}
