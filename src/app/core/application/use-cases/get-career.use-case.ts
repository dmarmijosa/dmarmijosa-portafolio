import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { Education, Experience } from '../../domain/entities';

/** Returns professional experience and education history. */
@Injectable({ providedIn: 'root' })
export class GetCareerUseCase {
  private readonly repo = inject(PortfolioRepository);

  experiences(): readonly Experience[] {
    return this.repo.getExperiences();
  }

  education(): readonly Education[] {
    return this.repo.getEducation();
  }
}
