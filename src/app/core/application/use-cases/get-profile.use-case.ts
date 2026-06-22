import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { Profile, Stat } from '../../domain/entities';

/** Returns the portfolio owner's profile and headline stats. */
@Injectable({ providedIn: 'root' })
export class GetProfileUseCase {
  private readonly repo = inject(PortfolioRepository);

  profile(): Profile {
    return this.repo.getProfile();
  }

  stats(): readonly Stat[] {
    return this.repo.getStats();
  }
}
